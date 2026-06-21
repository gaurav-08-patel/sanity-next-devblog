import { getAllPosts } from '../lib/sanity'

const BASE = process.env.NEXT_PUBLIC_SITE_URL;

function generateSitemap(posts) {
  return `<?xml version='1.0' encoding='UTF-8'?>
<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
  <url>
    <loc>${BASE}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE}/tools</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${BASE}/howto</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
      .map(p => {
        const slug = p.slug?.current || p.slug
        if (!slug) return ''

        const date = p.publishedAt
          ? new Date(p.publishedAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]

        return `
  <url>
    <loc>${BASE}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      })
      .join('')}
</urlset>`
}

export async function getServerSideProps({ res }) {
  try {
    const posts = await getAllPosts()
    const sitemap = generateSitemap(posts || [])

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()
  } catch (error) {
    console.error("Error generating sitemap:", error)
    // Send a minimal fallback sitemap in case of error
    const fallbackSitemap = generateSitemap([])
    res.setHeader('Content-Type', 'text/xml')
    res.write(fallbackSitemap)
    res.end()
  }

  return { props: {} }
}

export default function Sitemap() {
  return null
}
