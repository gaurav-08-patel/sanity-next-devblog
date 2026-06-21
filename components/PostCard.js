import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }) {
  const slug = post.slug?.current || post.slug
  return (
    <article className='group relative flex flex-col h-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-black/30 hover:border-blue-100 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all duration-300'>

      {/* Cover Image Container with zoom effect */}
      {post.coverImage && (
        <div className='relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800'>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
            sizes='(max-width:768px) 100vw, 400px'
          />
        </div>
      )}

      {/* Content section */}
      <div className='flex flex-col flex-1 p-6'>

        {/* Tags */}
        <div className='flex gap-2 mb-3 flex-wrap'>
          {post.tags?.map(tag => (
            <span
              key={tag}
              className='text-[10px] uppercase tracking-wider font-semibold bg-blue-50/70 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 px-2.5 py-1 rounded-md'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className='font-bold text-lg text-gray-900 dark:text-zinc-50 mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
          <Link href={`/blog/${slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Description Brief */}
        <p className='text-gray-500 dark:text-zinc-400 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed'>
          {post.brief}
        </p>

        {/* Meta details footer */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800/80 text-xs text-gray-400 dark:text-zinc-500 font-medium'>
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
