import { getPostBySlug, getAllPostSlugs } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getAllPostSlugs('lore');
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug('lore', params.slug);
  return { title: `${post.title} | The Honeycomb Hub` };
}

export default async function LorePostPage({ params }) {
  const { title, date, author, content } = await getPostBySlug('lore', params.slug);

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <article className="prose lg:prose-xl bg-yellow-400/90 p-8 rounded-lg shadow-lg">
        <h1 className='text-2xl font-bold'>{title}</h1>
        <div className="text-yellow-700 mb-8 italic">
          By {author} on {new Date(date).toLocaleDateString()}
        </div>
        <div className='text-black'>
          <MDXRemote source={content} />
        </div>
      </article>
    </div>
  );
}
