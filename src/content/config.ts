import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    type: z.enum(['log', 'post']),
    tags: z.array(z.string()),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
