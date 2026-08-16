"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
  rows?: number;
  hint?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "notReady"; message: string }
  | { kind: "error"; message: string };

export function SubmitForm({
  kind,
  fields,
  submitLabel,
  successTitle,
  successBody,
}: {
  kind: "genxfiles" | "tapes";
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });

    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...payload }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus({ kind: "sent" });
        return;
      }
      if (response.status === 503) {
        setStatus({
          kind: "notReady",
          message: result.message ?? "Submissions aren't switched on yet.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message: result.message ?? "That didn't send. Give it another go in a moment.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "That didn't send — check your connection and try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="card-surface p-8" role="status">
        <h3 className="text-lg font-bold text-[#000080]">
          {successTitle}
        </h3>
        <p className="measure mt-3 text-[16.5px] leading-relaxed text-ink-soft">
          {successBody}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={`${kind}-${field.name}`}
              className="label-strip mb-2 block text-ink"
            >
              {field.label}
              {field.required ? <span className="ml-1 text-rec">*</span> : null}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={`${kind}-${field.name}`}
                name={field.name}
                rows={field.rows ?? 6}
                required={field.required}
                placeholder={field.placeholder}
                className="field-95 w-full resize-y leading-relaxed"
              />
            ) : (
              <input
                id={`${kind}-${field.name}`}
                name={field.name}
                type={field.type}
                required={field.required}
                placeholder={field.placeholder}
                className="field-95 w-full"
              />
            )}

            {field.hint ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-faint">{field.hint}</p>
            ) : null}
          </div>
        ))}

        <fieldset className="bevel-in p-4">
          <legend className="label-strip px-2 text-ink">Your name</legend>
          <div className="space-y-2">
            {[
              ["credit", "Use my name when you share it"],
              ["anonymous", "Keep me anonymous"],
            ].map(([value, text]) => (
              <label key={value} className="flex items-start gap-3 text-[16.5px]">
                <input
                  type="radio"
                  name="attribution"
                  value={value}
                  defaultChecked={value === "credit"}
                  className="mt-1.5 h-4 w-4 accent-[#C4362B]"
                />
                <span className="text-ink-soft">{text}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="btn-95 mt-7 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status.kind === "sending" ? "Sending…" : submitLabel}
      </button>

      {status.kind === "notReady" ? (
        <p
          className="bevel-in mt-5 px-4 py-3 text-[15px] leading-relaxed"
          role="status"
        >
          {status.message}
        </p>
      ) : null}

      {status.kind === "error" ? (
        <p
          className="bevel-in mt-5 px-4 py-3 text-[15px] leading-relaxed text-[#A80000]"
          role="alert"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
