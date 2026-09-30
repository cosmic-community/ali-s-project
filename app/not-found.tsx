import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, we couldn&apos;t find the page you were looking for.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
      >
        Back to Home
      </Link>
    </div>
  )
}