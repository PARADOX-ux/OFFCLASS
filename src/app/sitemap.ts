import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://offclass.in';

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/money`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/skills`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/career`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/campus`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/life`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/opportunities`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
