import Link from 'next/link'
import Head from 'next/head'

export default function Layout({ children, title, description, image, canonical }) {
  const BASE = 'https://yourdomain.com'
  return (
    <>
      <Head>
        <title>{title || 'DevBlog — Programming for Beginners'}</title>
        <meta name='description' content={description || 'Programming tutorials'} />
        <meta property='og:title' content={title || 'DevBlog'} />
        <meta property='og:description' content={description || ''} />
        <meta property='og:image' content={image || `${BASE}/og-default.png`} />
        <meta property='og:type' content='website' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title || 'DevBlog'} />
        <meta name='twitter:image' content={image || `${BASE}/og-default.png`} />
        {canonical && <link rel='canonical' href={`${BASE}${canonical}`} />}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className='border-b border-gray-200 bg-white sticky top-0 z-50'>
        <nav className='max-w-4xl mx-auto px-4 h-14 flex items-center justify-between'>
          <Link href='/' className='font-bold text-lg text-gray-900'>DevBlog</Link>
          <div className='flex gap-6 text-sm text-gray-600'>
            <Link href='/blog' className='hover:text-gray-900'>Articles</Link>
            <Link href='/tools' className='hover:text-gray-900'>Tools</Link>
            <Link href='/howto' className='hover:text-gray-900'>How-To</Link>
          </div>
        </nav>
      </header>
      <main className='max-w-4xl mx-auto px-4 py-10'>{children}</main>
      <footer className='border-t border-gray-200 mt-16 py-8 text-center text-sm text-gray-500'>
        <p>Built with Next.js + Sanity</p>
      </footer>
    </>
  )
}
