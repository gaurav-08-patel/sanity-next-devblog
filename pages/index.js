import Link from 'next/link'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { getAllPosts } from '../lib/sanity'

export async function getStaticProps() {
  try {
    const posts = await getAllPosts()
    // Take the latest 4 posts for the homepage preview
    const featuredPosts = posts ? posts.slice(0, 4) : []
    return {
      props: { posts: featuredPosts },
      revalidate: 60,
    }
  } catch (error) {
    console.error("Error fetching posts for homepage:", error)
    return {
      props: { posts: [] },
      revalidate: 10,
    }
  }
}

export default function Home({ posts }) {
  return (
    <Layout
      title="DevBlog — Modern Coding Guides & Tools"
      description="Step-by-step developer tutorials, honest tool reviews, and programming tips for software builders."
      canonical="/"
    >
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="py-16 md:py-24 text-center md:text-left border-b border-blue-500/10 relative overflow-hidden">
        {/* Gradient background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
            <span className="text-blue-300 text-sm font-semibold">Welcome to DevBlog</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Level up your code, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              one article at a time.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-2xl">
            Comprehensive, beginner-friendly programming guides, honest tool reviews, and clear how-to steps to accelerate your learning curve.
          </p>

          <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 duration-200"
            >
              Explore Articles
            </Link>

            <Link
              href="/tools"
              className="px-6 py-3 border border-blue-500/30 hover:border-blue-400/60 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800 text-gray-100 font-semibold rounded-lg transition-all hover:-translate-y-1 duration-200"
            >
              Tool Comparisons
            </Link>

            <Link
              href="/howto"
              className="px-6 py-3 border border-purple-500/30 hover:border-purple-400/60 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800 text-gray-100 font-semibold rounded-lg transition-all hover:-translate-y-1 duration-200"
            >
              How-To Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Articles Section ────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-black text-white">
              Latest Articles
            </h2>
            <p className="text-gray-400 mt-2 text-lg">
              Fresh tutorials straight from the keyboard
            </p>
          </div>

          <Link
            href="/blog"
            className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 text-blue-300 font-semibold rounded-lg transition-all hover:translate-x-1 duration-200 flex items-center gap-2 whitespace-nowrap"
          >
            View all
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-blue-500/20 rounded-xl bg-slate-800/30 backdrop-blur-sm">
            <p className="text-gray-400 text-lg font-medium">
              No articles published yet. Publish some posts in Sanity Studio to see them here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {posts.map(p => (
              <PostCard key={p.slug?.current || p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
