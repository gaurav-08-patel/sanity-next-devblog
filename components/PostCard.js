import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }) {
  const slug = post.slug?.current || post.slug
  return (
    <article className='group relative flex flex-col h-full bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-amethyst)]/30 rounded-[12px] overflow-hidden shadow-[var(--shadow-subtle)] transition-all duration-300 hover:bg-[var(--color-graphite)]/20 hover:shadow-[0_0_30px_-5px_rgba(124,58,237,0.15)]'>
      
      {/* Cover Image Container */}
      {post.coverImage && (
        <div className='relative w-full aspect-[16/9] overflow-hidden bg-[var(--color-abyss)] border-b border-[var(--color-graphite)]/50'>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className='object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300'
            sizes='(max-width:768px) 100vw, 400px'
          />
        </div>
      )}

      {/* Content section */}
      <div className='flex flex-col flex-1 p-6'>
        
        {/* Tags */}
        <div className='flex gap-2 mb-4 flex-wrap'>
          {post.tags?.map(tag => (
            <span
              key={tag}
              className='text-[12px] font-medium tracking-tight bg-[#8a5cf5]/15 text-[var(--color-lavender)] px-2 py-0.5 rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className='font-bold text-[24px] text-[var(--color-bright-gray)] tracking-[-0.48px] leading-[1.33] mb-2 group-hover:text-[var(--color-white)] transition-colors'>
          <Link href={`/blog/${slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Description Brief */}
        <p className='text-[var(--color-medium-gray)] text-[16px] tracking-[-0.32px] leading-[1.5] line-clamp-3 mb-6 flex-1'>
          {post.brief}
        </p>

        {/* Meta details footer */}
        <div className='flex items-center justify-between pt-4 border-t border-[var(--color-graphite)] text-[12px] text-[var(--color-muted-gray)] font-medium tracking-[-0.24px]'>
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
              : 'Draft'}
          </span>
          <span>{post.readTime || 1} min read</span>
        </div>
      </div>
    </article>
  )
}
