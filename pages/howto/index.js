import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import AdUnit from "../../components/AdUnit";
import { getPostsByTag } from "../../lib/sanity";

const POSTS_PER_PAGE = 12;

export async function getStaticProps() {
    try {
        const posts = await getPostsByTag("howto");
        return {
            props: { posts: posts || [] },
            revalidate: 60,
        };
    } catch (error) {
        console.error("Error fetching how-to guide posts:", error);
        return {
            props: { posts: [] },
            revalidate: 10,
        };
    }
}

export default function HowTo({ posts }) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.max(
        1,
        Math.ceil((posts?.length || 0) / POSTS_PER_PAGE),
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts =
        posts?.slice(startIndex, startIndex + POSTS_PER_PAGE) || [];

    const showPagination = totalPages > 1;

    const renderPageButtons = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }

        const pages = [1];
        const left = Math.max(2, currentPage - 1);
        const right = Math.min(totalPages - 1, currentPage + 1);

        if (left > 2) pages.push("start-ellipsis");
        for (let page = left; page <= right; page += 1) {
            pages.push(page);
        }
        if (right < totalPages - 1) pages.push("end-ellipsis");
        pages.push(totalPages);
        return pages;
    };

    return (
        <Layout
            title="How-To Guides"
            description="Step-by-step tutorials and practical how-to guides for developers."
            canonical="/howto"
        >
            <div className="max-w-3xl">
                <h1 className="text-[clamp(3.75rem,5vw,6.5rem)] font-extrabold tracking-[-0.06em] bg-gradient-to-r from-[var(--color-amethyst)] via-[var(--color-lavender)] to-[var(--color-white)] bg-clip-text text-transparent leading-[0.98] mb-4 drop-shadow-[0_10px_30px_rgba(124,58,237,0.22)]">
                    How-To Guides
                </h1>
                <p className="text-[16px] md:text-[18px] text-[var(--color-medium-gray)] max-w-2xl leading-[1.8] mb-4">
                    Practical, step-by-step tutorials built to demystify modern
                    development workflows. These guides are designed to help you
                    move from concept to execution with confidence.
                </p>
                <p className="text-[16px] md:text-[18px] text-[var(--color-medium-gray)] max-w-2xl leading-[1.8] mb-6">
                    Whether you are learning a new tool, improving an
                    architecture pattern, or solving a specific problem, this
                    page brings together the clearest, most actionable how-to
                    content from the DevBlog archive.
                </p>
            </div>

            <div className="w-full max-w-full mt-6">
                <AdUnit slot="6224150651" />
            </div>

            <div className="flex flex-col gap-6 mt-10 mb-5">
                <div>
                    <p className="text-[var(--color-bright-gray)] font-bold text-xl">
                        {posts?.length || 0} how-to articles available
                    </p>
                    <p className="text-[14px] text-[var(--color-medium-gray)]">
                        Showing up to {POSTS_PER_PAGE} articles per page.
                    </p>
                </div>

                {pagePosts.length === 0 ? (
                    <div className="text-center py-20 bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] rounded-[12px]">
                        <p className="text-[var(--color-medium-gray)] text-[16px] font-medium">
                            No how-to articles yet — tag a Sanity article with
                            'howto' to see it here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {pagePosts.map((p) => (
                            <PostCard
                                key={p.slug?.current || p.slug}
                                post={p}
                            />
                        ))}
                    </div>
                )}
            </div>

            {showPagination && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-bright-gray)] border border-[var(--color-graphite)] transition hover:bg-[var(--color-graphite)]/40"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>

                    {renderPageButtons().map((page) => {
                        if (typeof page === "string") {
                            return (
                                <span
                                    key={page}
                                    className="px-3 py-2 text-[var(--color-medium-gray)]"
                                >
                                    …
                                </span>
                            );
                        }
                        return (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-full border transition ${page === currentPage ? "bg-[var(--color-amethyst)] text-white border-[var(--color-amethyst)]" : "bg-[var(--color-surface)] text-[var(--color-bright-gray)] border-[var(--color-graphite)] hover:bg-[var(--color-graphite)]/30"}`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages),
                            )
                        }
                        className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-bright-gray)] border border-[var(--color-graphite)] transition hover:bg-[var(--color-graphite)]/40"
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </Layout>
    );
}
