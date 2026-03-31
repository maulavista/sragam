import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sragam.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/vendor/'],
        disallow: [
          '/dashboard/',
          '/success',
          '/api/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
