// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  published_at?: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    description?: string
  }
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    category?: Category
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts'
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}