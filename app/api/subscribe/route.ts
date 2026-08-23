import { NextResponse } from "next/server";

/**
 * The mailing list signup.
 *
 * Contacts go into a Resend Audience rather than a table of our own. That
 * hands over unsubscribe links, bounce handling and the one-click unsubscribe
 * header that Gmail now expects, all of which are legally required and all of
 * which are tedious to build correctly. The list stays exportable, so it's
 * still theirs.
 *
 * Set RESEND_API_KEY and RESEND_AUDIENCE_ID to switch it on. Until then it
 * refuses honestly rather than pretending to have saved an address.
 */

const LIMITS = { name: 80, email: 200 };

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "That didn't arrive in one piece." }, { status: 400 });
  }

  const email = clean(payload.email, LIMITS.email);
  const name = clean(payload.name, LIMITS.name);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  // Consent has to be given, not assumed.
  if (payload.consent !== true) {
    return NextResponse.json(
      { message: "Tick the box to say it's alright to email you." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return NextResponse.json(
      {
        message:
          "The mailing list isn't switched on yet. This is a preview of the new site.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, first_name: name, unsubscribed: false }),
      },
    );

    if (!response.ok) {
      const detail = await response.text();
      // An address already on the list is a success as far as the visitor is
      // concerned, and saying otherwise would leak who's subscribed.
      if (response.status === 409 || detail.includes("already exists")) {
        return NextResponse.json({ ok: true });
      }
      console.error("Resend rejected the contact", detail);
      return NextResponse.json(
        { message: "That didn't go through. Give it another go in a moment." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Subscribe failed", error);
    return NextResponse.json(
      { message: "That didn't go through. Give it another go in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
