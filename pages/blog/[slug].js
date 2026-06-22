import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, client } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { createImageUrlBuilder } from '@sanity/image-url'
import AdUnit from '../../components/AdUnit'

// Image builder for Sanity assets
const builder = createImageUrlBuilder(client)
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
          slot: '1646310072' // Replace with your first ad slot ID
        })
      }

      // 2. Inject second ad after 8th paragraph (only for longer articles)
      if (paragraphCount === 8) {
        result.push({
          _key: `injected-ad-8-${idx}`,
          _type: 'adPlacement',
          slot: '2328836350' // Replace with your second ad slot ID (can be the same or different)
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
        <div className='relative w-full aspect-[16/9] my-8 overflow-hidden rounded-[12px] border border-[var(--color-graphite)]/50 bg-[var(--color-abyss)]'>
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
      <article className="w-full">
        {post.coverImage && (
          <div className='relative w-full aspect-[21/9] mb-12 rounded-[12px] overflow-hidden border border-[var(--color-graphite)]/50 bg-[var(--color-abyss)]'>
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className='object-cover'
              priority
            />
          </div>
        )}

        <div className='flex gap-3 mb-4 flex-wrap'>
          {post.tags?.map(tag => (
            <span
              key={tag}
              className='text-[10px] uppercase font-bold tracking-widest bg-[var(--color-amethyst)]/10 border border-[var(--color-amethyst)]/30 shadow-[0_0_10px_rgba(124,58,237,0.1)] text-[var(--color-lavender)] px-3 py-1 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className='text-[36px] sm:text-[48px] font-bold text-[var(--color-bright-gray)] tracking-[-1.5px] mb-4 leading-[1.1]'>
          {post.title}
        </h1>

        <div className='text-[14px] text-[var(--color-medium-gray)] mb-22 flex items-center gap-2'>
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
            : 'Draft'}
          <span>&middot;</span>
          <span>{post.readTime || 1} min read</span>
        </div>

        <div className='prose prose-invert max-w-none prose-p:text-[var(--color-medium-gray)] prose-headings:text-[var(--color-bright-gray)] prose-a:text-[var(--color-lavender)]'>
          <PortableText value={bodyWithAds} components={components} />
        </div>
      </article>
    </Layout>
  )
}
