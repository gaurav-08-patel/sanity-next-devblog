import React, { useState } from "react";
import Layout from "../../components/Layout";
import { getAllPosts, getPostBySlug, client } from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { createImageUrlBuilder } from "@sanity/image-url";
import AdUnit from "../../components/AdUnit";
import Highlight, { defaultProps } from "prism-react-renderer";
import vsDarkTheme from "prism-react-renderer/themes/vsDark";

// Image builder for Sanity assets
const builder = createImageUrlBuilder(client);
function urlFor(source) {
    return builder.image(source);
}

export async function getStaticPaths() {
    try {
        const posts = await getAllPosts();
        const paths = posts
            .filter((p) => p.slug?.current || p.slug)
            .map((p) => ({
                params: { slug: p.slug?.current || p.slug },
            }));

        return {
            paths,
            fallback: "blocking",
        };
    } catch (error) {
        console.error("Error generating paths:", error);
        return {
            paths: [],
            fallback: "blocking",
        };
    }
}

export async function getStaticProps({ params }) {
    try {
        const post = await getPostBySlug(params.slug);
        if (!post) {
            return { notFound: true };
        }
        return {
            props: { post },
            revalidate: 60,
        };
    } catch (error) {
        console.error(`Error fetching post with slug "${params.slug}":`, error);
        return { notFound: true };
    }
}

// Helper to automatically inject ads at specific paragraph milestones
function injectAds(bodyBlocks) {
    if (!bodyBlocks) return [];
    const result = [];
    let paragraphCount = 0;

    bodyBlocks.forEach((block, idx) => {
        result.push(block);

        // Check if the block is a standard paragraph
        if (
            block._type === "block" &&
            (!block.style || block.style === "normal")
        ) {
            paragraphCount++;

            // 1. Inject first ad after 6th paragraph
            if (paragraphCount === 6) {
                result.push({
                    _key: `injected-ad-6-${idx}`,
                    _type: "adPlacement",
                    slot: "1646310072", // Replace with your first ad slot ID
                });
            }

            // 2. Inject second ad after 18th paragraph
            if (paragraphCount === 18) {
                result.push({
                    _key: `injected-ad-18-${idx}`,
                    _type: "adPlacement",
                    slot: "2328836350", // Replace with your second ad slot ID
                });
            }

            // 3. Inject third ad after 28th paragraph
            if (paragraphCount === 28) {
                result.push({
                    _key: `injected-ad-28-${idx}`,
                    _type: "adPlacement",
                    slot: "8822850682", // Replace with your third ad slot ID
                });
            }
        }
    });

    return result;
}

function CodeBlock({ value }) {
    const [copied, setCopied] = useState(false);
    const codeText = value.code || "";

    const copyCode = async () => {
        if (!navigator?.clipboard) return;
        try {
            await navigator.clipboard.writeText(codeText);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 3000);
        } catch (error) {
            console.error("Copy failed", error);
        }
    };

    return (
        <div className="my-8 overflow-hidden rounded-3xl border border-slate-400/60 bg-slate-600/80 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 border-b border-slate-500/70 bg-slate-700/90 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-300">
                    {value.language || "code"}
                </div>
                <button
                    type="button"
                    onClick={copyCode}
                    className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-500/80 bg-slate-800/90 px-3 py-1 text-[11px] font-medium text-slate-100 transition hover:border-slate-300/80 hover:bg-slate-700/95 cursor-pointer"
                >
                    <span>{copied ? "✓ Copied" : "Copy"}</span>
                </button>
            </div>
            <div className="overflow-x-auto px-4 pb-4 pt-3">
                {value.filename && (
                    <div className="mb-2 text-xs uppercase tracking-widest text-slate-200 sm:text-sm">
                        {value.filename}
                    </div>
                )}
                <Highlight
                    {...defaultProps}
                    code={codeText}
                    language={value.language || "javascript"}
                    theme={vsDarkTheme}
                >
                    {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                    }) => (
                        <pre
                            className={`${className} overflow-x-auto rounded-2xl p-4 text-sm sm:text-base`}
                            style={{
                                ...style,
                                margin: 0,
                                background: "transparent",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                            }}
                        >
                            <code
                                className={`language-${value.language || "javascript"}`}
                            >
                                {tokens.map((line, lineIndex) => {
                                    const lineProps = getLineProps({
                                        line,
                                        key: lineIndex,
                                    });
                                    const { key: _lineKey, ...lineRest } =
                                        lineProps;
                                    return (
                                        <div key={lineIndex} {...lineRest}>
                                            {line.map((token, tokenIndex) => {
                                                const tokenProps =
                                                    getTokenProps({
                                                        token,
                                                        key: tokenIndex,
                                                    });
                                                const {
                                                    key: _tokenKey,
                                                    ...tokenRest
                                                } = tokenProps;
                                                return (
                                                    <span
                                                        key={tokenIndex}
                                                        {...tokenRest}
                                                    >
                                                        {token.content}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </code>
                        </pre>
                    )}
                </Highlight>
            </div>
        </div>
    );
}

// Custom components to render Sanity Portable Text
const components = {
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null;
            return (
                <div className="relative w-full aspect-[16/9] my-8 overflow-hidden rounded-[12px] border border-[var(--color-graphite)]/50 bg-[var(--color-abyss)]">
                    <Image
                        src={urlFor(value.asset).url()}
                        alt={value.alt || "Article image"}
                        fill
                        className="object-cover"
                    />
                </div>
            );
        },
        codeBlock: ({ value }) => <CodeBlock value={value} />,
        // Map custom ad block structure
        adPlacement: ({ value }) => {
            return <AdUnit slot={value.slot} />;
        },
    },
    marks: {
        chip: ({ children }) => (
            <span className="inline-flex items-center rounded-lg bg-slate-800 px-1 py-0.5  text-xs font-semibold text-white ring-1 ring-slate-700">
                {children}
            </span>
        ),
    },
};

export default function Article({ post }) {
    if (!post) return null;

    const slug = post.slug?.current || post.slug;
    const bodyWithAds = injectAds(post.body);

    return (
        <Layout
            title={post.title}
            description={post.brief}
            image={post.coverImage}
            canonical={`/blog/${slug}`}
        >
            <article className="w-full relative overflow-hidden rounded-[12px] border border-[var(--color-graphite)]/30 bg-[rgba(15,15,15,0.8)] backdrop-blur-xl px-5 py-8 shadow-[0_40px_120px_-50px_rgba(124,58,237,0.45)] sm:px-8">
                {post.coverImage && (
                    <div className="relative w-full aspect-[21/9] mb-12 rounded-[12px] overflow-hidden border border-[var(--color-graphite)]/50 bg-[var(--color-abyss)]">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="flex gap-3 mb-4 flex-wrap">
                    {post.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="text-[10px] uppercase font-bold tracking-widest bg-[var(--color-amethyst)]/10 border border-[var(--color-amethyst)]/30 shadow-[0_0_10px_rgba(124,58,237,0.1)] text-[var(--color-lavender)] px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-[36px] sm:text-[48px] font-bold text-[var(--color-bright-gray)] tracking-[-1.5px] mb-4 leading-[1.1] after:block after:mt-4 after:h-[4px] after:w-20 after:rounded-full after:bg-gradient-to-r after:from-[var(--color-amethyst)] after:to-[var(--color-lavender)]">
                    {post.title}
                </h1>

                <div className="text-[14px] text-[var(--color-medium-gray)] mb-14 flex items-center gap-2">
                    {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                              undefined,
                              {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                              },
                          )
                        : "Draft"}
                    <span>&middot;</span>
                    <span>{post.readTime || 1} min read</span>
                </div>

                <div className="prose prose-invert max-w-none prose-headings:text-[var(--color-bright-gray)] prose-p:text-[var(--color-medium-gray)] prose-p:text-base sm:prose-p:text-lg lg:prose-p:text-xl prose-li:text-[var(--color-lavender-light)] prose-li:marker:text-[var(--color-lavender-light)] prose-li:text-base sm:prose-li:text-lg lg:prose-li:text-xl prose-a:text-[var(--color-lavender)]">
                    <PortableText value={bodyWithAds} components={components} />
                </div>
            </article>
        </Layout>
    );
}
