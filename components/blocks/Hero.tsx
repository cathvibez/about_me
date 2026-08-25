import { site } from "@/content/site";

export function Hero() {
  return (
    <header className="pt-24 pb-14">
      <p className="label mb-5">{site.name}</p>
      <h1 className="text-4xl font-bold max-w-[19ch]">{site.claim}</h1>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${site.email}`}
          className="btn-primary"
        >
          Email me
        </a>
        {site.links.map((l) => (
          <a key={l.label} href={l.href} className="label hover:text-accent-text">
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
