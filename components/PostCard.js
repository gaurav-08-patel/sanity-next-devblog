import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }) {
  const slug = post.slug?.current || post.slug
  return (
    <article className='group relative flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300'>

      {/* Cover Image Container with zoom effect */}
      {post.coverImage && (
        <div className='relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900'>
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className='object-cover group-hover:scale-110 transition-transform duration-500'
            sizes='(max-width:768px) 100vw, 400px'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>
      )}

      {/* Content section */}
      <div className='flex flex-col flex-1 p-6'>

        {/* Tags */}
        <div className='flex gap-2 mb-3 flex-wrap'>
          {post.tags?.map(tag => (
            <span
              key={tag}
              className='text-[10px] uppercase tracking-wider font-semibold bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full border border-blue-500/30'
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className='font-bold text-lg text-white mb-2 leading-snug group-hover:text-blue-300 transition-colors'>
          <Link href={`/blog/${slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Description Brief */}
        <p className='text-gray-300 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed'>
          {post.brief}
        </p>

        {/* Meta details footer */}
        <div className='flex items-center justify-between pt-4 border-t border-blue-500/10 text-xs text-gray-400 font-medium'>
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
