import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Category } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

type CosmicClient = typeof cosmic

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely extract string values from metadata fields that might be objects
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Safe date sorting helper - works for any content object
export function getDateValue(item: {
  published_at?: string | null
  modified_at?: string | null
  created_at?: string | null
}): number {
  const raw = item.published_at || item.modified_at || item.created_at
  const time = raw ? Date.parse(raw) : NaN
  return Number.isNaN(time) ? 0 : time
}

export async function getAllPosts(client: CosmicClient, previewToken?: string): Promise<Post[]> {
  try {
    const query = client.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const posts = response.objects as Post[]
    return posts.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(
  client: CosmicClient,
  slug: string,
  previewToken?: string
): Promise<Post | null> {
  try {
    const query = client.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Post) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

export async function getAllCategories(client: CosmicClient, previewToken?: string): Promise<Category[]> {
  try {
    const query = client.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(
  client: CosmicClient,
  slug: string,
  previewToken?: string
): Promise<Category | null> {
  try {
    const query = client.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

export async function getPostsByCategory(
  client: CosmicClient,
  categoryId: string,
  previewToken?: string
): Promise<Post[]> {
  try {
    const query = client.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata', 'created_at', 'modified_at'])
      .depth(1)
    const response = previewToken ? await query.status('any') : await query
    const posts = response.objects as Post[]
    return posts.sort((a, b) => getDateValue(b) - getDateValue(a))
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by category')
  }
}