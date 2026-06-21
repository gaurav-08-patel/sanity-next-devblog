import Layout from '../../components/Layout'
import PostCard from '../../components/PostCard'
import SearchBar from '../../components/SearchBar'
import { getAllPosts } from '../../lib/sanity'

export async function getStaticProps() {
  try {
    const posts = await getAllPosts()
    return { 
      props: { posts: posts || [] }, 
      revalidate: 60 
    }
  } catch (error) {
    console.error("Error fetching posts:", error)
    return { 
      props: { posts: [] }, 
      revalidate: 10 
    }
  }
}

export default function Blog({ posts }) {
  return (
    <Layout
      title='All Articles'
      description='Programming tutorials for beginners'
      canonical='/blog'
    >
      <h1 className='text-3xl font-bold text-gray-900 mb-2'>All Articles</h1>
      <p className='text-gray-500 mb-8'>{posts?.length || 0} articles published</p>
      
      <div className="mb-8">
        <SearchBar posts={posts} />
      </div>

      {posts?.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-xl">
          <p className="text-gray-400">No articles published yet.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8'>
          {posts.map(p => (
            <PostCard key={p.slug?.current || p.slug} post={p} />
          ))}
        </div>
      )}
    </Layout>
  )
}
