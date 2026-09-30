// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCosmic } from '@/lib/cosmic-preview'
import { getPostBySlug, getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const post = await getPostBySlug(cosmic, slug, previewToken)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const excerpt = getMetafieldValue(post.metadata?.excerpt)

  return {
    title: `${post.title} — ali's Project`,
    description: excerpt || post.title,
    other: {
      'cosmic-context': JSON.stringify({ object_id: post.id, object_type: 'posts' }),
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const post = await getPostBySlug(cosmic, slug, previewToken)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const content = post.metadata?.content || ''
  const excerpt = getMetafieldValue(post.metadata?.excerpt)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {category && (
        <div className="mb-6">
          <CategoryBadge category={category} />
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
        {post.title}
      </h1>

      {excerpt && <p className="text-lg text-gray-600 mb-8">{excerpt}</p>}

      {featuredImage && (
        <div className="mb-10 rounded-xl overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  )
}