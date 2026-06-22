import Link from "next/link";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/sanity";
import AdUnit from "@/components/AdUnit";

export async function getStaticProps() {
  try {
    const posts = await getAllPosts();
    // Take the latest 4 posts for the homepage preview
    const featuredPosts = posts ? posts.slice(0, 6) : [];
    return {
      props: { posts: featuredPosts },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching posts for homepage:", error);
    return {
      props: { posts: [] },
      revalidate: 10,
    };
  }
}

export default function Home({ posts }) {
  return (
    <Layout
      title="DevBlog — Developer Knowledge, connected."
      description="Your second brain for code, tutorials, and tools."
      canonical="/"
    >
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="py-24 md:py-32 flex flex-col items-start justify-center border-b border-[var(--color-graphite)]/50 ">
        <div className="max-w-3xl flex flex-col items-start text-left">
          <div className="mb-6 px-4 py-1.5 bg-[var(--color-surface)] border border-[var(--color-graphite)] rounded-full shadow-[var(--shadow-subtle)] inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-amethyst)] shadow-[0_0_8px_rgba(124,58,237,0.8)] animate-pulse"></span>
            <span className="text-[12px] font-medium text-[var(--color-bright-gray)] tracking-wider">
              New technical deep-dives added weekly
            </span>
          </div>

          <h1 className="text-[clamp(48px,8vw,72px)] font-bold leading-[1.05] tracking-[-1.5px] mb-6 bg-gradient-to-r from-[var(--color-amethyst)] via-[var(--color-lavender)] to-[var(--color-white)] bg-clip-text text-transparent">
            Developer Knowledge, connected.
          </h1>

          <p className="text-[18px] md:text-[22px] text-[var(--color-medium-gray)] font-normal leading-[1.5] tracking-[-0.32px] max-w-2xl mb-10">
            A sharp, faceted digital space built for clarity and
            focus. Explore step-by-step programming guides,
            architecture breakdowns, and honest reviews of the best
            developer tools.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-[var(--color-amethyst)] hover:bg-[#6b21a8] text-[var(--color-white)] text-[16px] font-medium rounded-[8px] transition-colors shadow-[var(--shadow-subtle)]"
            >
              Start Reading
            </Link>

            <Link
              href="/tools"
              className="px-6 py-3 bg-[var(--color-surface)] border border-[var(--color-graphite)] hover:bg-[var(--color-graphite)]/50 text-[var(--color-bright-gray)] text-[16px] font-medium rounded-[8px] transition-colors shadow-[var(--shadow-subtle)]"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </section>
      <AdUnit slot={"2084495010"} />

      {/* ── Latest Articles Section ────────────────────────── */}
      <section className="py-16 md:py-20 border-t border-[var(--color-graphite)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-[28px] font-semibold text-[var(--color-bright-gray)] tracking-[-0.56px]">
              Latest Articles
            </h2>
            <p className="text-[var(--color-medium-gray)] mt-2 text-[16px]">
              Fresh tutorials straight from the keyboard.
            </p>
          </div>

          <Link
            href="/blog"
            className="px-4 py-2 bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] hover:bg-[var(--color-graphite)]/30 text-[var(--color-bright-gray)] font-medium rounded-[8px] transition-colors text-[14px]"
          >
            View all
          </Link>
        </div>

        {posts?.length === 0 ? (
          <div className="text-center py-20 bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] rounded-[12px]">
            <p className="text-[var(--color-medium-gray)] text-[16px] font-medium">
              No articles published yet. Publish some posts in
              Sanity Studio to see them here!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {posts.map((p) => (
              <PostCard
                key={p.slug?.current || p.slug}
                post={p}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
