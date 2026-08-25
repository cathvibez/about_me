import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { site } from "@/content/site";

export const metadata = { title: "Résumé" };

/**
 * A stable route recruiters can paste into an ATS note.
 * Drop the PDF at public/resume.pdf and it is linked below.
 */
export default function ResumePage() {
  return (
    <Container>
      <nav className="pt-10 pb-14">
        <Link href="/" className="label hover:text-accent-text">
          ← {site.name}
        </Link>
      </nav>

      <header className="flex flex-col gap-5 pb-4">
        <h1 className="text-2xl font-bold">Résumé</h1>
        <p className="max-w-[var(--measure)] text-ink-2">{site.claim}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a
            href="/resume.pdf"
            className="btn-primary"
          >
            Download PDF
          </a>
          <a href={`mailto:${site.email}`} className="label self-center hover:text-accent-text">
            {site.email}
          </a>
        </div>
      </header>

      <Section label="Experience">
        {/* TODO(you): mirror the PDF here so the page is readable without a download. */}
        <p className="max-w-[var(--measure)] text-ink-2">
          Add your roles here in plain text. Keeping the résumé readable in the
          browser matters more than it looks — plenty of readers will never open
          the PDF, and a page that says nothing without a download wastes them.
        </p>
      </Section>
    </Container>
  );
}
