'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-600 mb-8">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  )
}