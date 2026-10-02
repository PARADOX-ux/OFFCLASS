import fs from 'fs';
import path from 'path';

// Note: Requires installing `gray-matter` and `remark` / `react-markdown` in a real setup
// This serves as the foundation for the MDX/Markdown article system (Task D4)

const contentDirectory = path.join(process.cwd(), 'content');

export function getArticleSlugs(category: string) {
  try {
    const categoryPath = path.join(contentDirectory, category);
    return fs.readdirSync(categoryPath).filter(file => file.endsWith('.md'));
  } catch {
    return [];
  }
}

export function getArticleBySlug(category: string, slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // Here you would use gray-matter to parse frontmatter
    // return { slug: realSlug, frontmatter: {}, content: fileContents };
    return { slug: realSlug, content: fileContents };
  } catch {
    return null;
  }
}
