"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "notReady"; message: string }
  | { kind: "error"; message: string };

/**
 * Mailing list signup, dressed as a little dialog on the desktop.
 *
 * Two fields and a consent box. Asking for less is the whole point: an email
 * address is a far smaller thing to give up than an account, and the list is
 * what Keith and Abby actually wanted out of this.
 */
export function JoinList() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          name: form.get("name"),
          consent: form.get("consent") === "on",
        }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ kind: "done" });
        return;
      }
      if (response.status === 503) {
        setStatus({
          kind: "notReady",
          message: result.message ?? "The mailing list isn't switched on yet.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message: result.message ?? "That didn't go through. Try again in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "That didn't go through. Check your connection and try again.",
      });
    }
  }

  return (
    <div className="window mt-8 max-w-xl">
      <div className="title-bar">
        <span className="title-bar-text flex-1 truncate">Join the list</span>
      </div>

      <div className="p-4">
        {status.kind === "done" ? (
          <p className="text-[15px] leading-relaxed" role="status">
            <strong>You&apos;re on the list.</strong> You&apos;ll hear when a new episode
            lands or something good turns up at an estate sale. Unsubscribe any time.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="measure mb-4 text-[15px] leading-relaxed">
              New episodes, new rescues, and the occasional story from the Gen X Files.
              No more than a couple of emails a month.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex-1">
                <span className="label-strip mb-1.5 block">First name</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  className="field-95 w-full"
                  placeholder="Optional"
                />
              </label>

              <label className="flex-1">
                <span className="label-strip mb-1.5 block">
                  Email <span className="text-rec-deep">*</span>
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="field-95 w-full"
                />
              </label>
            </div>

            {/* Unticked by default. Pre-ticked consent isn't consent. */}
            <label className="mt-4 flex items-start gap-3 text-[14px] leading-relaxed">
              <input
                name="consent"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[#FF3D8B]"
              />
              <span>
                Yes, email me about new episodes and videos. I can unsubscribe whenever I
                like.
              </span>
            </label>

            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="btn-hot mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status.kind === "sending" ? "Adding…" : "Join the list"}
            </button>

            {status.kind === "notReady" ? (
              <p className="bevel-in mt-4 px-3 py-2 text-[14px] leading-relaxed" role="status">
                {status.message}
              </p>
            ) : null}

            {status.kind === "error" ? (
              <p
                className="bevel-in mt-4 px-3 py-2 text-[14px] leading-relaxed text-rec-deep"
                role="alert"
              >
                {status.message}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}
