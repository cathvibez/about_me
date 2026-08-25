import { site } from "@/content/site";

export function ProofRow() {
  return (
    <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
      {site.proof.map((p) => (
        <li key={p.label} className="flex flex-col gap-2 bg-panel p-5">
          <span className="font-display text-2xl font-bold tabular-nums text-accent-text">
            {p.stat}
          </span>
          <span className="text-xs leading-snug text-ink-2">{p.label}</span>
        </li>
      ))}
    </ul>
  );
}
