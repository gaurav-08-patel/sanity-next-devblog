import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, client } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import AdUnit from '../../components/AdUnit'

// Image builder for Sanity assets
const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export async function getStaticPaths() {
  try {
    const posts = await getAllPosts()
    const paths = posts
      .filter(p => p.slug?.current || p.slug)
      .map(p => ({
        params: { slug: p.slug?.current || p.slug }
      }))
    
    return {
      paths,
      fallback: 'blocking',
    }
  } catch (error) {
    console.error("Error generating paths:", error)
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps({ params }) {
  try {
    const post = await getPostBySlug(params.slug)
    if (!post) {
      return { notFound: true }
    }
    return { 
      props: { post }, 
      revalidate: 60 
    }
  } catch (error) {
    console.error(`Error fetching post with slug "${params.slug}":`, error)
    return { notFound: true }
  }
}

// Helper to automatically inject ads at specific paragraph milestones
function injectAds(bodyBlocks) {
  if (!bodyBlocks) return []
  const result = []
  let paragraphCount = 0

  bodyBlocks.forEach((block, idx) => {
    result.push(block)

    // Check if the block is a standard paragraph
    if (block._type === 'block' && (!block.style || block.style === 'normal')) {
      paragraphCount++

      // 1. Inject first ad after 3rd paragraph
      if (paragraphCount === 3) {
        result.push({
          _key: `injected-ad-3-${idx}`,
          _type: 'adPlacement',
          slot: '1234567890' // Replace with your first ad slot ID
        })
      }
      
      // 2. Inject second ad after 8th paragraph (only for longer articles)
      if (paragraphCount === 8) {
        result.push({
          _key: `injected-ad-8-${idx}`,
          _type: 'adPlacement',
          slot: '0987654321' // Replace with your second ad slot ID (can be the same or different)
        })
      }
    }
  })

  return result
}

// Custom components to render Sanity Portable Text
const components = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <div className='relative w-full h-64 sm:h-96 my-6 overflow-hidden rounded-lg'>
          <Image 
            src={urlFor(value.asset).url()} 
            alt={value.alt || 'Article image'}
            fill 
            className='object-cover' 
          />
        </div>
      )
    },
    // Map custom ad block structure
    adPlacement: ({ value }) => {
      return <AdUnit slot={value.slot} />
    }
  },
}

export default function Article({ post }) {
  if (!post) return null

  const slug = post.slug?.current || post.slug
  const bodyWithAds = injectAds(post.body)

  return (
    <Layout
      title={post.title}
      description={post.brief}
      image={post.coverImage}
      canonical={`/blog/${slug}`}
    >
      {post.coverImage && (
        <div className='relative h-64 sm:h-[400px] w-full mb-8 rounded-xl overflow-hidden'>
          <Image 
            src={post.coverImage} 
            alt={post.title}
            fill 
            className='object-cover' 
            priority 
          />
        </div>
      )}
      
      <div className='flex gap-2 mb-4 flex-wrap'>
        {post.tags?.map(tag => (
          <span 
            key={tag}
            className='text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full'
          >
            {tag}
          </span>
        ))}
      </div>
      
      <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight'>
        {post.title}
      </h1>
      
      <div className='text-sm text-gray-400 mb-8'>
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'Draft'}{' '}
        · {post.readTime || 1} min read
      </div>
      
      <div className='prose prose-gray max-w-none dark:prose-invert'>
        <PortableText value={bodyWithAds} components={components} />
      </div>
    </Layout>
  )
}
