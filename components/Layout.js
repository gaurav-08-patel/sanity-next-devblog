import Link from 'next/link'
import Head from 'next/head'
import AdUnit from './AdUnit'

export default function Layout({ children, title, description, image, canonical }) {
  const BASE = 'https://yourdomain.com'
  const footerSlot = "6205491865";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-abyss)] text-[var(--color-bright-gray)] font-sans antialiased">
      <Head>
        <title>{title || 'DevBlog — Developer Knowledge, connected.'}</title>
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

      <header className='sticky top-0 z-50 bg-[var(--color-abyss)] border-b border-[var(--color-graphite)]'>
        <nav className='max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between'>
          <div className="flex items-center gap-3">
            {/* Minimalist Logo mimicking the app icon style */}
            <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[var(--color-amethyst)] to-[var(--color-surface)] shadow-[var(--shadow-subtle)] flex items-center justify-center">
              <span className="text-[var(--color-white)] font-bold text-lg leading-none">D</span>
            </div>
            <Link href='/' className='font-bold text-lg text-[var(--color-bright-gray)] hover:opacity-80 transition-opacity'>
              DevBlog
            </Link>
          </div>
          
          <div className='hidden md:flex gap-12 text-[15px] text-[var(--color-medium-gray)] font-medium'>
            <Link href='/blog' className='relative group hover:text-[var(--color-bright-gray)] py-1 transition-colors duration-200'>
              Articles
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/tools' className='relative group hover:text-[var(--color-bright-gray)] py-1 transition-colors duration-200'>
              Tools
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300'></span>
            </Link>
            <Link href='/howto' className='relative group hover:text-[var(--color-bright-gray)] py-1 transition-colors duration-200'>
              How-To
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300'></span>
            </Link>
          </div>
          
          <div className='md:hidden flex gap-4 text-sm text-[var(--color-medium-gray)]'>
            <Link href='/blog' className='hover:text-[var(--color-bright-gray)] transition-colors'>Articles</Link>
            <Link href='/tools' className='hover:text-[var(--color-bright-gray)] transition-colors'>Tools</Link>
          </div>
        </nav>
      </header>

      <main className='flex-grow max-w-[1120px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col gap-[96px]'>
        {children}
      </main>

      {/* AdSpace Above Footer */}
      <div className="max-w-[1120px] mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-graphite)] p-4 shadow-[var(--shadow-subtle)]">
          <div className="text-[10px] text-[var(--color-muted-gray)] uppercase tracking-widest mb-2 text-center">Advertisement</div>
          <AdUnit slot={footerSlot} />
        </div>
      </div>

      <footer className='border-t border-[var(--color-graphite)] bg-[var(--color-surface)] pt-24 pb-12'>
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-[8px] bg-gradient-to-br from-[var(--color-amethyst)] to-[var(--color-surface)] shadow-[var(--shadow-subtle)] flex items-center justify-center">
                  <span className="text-[var(--color-white)] font-bold text-lg leading-none">D</span>
                </div>
                <span className="font-bold text-xl text-[var(--color-bright-gray)]">DevBlog</span>
              </div>
              <p className="text-[var(--color-medium-gray)] text-[16px] leading-relaxed max-w-sm">
                A sharp, faceted digital space built for clarity and focus. Explore programming guides, tools, and technical deep-dives.
              </p>
            </div>
            
            <div>
              <h3 className="text-[var(--color-bright-gray)] font-semibold mb-6 text-[16px] uppercase tracking-wider">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">All Articles</Link></li>
                <li><Link href="/tools" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">Developer Tools</Link></li>
                <li><Link href="/howto" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">How-To Guides</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[var(--color-bright-gray)] font-semibold mb-6 text-[16px] uppercase tracking-wider">Connect</h3>
              <ul className="space-y-4">
                <li><a href="#" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">GitHub</a></li>
                <li><a href="#" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">Twitter (X)</a></li>
                <li><a href="#" className="text-[var(--color-medium-gray)] hover:text-[var(--color-lavender)] text-[16px] transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[var(--color-graphite)] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[var(--color-muted-gray)] text-[12px]">
              &copy; {new Date().getFullYear()} DevBlog. Built with Next.js & Sanity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[var(--color-muted-gray)] hover:text-[var(--color-medium-gray)] text-[12px] transition-colors">Privacy Policy</a>
              <a href="#" className="text-[var(--color-muted-gray)] hover:text-[var(--color-medium-gray)] text-[12px] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
