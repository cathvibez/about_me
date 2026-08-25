/**
 * Every piece of homepage copy lives here. No strings in components.
 * Swap the design in v2 without touching a word of this file.
 *
 * TODO(you): replace the placeholders — this is Saturday morning's writing block.
 */

export const site = {
  name: "Your Name",
  // The spine claim. One sentence, sits directly under your name.
  claim:
    "A product manager who writes the spec, builds the prototype, and holds their own in the architecture review.",
  // Three proof points. Each one needs a number in it.
  proof: [
    { stat: "0→1", label: "Products shipped end to end, spec through launch" },
    { stat: "8 yrs", label: "Product work with a CS degree underneath it" },
    { stat: "3 teams", label: "Eng, design, and GTM aligned on one roadmap" },
  ],
  email: "you@example.com",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/you" },
    { label: "GitHub", href: "https://github.com/you" },
    { label: "Résumé", href: "/resume" },
  ],
  // Three sentences. Put something human in it.
  about:
    "I studied computer science, spent a few years writing code, and moved into product because the interesting problems were upstream of the implementation. I still prototype my own ideas — it is the fastest way I know to find out whether a concept survives contact with a real screen. Based in the Pacific Northwest; usually on the water before work.",
  meta: {
    title: "Your Name — Product Manager",
    description:
      "Product manager for technical products. I write the spec, build the prototype, and hold my own in the architecture review.",
    url: "https://example.com",
  },
} as const;
