import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { caseStudySchema, type CaseStudyMeta } from "@/content/schema";

const DIR = path.join(process.cwd(), "content", "case-studies");

export function getSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getCaseStudy(slug: string): { meta: CaseStudyMeta; body: string } | null {
  const file = path.join(DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const parsed = caseStudySchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/case-studies/${slug}.mdx:\n${parsed.error.issues
        .map((i) => `  · ${i.path.join(".") || "(root)"}: ${i.message}`)
        .join("\n")}`,
    );
  }
  return { meta: { ...parsed.data, slug }, body: content };
}

/** Published studies, in the order the homepage should show them. */
export function getAllCaseStudies(): CaseStudyMeta[] {
  return getSlugs()
    .map((slug) => getCaseStudy(slug)?.meta)
    .filter((m): m is CaseStudyMeta => Boolean(m) && !m!.draft)
    .sort((a, b) => a.order - b.order);
}
