const fs = require('fs');

const baseUrl = 'https://www.ilovahcleaningservices.com.au';

const pages = [
    '/',
    '/pest-control'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
  </url>
`).join('')}

</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log('✅ Sitemap generated!');