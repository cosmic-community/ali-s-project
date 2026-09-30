import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  if (!category || !category.slug) {
    return null
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-block px-3 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-full hover:bg-indigo-100 transition-colors duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {category.title}
    </Link>
  )
}