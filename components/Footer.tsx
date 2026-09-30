export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {year} ali&apos;s Project. All rights reserved.
        </p>
        <p className="text-sm text-gray-500">
          Powered by{' '}
          <a
            href="https://www.cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Cosmic
          </a>
        </p>
      </div>
    </footer>
  )
}