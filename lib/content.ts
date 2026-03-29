import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import rehypeShiki from '@shikijs/rehype';
import remarkSmartypants from 'remark-smartypants';

const contentDir = path.join(process.cwd(), 'content');

function kebabCase(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export interface PostFrontmatter {
  template: 'post';
  title: string;
  slug?: string;
  draft: boolean;
  date: string;
  description: string;
  category: string;
  tags?: string[];
  thumbnail?: string;
}

export interface BookFrontmatter {
  template: 'book';
  title: string;
  author: string;
  draft: boolean;
  readingStart: string;
  readingEnd?: string;
  description: string;
  category: string;
  amazonLink?: string;
  tags?: string[];
  thumbnail?: string;
}

export interface PageFrontmatter {
  template: 'page';
  title: string;
  slug: string;
  draft: boolean;
  thumbnail?: string;
}

export interface ContentItem<T> {
  frontmatter: T;
  html: string;
  slug: string;
  categorySlug: string;
  tagSlugs: string[];
}

async function renderMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeShiki, { theme: 'github-dark' })
    .use(rehypeStringify)
    .process(content);

  return String(result);
}

function getFilesFromDir(dir: string): string[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(fullPath, f));
}

function parseFile<T>(filePath: string): { frontmatter: T; content: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content };
}

export async function getPosts(): Promise<ContentItem<PostFrontmatter>[]> {
  const files = getFilesFromDir('posts');
  const posts: ContentItem<PostFrontmatter>[] = [];

  for (const file of files) {
    const { frontmatter, content } = parseFile<PostFrontmatter>(file);
    if (frontmatter.draft || frontmatter.template !== 'post') continue;

    const slug = frontmatter.slug
      ? frontmatter.slug.startsWith('/')
        ? frontmatter.slug
        : `/${frontmatter.slug}`
      : `/${path.basename(file, '.md')}/`;

    const html = await renderMarkdown(content);
    const categorySlug = `/category/${kebabCase(frontmatter.category)}/`;
    const tagSlugs = (frontmatter.tags || []).map((tag) => `/tag/${kebabCase(tag)}/`);

    posts.push({ frontmatter, html, slug, categorySlug, tagSlugs });
  }

  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  return posts;
}

export async function getBooks(): Promise<ContentItem<BookFrontmatter>[]> {
  const files = getFilesFromDir('books');
  const books: ContentItem<BookFrontmatter>[] = [];

  for (const file of files) {
    const { frontmatter, content } = parseFile<BookFrontmatter>(file);
    if (frontmatter.draft || frontmatter.template !== 'book') continue;

    const slug = `/${path.basename(file, '.md')}/`;
    const html = await renderMarkdown(content);
    const categorySlug = `/category/${kebabCase(frontmatter.category)}/`;
    const tagSlugs = (frontmatter.tags || []).map((tag) => `/tag/${kebabCase(tag)}/`);

    books.push({ frontmatter, html, slug, categorySlug, tagSlugs });
  }

  books.sort(
    (a, b) => new Date(b.frontmatter.readingStart).getTime() - new Date(a.frontmatter.readingStart).getTime()
  );
  return books;
}

export async function getPages(): Promise<ContentItem<PageFrontmatter>[]> {
  const files = getFilesFromDir('pages');
  const pages: ContentItem<PageFrontmatter>[] = [];

  for (const file of files) {
    const { frontmatter, content } = parseFile<PageFrontmatter>(file);
    if (frontmatter.draft) continue;

    const slug = frontmatter.slug.startsWith('/') ? frontmatter.slug : `/${frontmatter.slug}`;
    const html = await renderMarkdown(content);

    pages.push({ frontmatter, html, slug, categorySlug: '', tagSlugs: [] });
  }

  return pages;
}

export async function getPostBySlug(slug: string): Promise<ContentItem<PostFrontmatter> | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug || p.slug === `${slug}/` || `${p.slug}/` === slug);
}

export async function getBookBySlug(slug: string): Promise<ContentItem<BookFrontmatter> | undefined> {
  const books = await getBooks();
  return books.find((b) => b.slug === slug || b.slug === `${slug}/` || `${b.slug}/` === slug);
}

export function getAllTags(posts: ContentItem<PostFrontmatter>[]): { name: string; count: number; slug: string }[] {
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.frontmatter.tags || []) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: `/tag/${kebabCase(name)}/`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllCategories(
  posts: ContentItem<PostFrontmatter>[]
): { name: string; count: number; slug: string }[] {
  const catMap = new Map<string, number>();

  for (const post of posts) {
    catMap.set(post.frontmatter.category, (catMap.get(post.frontmatter.category) || 0) + 1);
  }

  return Array.from(catMap.entries())
    .map(([name, count]) => ({
      name,
      count,
      slug: `/category/${kebabCase(name)}/`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getPostsByTag(posts: ContentItem<PostFrontmatter>[], tag: string): ContentItem<PostFrontmatter>[] {
  return posts.filter((p) => p.frontmatter.tags?.some((t) => kebabCase(t) === tag));
}

export function getPostsByCategory(
  posts: ContentItem<PostFrontmatter>[],
  category: string
): ContentItem<PostFrontmatter>[] {
  return posts.filter((p) => kebabCase(p.frontmatter.category) === category);
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.ceil(items.length / perPage);
  const offset = page * perPage;
  const paginatedItems = items.slice(offset, offset + perPage);

  return {
    items: paginatedItems,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages - 1,
    hasPrevPage: page > 0,
  };
}

export { kebabCase };
