import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Hero } from "@/components/blocks/Hero";
import { ProofRow } from "@/components/blocks/ProofRow";
import { CaseCard } from "@/components/blocks/CaseCard";
import { SignatureSlot } from "@/components/SignatureSlot";
import { getAllCaseStudies } from "@/lib/content";
import { site } from "@/content/site";

export default function Home() {
  const studies = getAllCaseStudies();

  return (
    <Container>
      <Hero />
      <ProofRow />
      <SignatureSlot />

      <Section label="Selected work">
        <ul className="grid gap-4">
          {studies.map((meta) => (
            <CaseCard key={meta.slug} meta={meta} />
          ))}
        </ul>
      </Section>

      <Section label="About">
        <p className="max-w-[var(--measure)]">{site.about}</p>
      </Section>

      <footer className="border-t border-accent py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href={`mailto:${site.email}`} className="label hover:text-accent-text">
            {site.email}
          </a>
          <div className="flex gap-6">
            {site.links.map((l) => (
              <a key={l.label} href={l.href} className="label hover:text-accent-text">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </Container>
  );
}
