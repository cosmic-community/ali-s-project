import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { getAllCategories, getMetafieldValue } from '@/lib/cosmic'

export const metadata = {
  title: "Categories — ali's Project",
  description: 'Browse all post categories.',
}

export default async function CategoriesPage() {
  const { cosmic, previewToken } = await getCosmic()
  const categories = await getAllCategories(cosmic, previewToken)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 tracking-tight">
        Categories
      </h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const description = getMetafieldValue(category.metadata?.description)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                {description && <p className="text-gray-600 text-sm">{description}</p>}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}