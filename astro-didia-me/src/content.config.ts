import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ pattern: '**/*.md', base: "./src/content/blog" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		template: z.string().optional(),
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		thumbnail: z.string().optional(),
	}),
});

const books = defineCollection({
	loader: glob({ pattern: '**/*.md', base: "./src/content/books" }),
	schema: z.object({
		template: z.string().optional(),
		title: z.string(),
		author: z.string(),
		description: z.string(),
		readingStart: z.preprocess((val) => val === '' ? undefined : val, z.coerce.date().optional()),
		readingEnd: z.preprocess((val) => val === '' ? undefined : val, z.coerce.date().optional()),
		draft: z.boolean().optional(),
		category: z.string().optional(),
		tags: z.array(z.string()).optional(),
		thumbnail: z.string().optional(),
		amazonLink: z.string().optional(),
	}),
});

export const collections = { blog, books };
