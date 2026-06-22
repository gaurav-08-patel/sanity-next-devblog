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
      <h1 className='text-[36px] font-semibold text-[var(--color-bright-gray)] tracking-[-0.72px] mb-2'>
        Tool Comparisons
      </h1>
      <p className='text-[var(--color-medium-gray)] text-[16px] mb-12'>
        Honest comparisons of the best free developer tools.
      </p>

      {posts?.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] rounded-[12px]">
          <p className="text-[var(--color-medium-gray)] text-[16px] font-medium">
            No tool articles yet &mdash; tag a Sanity article with &apos;tools&apos; to see it here.
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
