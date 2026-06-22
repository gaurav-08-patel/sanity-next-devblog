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
      <h1 className='text-[36px] font-semibold text-[var(--color-bright-gray)] tracking-[-0.72px] mb-2'>
        How-To Guides
      </h1>
      <p className='text-[var(--color-medium-gray)] text-[16px] mb-12'>
        Step-by-step guides written for absolute beginners.
      </p>

      {posts?.length === 0 ? (
        <div className="text-center py-20 bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] rounded-[12px]">
          <p className="text-[var(--color-medium-gray)] text-[16px] font-medium">
            No how-to articles yet &mdash; tag a Sanity article with &apos;howto&apos; to see it here.
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
