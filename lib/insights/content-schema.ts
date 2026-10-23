import {z} from 'zod';
import {insightCategoryIds} from '@/lib/insights/systems';

/**
 * Schema for one engineering insight file in `content/insights/<slug>.json`.
 * Every file is parsed at build time; an invalid file fails the build instead
 * of publishing a broken page. `scripts/insights/validate.mjs` adds editorial
 * gates (cannibalization, duplication, unverified figures) on top of this.
 */

const text = (min: number, max: number) => z.string().trim().min(min).max(max);
const kebab = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

const sectionSchema = z.object({
  title: text(3, 140),
  body: text(120, 2400),
  points: z.array(text(10, 320)).min(3).max(6)
});

export const insightLocaleContentSchema = z.object({
  title: text(10, 110),
  metaDescription: text(50, 200),
  primaryKeyword: text(3, 90),
  summary: text(60, 420),
  readingMinutes: z.number().int().min(3).max(20),
  problem: sectionSchema,
  cause: sectionSchema,
  visual: z.object({
    title: text(5, 140),
    description: text(40, 600),
    callouts: z.array(text(3, 80)).min(2).max(5)
  }),
  execution: z.object({
    title: text(3, 140),
    steps: z
      .array(
        z.object({
          title: text(3, 120),
          description: text(30, 600)
        })
      )
      .min(3)
      .max(6)
  }),
  faqs: z
    .array(
      z.object({
        question: text(10, 220),
        answer: text(40, 1200)
      })
    )
    .min(2)
    .max(6),
  cta: z.object({
    headline: text(10, 140),
    text: text(30, 400)
  })
});

export const insightArticleFileSchema = z
  .object({
    slug: kebab.max(80),
    category: z.enum(insightCategoryIds),
    status: z.enum(['published', 'draft']),
    publishedAt: isoDate,
    updatedAt: isoDate,
    faqIds: z.array(kebab.max(60)).min(2).max(6),
    relatedProjects: z.array(kebab).max(3).default([]),
    relatedInsights: z.array(kebab).max(4).default([]),
    relatedResources: z.array(kebab).max(3).default([]),
    trend: z
      .object({
        topic: text(3, 200),
        rationale: text(10, 800),
        observedAt: isoDate,
        sources: z.array(z.string().url()).max(10).default([])
      })
      .nullable()
      .default(null),
    citedFigures: z
      .array(
        z.object({
          value: z.string().min(1).max(40),
          source: z.string().min(3).max(300)
        })
      )
      .default([]),
    locales: z.object({
      fa: insightLocaleContentSchema,
      en: insightLocaleContentSchema,
      ar: insightLocaleContentSchema,
      ru: insightLocaleContentSchema
    })
  })
  .superRefine((file, ctx) => {
    for (const [locale, content] of Object.entries(file.locales)) {
      if (content.faqs.length !== file.faqIds.length) {
        ctx.addIssue({
          code: 'custom',
          path: ['locales', locale, 'faqs'],
          message: `${locale} has ${content.faqs.length} FAQs but faqIds has ${file.faqIds.length}.`
        });
      }
    }
    if (file.updatedAt < file.publishedAt) {
      ctx.addIssue({code: 'custom', path: ['updatedAt'], message: 'updatedAt is earlier than publishedAt.'});
    }
  });

export type InsightArticleFile = z.infer<typeof insightArticleFileSchema>;
export type InsightLocaleContent = z.infer<typeof insightLocaleContentSchema>;
