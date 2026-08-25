import { z } from "zod";

/**
 * Frontmatter contract for every case study.
 * A malformed file fails the build rather than shipping a broken page.
 */
export const caseStudySchema = z.object({
  title: z.string().min(1),
  // One line, with the outcome in it. Shown on the homepage card.
  outcome: z.string().min(1),
  // The header strip — four data points, scannable in three seconds.
  role: z.string().min(1),
  team: z.string().min(1),
  timeframe: z.string().min(1),
  surface: z.string().min(1),
  // Which reader this study is aimed at. Drives homepage ordering.
  audience: z.enum(["hiring-manager", "founder", "technical"]),
  order: z.number().int(),
  draft: z.boolean().default(false),
});

export type CaseStudyMeta = z.infer<typeof caseStudySchema> & { slug: string };
