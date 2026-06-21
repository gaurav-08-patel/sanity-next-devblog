import Link from 'next/link'
import Image from 'next/image'

export default function PostCard({ post }) {
  const slug = post.slug?.current || post.slug
  return (
    <article className='border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow'>
      {post.coverImage && (
        <div className='relative h-44 w-full'>
          <Image src={post.coverImage} alt={post.title}
            fill className='object-cover'
            sizes='(max-width:768px) 100vw, 600px' />
        </div>
      )}
      <div className='p-5'>
        <div className='flex gap-2 mb-2 flex-wrap'>
          {post.tags?.map(tag => (
            <span key={tag}
              className='text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full'>
              {tag}
            </span>
          ))}
        </div>
        <h2 className='font-bold text-lg text-gray-900 mb-1 leading-snug'>
          <Link href={`/blog/${slug}`} className='hover:text-blue-600'>
            {post.title}
          </Link>
        </h2>
        <p className='text-gray-500 text-sm line-clamp-2 mb-3'>{post.brief}</p>
        <div className='flex items-center justify-between text-xs text-gray-400'>
          <span>
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : 'Draft'}
          </span>
          <span>{post.readTime || 1} min read</span>
        </div>
      </div>
    </article>
  )
}
