import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/primitives/Container";
import { HeaderStrip } from "@/components/blocks/HeaderStrip";
import { getCaseStudy, getSlugs } from "@/lib/content";
import { site } from "@/content/site";

export function generateStaticParams() {
  return getSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return { title: study.meta.title, description: study.meta.outcome };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { meta, body } = study;

  // compileMDX rather than <MDXRemote/>: the plugin list has to be applied at
  // compile time, and calling it directly keeps remark-gfm (tables) working.
  const { content } = await compileMDX({
    source: body,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return (
    <Container>
      <nav className="pt-10 pb-14">
        <Link href="/" className="label hover:text-accent-text">
          ← {site.name}
        </Link>
      </nav>

      <header className="flex flex-col gap-6 pb-10">
        <h1 className="text-2xl font-bold">{meta.title}</h1>
        <p className="text-lg text-ink-2">{meta.outcome}</p>
        <HeaderStrip meta={meta} />
      </header>

      <article className="prose pb-16">
        {content}
      </article>

      <footer className="border-t border-accent py-10">
        <a href={`mailto:${site.email}`} className="label hover:text-accent-text">
          Questions about this one? {site.email}
        </a>
      </footer>
    </Container>
  );
}
