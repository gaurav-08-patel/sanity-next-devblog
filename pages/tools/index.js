import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import { getPostsByTag } from '../../lib/sanity'

export async function getStaticProps() {
  try {
    const posts = await getPostsByTag('tools')
    return { 
      props: { posts: posts || [] }, 
      revalidate: 60 
    }
  } catch (error) {
    console.error("Error fetching tool comparison posts:", error)
    return { 
      props: { posts: [] }, 
      revalidate: 10 
    }
  }
}

export default function Tools({ posts }) {
  return (
    <Layout
      title='Tool Comparisons'
      description='Best free tools for CS students'
      canonical='/tools'
    >
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>
        Tool Comparisons
      </h1>
      <p className='text-gray-500 dark:text-gray-400 mb-8'>
        Honest comparisons of the best free developer tools.
      </p>

      {posts?.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">
            No tool articles yet — tag a Sanity article with 'tools' to see it here.
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
