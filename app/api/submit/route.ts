import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/links";

/**
 * Handles both submission forms.
 *
 * Storage lands in phase 3 (Postgres + an archive page per story). Until then
 * this forwards to the inbox via Resend when RESEND_API_KEY is set, and
 * refuses honestly when it isn't — a form that says "thanks!" and quietly drops
 * somebody's story is worse than one that admits it isn't ready.
 */

const KINDS = {
  genxfiles: { subject: "Gen X Files submission", bodyField: "story" },
  tapes: { subject: "Tape submission", bodyField: "tapes" },
} as const;

type Kind = keyof typeof KINDS;

const LIMITS = { name: 120, email: 200, body: 20000 };

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "That didn't arrive in one piece." }, { status: 400 });
  }

  const kind = payload.kind as Kind;
  if (!kind || !(kind in KINDS)) {
    return NextResponse.json({ message: "Unknown form." }, { status: 400 });
  }

  const config = KINDS[kind];
  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const body = clean(payload[config.bodyField], LIMITS.body);
  const anonymous = payload.attribution === "anonymous";

  if (!name || !email || !body) {
    return NextResponse.json(
      { message: "Looks like something's still blank. Check the required fields." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { message: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SUBMISSION_FROM;

  if (!apiKey || !from) {
    return NextResponse.json(
      {
        message: `Submissions aren't switched on yet. This is a preview of the new site. Email it to ${CONTACT.email} for now and it'll get read just the same.`,
      },
      { status: 503 },
    );
  }

  const lines = [
    `Kind: ${config.subject}`,
    `From: ${name} <${email}>`,
    `Attribution: ${anonymous ? "ANONYMOUS, do not use their name" : "OK to use their name"}`,
    "",
    body,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT.email],
        reply_to: email,
        subject: `${config.subject}: ${anonymous ? "anonymous" : name}`,
        text: lines,
      }),
    });

    if (!response.ok) {
      console.error("Resend rejected the submission", await response.text());
      return NextResponse.json(
        { message: "That didn't send. Give it another go in a moment." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Submission failed", error);
    return NextResponse.json(
      { message: "That didn't send. Give it another go in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
