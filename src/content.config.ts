import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    category: z.enum(["AI products", "Commerce & booking", "Enterprise systems", "Public sector"]),
    role: z.string(),
    period: z.string(),
    context: z.string(),
    technologies: z.array(z.string()).min(1),
    cover: z.string(),
    coverAlt: z.string(),
    results: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), url: z.url() }))
      .default([]),
  }),
});

export const collections = { projects };
