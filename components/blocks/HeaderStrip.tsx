import type { CaseStudyMeta } from "@/content/schema";

/** Four data points, scannable in three seconds. Establishes altitude. */
export function HeaderStrip({ meta }: { meta: CaseStudyMeta }) {
  const fields = [
    ["Role", meta.role],
    ["Team", meta.team],
    ["When", meta.timeframe],
    ["Surface", meta.surface],
  ] as const;

  return (
    <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-4">
      {fields.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1.5 bg-panel p-4">
          <dt className="label">{k}</dt>
          <dd className="text-xs leading-snug text-ink">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
