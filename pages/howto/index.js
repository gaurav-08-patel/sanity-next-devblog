import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { getPostsByTag } from '../../lib/sanity'

export async function getStaticProps() {
  try {
    const posts = await getPostsByTag('howto')
    return { 
      props: { posts: posts || [] }, 
      revalidate: 60 
    }
  } catch (error) {
    console.error("Error fetching how-to guide posts:", error)
    return { 
      props: { posts: [] }, 
      revalidate: 10 
    }
  }
}

export default function HowTo({ posts }) {
  return (
    <Layout
      title='How-To Guides'
      description='Step-by-step guides for software beginners'
      canonical='/howto'
    >
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
        How-To Guides
      </h1>
      <p className='text-gray-500 dark:text-gray-400 mb-8'>
        Step-by-step guides written for absolute beginners.
      </p>

      {posts?.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">
            No how-to articles yet — tag a Sanity article with 'howto' to see it here.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {posts.map(p => (
            <PostCard key={p.slug?.current || p.slug} post={p} />
          ))}
        </div>
      )}
    </Layout>
  )
}
