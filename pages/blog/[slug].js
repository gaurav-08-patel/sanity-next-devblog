import Layout from '../../components/Layout'
import { getAllPosts, getPostBySlug, client } from '../../lib/sanity'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'

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
  },
}

export default function Article({ post }) {
  if (!post) return null

  const slug = post.slug?.current || post.slug
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
        <PortableText value={post.body} components={components} />
      </div>
    </Layout>
  )
}
