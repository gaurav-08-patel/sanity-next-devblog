import { useState, useRef, useEffect } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'

const FUSE_OPTIONS = {
  keys: ['title', 'brief', 'tags'],
  threshold: 0.4,
  minMatchCharLength: 2,
}

export default function SearchBar({ posts }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const fuse = useRef(null)
  const ref = useRef(null)

  useEffect(() => {
    if (posts) {
      fuse.current = new Fuse(posts, FUSE_OPTIONS)
    }
  }, [posts])

  useEffect(() => {
    const handler = e => {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleChange(e) {
    const q = e.target.value
    setQuery(q)
    if (q.length < 2) { 
      setResults([])
      setOpen(false)
      return 
    }
    if (fuse.current) {
      const res = fuse.current.search(q).slice(0, 6)
      setResults(res)
      setOpen(res.length > 0)
    }
  }

  function getSlug(post) {
    return post.slug?.current || post.slug
  }

  return (
    <div ref={ref} className='relative w-full max-w-md'>
      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='Search articles...'
        className='w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors'
      />
      {open && (
        <ul className='absolute top-full left-0 mt-1 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-lg dark:shadow-black/50 z-50 overflow-hidden divide-y divide-gray-100 dark:divide-zinc-800'>
          {results.map(({ item }) => (
            <li key={getSlug(item)}>
              <Link
                href={`/blog/${getSlug(item)}`}
                onClick={() => { setQuery(''); setOpen(false) }}
                className='flex flex-col px-4 py-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors'>
                <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                  {item.title}
                </span>
                <span className='text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-1'>
                  {item.brief}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
