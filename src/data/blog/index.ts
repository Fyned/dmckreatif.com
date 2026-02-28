import { articles } from "./articles";
import type { BlogArticle, BlogCategory } from "./types";

export { articles as allArticles };
export type { BlogArticle, BlogCategory };

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: BlogCategory): BlogArticle[] {
  return articles.filter((a) => a.category === category);
}

export function getArticlesByTag(tag: string): BlogArticle[] {
  return articles.filter((a) => a.tags.includes(tag));
}

export function getAllCategories(): BlogCategory[] {
  return [...new Set(articles.map((a) => a.category))];
}

export function getAllTags(): string[] {
  return [...new Set(articles.flatMap((a) => a.tags))];
}
