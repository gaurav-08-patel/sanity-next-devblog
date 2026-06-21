import Link from 'next/link'
import Head from 'next/head'
import AdUnit from './AdUnit'

export default function Layout({ children, title, description, image, canonical }) {
  const BASE = 'https://yourdomain.com'
  const footerSlot = "6205491865";

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
      <header className='border-b border-blue-500/10 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-blue-500/5'>
        <nav className='max-w-4xl mx-auto px-4 h-16 flex items-center justify-between'>
          <Link href='/' className='font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity'>DevBlog</Link>
          <div className='hidden md:flex gap-8 text-sm text-gray-300 font-medium'>
            <Link href='/blog' className='hover:text-blue-400 transition-colors duration-200 relative group'>
              Articles
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/tools' className='hover:text-blue-400 transition-colors duration-200 relative group'>
              Tools
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/howto' className='hover:text-blue-400 transition-colors duration-200 relative group'>
              How-To
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300'></span>
            </Link>
          </div>
          <div className='md:hidden flex gap-4 text-sm text-gray-300'>
            <Link href='/blog' className='hover:text-blue-400 transition-colors'>Articles</Link>
            <Link href='/tools' className='hover:text-blue-400 transition-colors'>Tools</Link>
          </div>
        </nav>
      </header>
      <main className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>{children}</main>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdUnit slot={footerSlot} />
      </div>

      <footer className='border-t border-blue-500/10 mt-20 py-12 text-center text-sm text-gray-400'>
        <p className='font-medium'>Built with Next.js + Sanity</p>
      </footer>
    </>
  )
}

