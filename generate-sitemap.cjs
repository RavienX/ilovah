const fs = require('fs');

const baseUrl = 'https://www.ilovahcleaningservices.com.au';
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

// Every public route from Root.jsx, with SEO priority hints.
// /admin is deliberately excluded — it must never appear in the sitemap.
// Keep this list in sync with Root.jsx whenever a route is added or removed.
const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/end-of-lease-cleaning', priority: '0.9', changefreq: 'monthly' },
  { path: '/pest-control', priority: '0.9', changefreq: 'monthly' },
  { path: '/carpet-cleaning', priority: '0.8', changefreq: 'monthly' },
  { path: '/window-cleaning', priority: '0.8', changefreq: 'monthly' },
  { path: '/gutter-cleaning', priority: '0.8', changefreq: 'monthly' },
  { path: '/pressure-washing', priority: '0.8', changefreq: 'monthly' },
  { path: '/general-house-cleaning', priority: '0.8', changefreq: 'monthly' },
  { path: '/pram-cleaning', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/reviews', priority: '0.6', changefreq: 'weekly' },
  { path: '/faq', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog', priority: '0.6', changefreq: 'weekly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log(`✅ Sitemap generated with ${pages.length} pages!`);
