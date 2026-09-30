import { getCosmic } from '@/lib/cosmic-preview'
import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const metadata = {
  title: "ali's Project — Home",
  description: 'A clean, modern blog website powered by Cosmic CMS.',
}

export default async function HomePage() {
  const { cosmic, previewToken } = await getCosmic()
  const posts = await getAllPosts(cosmic, previewToken)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          ali&apos;s Project
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Thoughts, stories and ideas from a creative portfolio blog.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No posts published yet. Check back soon!</p>
        </div>
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