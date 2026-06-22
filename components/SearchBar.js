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
        placeholder='Search knowledge base...'
        className='w-full bg-[var(--color-surface)] shadow-[var(--shadow-subtle)] rounded-[8px] px-4 py-2.5 text-[14px] text-[var(--color-bright-gray)] placeholder-[var(--color-muted-gray)] focus:outline-none focus:ring-2 focus:ring-[var(--color-amethyst)] transition-shadow'
      />
      {open && (
        <ul className='absolute top-full left-0 mt-2 w-full bg-[var(--color-surface)] shadow-[var(--shadow-xl)] shadow-[var(--shadow-subtle-3)] rounded-[8px] z-50 overflow-hidden divide-y divide-[var(--color-graphite)]'>
          {results.map(({ item }) => (
            <li key={getSlug(item)}>
              <Link
                href={`/blog/${getSlug(item)}`}
                onClick={() => { setQuery(''); setOpen(false) }}
                className='flex flex-col px-4 py-3 hover:bg-[var(--color-graphite)]/30 transition-colors'>
                <span className='text-[14px] font-medium text-[var(--color-bright-gray)]'>
                  {item.title}
                </span>
                <span className='text-[12px] text-[var(--color-medium-gray)] mt-1 line-clamp-1'>
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
