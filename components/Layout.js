import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import AdUnit from './AdUnit'

export default function Layout({ children, title, description, image, canonical }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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
        <nav className='max-w-[1120px] mx-auto px-8 sm:px-12 lg:px-16 py-5 flex items-center justify-between'>
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
          {/* --------------------------------- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[var(--color-surface)] ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 border-t border-[var(--color-graphite)]' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col px-8 py-6 space-y-6">
            <Link href='/blog' onClick={() => setIsMobileMenuOpen(false)} className='text-[18px] text-[var(--color-bright-gray)] font-medium hover:text-[var(--color-lavender)] transition-colors'>
              Articles
            </Link>
            <Link href='/tools' onClick={() => setIsMobileMenuOpen(false)} className='text-[18px] text-[var(--color-bright-gray)] font-medium hover:text-[var(--color-lavender)] transition-colors'>
              Tools
            </Link>
            <Link href='/howto' onClick={() => setIsMobileMenuOpen(false)} className='text-[18px] text-[var(--color-bright-gray)] font-medium hover:text-[var(--color-lavender)] transition-colors'>
              How-To
            </Link>
          </div>
        </div>
      </header>

      <main className='flex-grow max-w-[1120px] mx-auto w-full px-8 sm:px-12 lg:px-16 py-12 md:py-24 flex flex-col gap-[96px]'>
        {children}
      </main>

      {/* AdSpace Above Footer */}
      <div className="max-w-[1120px] mx-auto w-full px-8 sm:px-12 lg:px-16 mb-16">
        <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-graphite)] p-4 shadow-[var(--shadow-subtle)]">
          <div className="text-[10px] text-[var(--color-muted-gray)] uppercase tracking-widest mb-2 text-center">Advertisement</div>
          <AdUnit slot={footerSlot} />
        </div>
      </div>

      <footer className='relative border-t border-[var(--color-graphite)]/50 bg-[var(--color-surface)] pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden'>
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[300px] bg-[var(--color-amethyst)] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-amethyst)] to-transparent opacity-30"></div>

        <div className="relative max-w-[1120px] mx-auto px-8 sm:px-12 lg:px-16 z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 md:gap-16 mb-16 md:mb-20">
            <div className="col-span-1 sm:col-span-2 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-[8px] bg-gradient-to-br from-[var(--color-amethyst)] to-[#581c87] shadow-[0_0_15px_rgba(124,58,237,0.3)] flex items-center justify-center border border-[#a78bfa]/30">
                  <span className="text-[var(--color-white)] font-bold text-lg md:text-xl leading-none drop-shadow-md">D</span>
                </div>
                <span className="font-bold text-xl md:text-2xl text-[var(--color-bright-gray)] tracking-tight">DevBlog</span>
              </div>
              <p className="text-[var(--color-medium-gray)] text-[15px] md:text-[16px] leading-[1.6] max-w-sm">
                A crystalline knowledge vault. We explore the latest programming guides, deep architecture breakdowns, and deliver honest reviews of the best developer tools.
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="text-[var(--color-bright-gray)] font-semibold mb-6 text-[13px] uppercase tracking-[0.15em] opacity-80">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    All Articles
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/tools" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    Developer Tools
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/howto" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    How-To Guides
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-[var(--color-bright-gray)] font-semibold mb-6 text-[13px] uppercase tracking-[0.15em] opacity-80">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    About Us
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    Contact Page
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="text-[var(--color-bright-gray)] font-semibold mb-6 text-[13px] uppercase tracking-[0.15em] opacity-80">Connect</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    GitHub
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a href="#" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    LinkedIn
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
                <li>
                  <a href="#" className="relative group inline-block text-[var(--color-medium-gray)] hover:text-[var(--color-bright-gray)] text-[15px] transition-colors py-0.5">
                    Discord
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-amethyst)] shadow-[0_0_8px_var(--color-amethyst)] group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-graphite)]/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[var(--color-muted-gray)] text-[13px] text-center md:text-left font-medium">
              &copy; {new Date().getFullYear()} DevBlog. Built with precision and clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="relative group inline-block text-[var(--color-muted-gray)] hover:text-[var(--color-medium-gray)] text-[13px] font-medium transition-colors">
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-medium-gray)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/terms" className="relative group inline-block text-[var(--color-muted-gray)] hover:text-[var(--color-medium-gray)] text-[13px] font-medium transition-colors">
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--color-medium-gray)] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
