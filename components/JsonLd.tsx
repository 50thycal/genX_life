/**
 * Structured data, the machine-readable version of who they are.
 *
 * It's what lets Google connect ourgenxlife.com to the YouTube channels, the
 * Etsy shop and the podcast as one brand rather than a handful of unrelated
 * pages, and it's what feeds the knowledge panel if they ever earn one.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The object is ours, not user input, so there's nothing to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
