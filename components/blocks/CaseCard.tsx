import Link from "next/link";
import type { CaseStudyMeta } from "@/content/schema";

export function CaseCard({ meta }: { meta: CaseStudyMeta }) {
  return (
    <li>
      <Link
        href={`/work/${meta.slug}`}
        className="group flex flex-col gap-3 border border-rule bg-panel p-6 no-underline transition-colors hover:border-accent"
      >
        <span className="label">
          {meta.timeframe} · {meta.surface}
        </span>
        <h3 className="font-display text-xl font-bold group-hover:text-accent-text">
          {meta.title}
        </h3>
        <p className="text-sm text-ink-2">{meta.outcome}</p>
        <span className="label mt-1 text-accent-text">Read the study →</span>
      </Link>
    </li>
  );
}
