import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900 tracking-tight">
            ali&apos;s Project
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}