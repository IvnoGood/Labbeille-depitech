import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getContentDirectory = (type) => path.join(process.cwd(), 'content', type);

export function getAllPostSlugs(type) {
  const contentDir = getContentDirectory(type);
  const filenames = fs.readdirSync(contentDir);
  return filenames.map(filename => ({
    slug: filename.replace(/\.mdx$/, '')
  }));
}

export function getAllPosts(type) {
  const slugs = fs.readdirSync(getContentDirectory(type));
  const posts = slugs.map(slug => {
    const fullPath = path.join(getContentDirectory(type), slug);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug: slug.replace(/\.mdx$/, ''),
      ...data,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPostBySlug(type, slug) {
  const fullPath = path.join(getContentDirectory(type), `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    ...data,
    content,
  };
}
