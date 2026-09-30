// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCosmic } from '@/lib/cosmic-preview'
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const category = await getCategoryBySlug(cosmic, slug, previewToken)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  const description = getMetafieldValue(category.metadata?.description)

  return {
    title: `${category.title} — ali's Project`,
    description: description || category.title,
    other: {
      'cosmic-context': JSON.stringify({ object_id: category.id, object_type: 'categories' }),
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const { cosmic, previewToken } = await getCosmic()
  const category = await getCategoryBySlug(cosmic, slug, previewToken)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(cosmic, category.id, previewToken)
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          {category.title}
        </h1>
        {description && <p className="text-lg text-gray-600 max-w-2xl">{description}</p>}
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}