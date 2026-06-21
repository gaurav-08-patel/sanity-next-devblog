import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getAllPosts() {
  return client.fetch(`
    *[_type == 'article'] | order(publishedAt desc) {
      title,
      brief,
      slug,
      publishedAt,
      tags,
      'coverImage': coverImage.asset->url,
      'readTime': round(length(pt::text(body)) / 5 / 180)
    }
  `)
}

export async function getPostBySlug(slug) {
  return client.fetch(`
    *[_type == 'article' && slug.current == $slug][0] {
      title,
      brief,
      slug,
      publishedAt,
      tags,
      body,
      'coverImage': coverImage.asset->url,
      'readTime': round(length(pt::text(body)) / 5 / 180)
    }
  `, { slug })
}

export async function getPostsByTag(tag) {
  return client.fetch(`
    *[_type == 'article' && $tag in tags] | order(publishedAt desc) {
      title,
      brief,
      slug,
      publishedAt,
      tags,
      'coverImage': coverImage.asset->url,
      'readTime': round(length(pt::text(body)) / 5 / 180)
    }
  `, { tag })
}
