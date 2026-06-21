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
      <section className="py-12 md:py-20 text-center md:text-left border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Level up your code, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              one article at a time.
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            Welcome to DevBlog. I write comprehensive, beginner-friendly programming guides, compare utility tools, and detail clear how-to steps to speed up your learning curve.
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg shadow-sm transition-all hover:-translate-y-0.5"
            >
              Explore Articles
            </Link>

            <Link
              href="/tools"
              className="px-6 py-3 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all hover:-translate-y-0.5"
            >
              Tool Comparisons
            </Link>

            <Link
              href="/howto"
              className="px-6 py-3 border border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all hover:-translate-y-0.5"
            >
              How-To Guides
            </Link>
          </div>
        </div>
      </section>

      {/* ── Latest Articles Section ────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Fresh tutorials straight from the keyboard
            </p>
          </div>

          <Link
            href="/blog"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
          >
            View all
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-200 dark:border-zinc-800 rounded-xl">
            <p className="text-gray-400 dark:text-gray-500">
              No articles published yet. Publish some posts in Sanity Studio to see them here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.map(p => (
              <PostCard key={p.slug?.current || p.slug} post={p} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
