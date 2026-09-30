# ali's Project

![App Preview](https://imgix.cosmicjs.com/d6028280-bc6a-11f1-af12-19c569209b1c-autopilot-photo-1506905925346-21bda4d32df4-1790730246817.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A clean, modern blog website powered by [Cosmic](https://www.cosmicjs.com). Browse the latest posts, dive into rich individual articles, and explore content by category — all built on Next.js 16 with server-rendered content straight from your Cosmic bucket.

## Features

- 🏠 Homepage with a responsive grid of the latest posts, featured images, excerpts, and category tags
- 📖 Individual post pages with rich-text content, featured image, and category badge
- 🏷️ Categories index page and dedicated category pages listing filtered posts
- 🧭 Sticky header navigation and a simple footer
- 📱 Fully responsive, accessible, and typography-focused design
- ⚙️ Type-safe TypeScript codebase with strict Cosmic content types

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6abc5fea11130669816ba703&clone_repository=6abc61ac11130669816ba77b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "hi"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "ali's Project". The content is managed in Cosmic CMS with the following object types: posts, categories. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A clean, modern blog website powered by Cosmic CMS. Home page listing latest posts with featured images, titles, excerpts, and category tags. Individual post pages rendering rich-text content with featured image and category. Category pages listing posts filtered by category, plus a categories index. Responsive design, good typography, header navigation and footer.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) — App Router, Server Components
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management
- [TypeScript](https://www.typescriptlang.org) — Strict, type-safe code
- [Tailwind CSS](https://tailwindcss.com) — Utility-first styling with typography plugin

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Cosmic account and bucket with `posts` and `categories` object types

### Installation

```bash
bun install
bun run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
// Fetch all posts sorted by newest first
const posts = await getAllPosts(cosmic, previewToken)

// Fetch a single post with its category (depth 1)
const post = await getPostBySlug(cosmic, 'my-post-slug', previewToken)

// Fetch posts by category id
const posts = await getPostsByCategory(cosmic, categoryId, previewToken)
```

## Cosmic CMS Integration

This app reads from two Cosmic object types:

- **posts**: `excerpt`, `content` (rich text), `featured_image` (file), `category` (object relation to categories)
- **categories**: `description`

All content reads use the Cosmic depth parameter to resolve connected category objects in a single query. Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command `bun run build` and publish directory `.next`
4. Add the same environment variables
5. Deploy
<!-- README_END -->