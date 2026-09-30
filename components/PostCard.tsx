import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  if (!post) {
    return null
  }

  const featuredImage = post.metadata?.featured_image
  const category = post.metadata?.category
  const excerpt = getMetafieldValue(post.metadata?.excerpt)

  return (
    <article className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-200">
      <Link href={`/posts/${post.slug}`}>
        {featuredImage && (
          <div className="aspect-[16/10] overflow-hidden bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          {category && (
            <div className="mb-3">
              <CategoryBadge category={category} />
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-200">
            {post.title}
          </h2>
          {excerpt && <p className="text-gray-600 text-sm line-clamp-3">{excerpt}</p>}
        </div>
      </Link>
    </article>
  )
}