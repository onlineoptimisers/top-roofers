/**
 * Bulk scraper: scrapes all cities, outputs:
 * - data/listings.json (businesses WITH websites, for the directory)
 * - data/no-website.csv (businesses WITHOUT websites, for outreach)
 * - data/cities.json + data/states.json (metadata)
 *
 * Usage: node scripts/scrape-bulk.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const LOGIN = process.env.DATAFORSEO_LOGIN;
const PASSWORD = process.env.DATAFORSEO_PASSWORD;
const auth = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const STATE_NAMES = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',CO:'Colorado',
  CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',HI:'Hawaii',ID:'Idaho',
  IL:'Illinois',IN:'Indiana',IA:'Iowa',KS:'Kansas',KY:'Kentucky',LA:'Louisiana',
  ME:'Maine',MD:'Maryland',MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',
  MO:'Missouri',MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
  NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',OK:'Oklahoma',
  OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',SD:'South Dakota',
  TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',VA:'Virginia',WA:'Washington',
  WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
};

async function scrapeCity(city, stateAbbr) {
  const stateName = STATE_NAMES[stateAbbr] || stateAbbr;
  const keyword = `roofing contractor ${city} ${stateAbbr}`;

  const response = await fetch('https://api.dataforseo.com/v3/serp/google/maps/live/advanced', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      keyword,
      location_name: `${city},${stateName},United States`,
      language_code: 'en',
      depth: 100,
    }]),
  });

  const data = await response.json();
  if (!data.tasks?.[0]?.result?.[0]?.items) {
    console.error(`  No results for ${keyword}`);
    return { withSite: [], noSite: [] };
  }

  const items = data.tasks[0].result[0].items;
  const withSite = [];
  const noSite = [];
  const seenDomains = new Set();

  for (const item of items) {
    // Skip paid/sponsored items
    if (item.type !== 'maps_search') continue;

    const rating = item.rating?.value || 0;
    const reviews = item.rating?.votes_count || 0;

    // Skip very low quality
    if (rating < 3.0 || reviews < 2) continue;

    const hasSite = item.domain && item.url;

    if (hasSite) {
      const domain = item.domain.replace(/^www\./, '').toLowerCase();
      if (seenDomains.has(domain)) continue;
      seenDomains.add(domain);

      withSite.push({
        slug: slugify(`${item.title}-${city}`),
        title: item.title || '',
        domain,
        url: item.url || '',
        phone: item.phone || '',
        address: item.address || '',
        city,
        state: stateAbbr,
        zip: item.address_info?.zip || '',
        lat: item.latitude || 0,
        lng: item.longitude || 0,
        rating,
        reviews,
        category: item.category || 'Roofing contractor',
        place_id: item.place_id || '',
        claimed: false,
        scraped_at: new Date().toISOString().split('T')[0],
      });
    } else {
      // No website - track for outreach
      noSite.push({
        title: item.title || '',
        phone: item.phone || '',
        address: item.address || '',
        city,
        state: stateAbbr,
        rating,
        reviews,
        category: item.category || 'Roofing contractor',
        place_id: item.place_id || '',
      });
    }
  }

  return { withSite, noSite };
}

async function main() {
  if (!LOGIN || !PASSWORD) {
    console.error('Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD env vars');
    process.exit(1);
  }

  const csvPath = resolve(process.cwd(), 'data/cities.csv');
  const csv = readFileSync(csvPath, 'utf-8');
  const lines = csv.trim().split('\n').slice(1);
  const cities = lines.map(line => {
    const parts = line.split(',').map(s => s.trim());
    return { city: parts[0], state: parts[1], abbr: parts[2] };
  });

  console.log(`Scraping ${cities.length} cities...\n`);

  const allListings = [];
  const allNoSite = [];
  const globalDomains = new Set();

  for (let i = 0; i < cities.length; i++) {
    const { city, abbr } = cities[i];
    console.log(`[${i + 1}/${cities.length}] ${city}, ${abbr}...`);

    try {
      const { withSite, noSite } = await scrapeCity(city, abbr);

      // Global dedup by domain
      for (const listing of withSite) {
        if (!globalDomains.has(listing.domain)) {
          globalDomains.add(listing.domain);
          allListings.push(listing);
        }
      }

      allNoSite.push(...noSite);
      console.log(`  ${withSite.length} with website, ${noSite.length} without (total: ${allListings.length} unique)`);

      // Small delay between requests
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  // Write listings JSON
  writeFileSync(resolve(process.cwd(), 'data/listings.json'), JSON.stringify(allListings, null, 2));

  // Write no-website CSV
  const csvHeader = 'business_name,phone,address,city,state,rating,reviews,category,place_id';
  const csvRows = allNoSite.map(b =>
    `"${b.title.replace(/"/g, '""')}","${b.phone}","${b.address.replace(/"/g, '""')}","${b.city}","${b.state}",${b.rating},${b.reviews},"${b.category}","${b.place_id}"`
  );
  writeFileSync(resolve(process.cwd(), 'data/no-website.csv'), [csvHeader, ...csvRows].join('\n'));

  // Generate city metadata
  const cityMap = {};
  for (const l of allListings) {
    const key = `${l.city}-${l.state}`;
    if (!cityMap[key]) {
      cityMap[key] = { city: l.city, state: l.state, slug: slugify(l.city), stateSlug: slugify(STATE_NAMES[l.state] || l.state), count: 0, avgRating: 0, totalReviews: 0, lat: l.lat, lng: l.lng };
    }
    cityMap[key].count++;
    cityMap[key].avgRating += l.rating;
    cityMap[key].totalReviews += l.reviews;
  }
  for (const key of Object.keys(cityMap)) {
    cityMap[key].avgRating = Math.round((cityMap[key].avgRating / cityMap[key].count) * 10) / 10;
  }
  writeFileSync(resolve(process.cwd(), 'data/cities-meta.json'), JSON.stringify(Object.values(cityMap), null, 2));

  // Generate state metadata
  const stateMap = {};
  for (const l of allListings) {
    if (!stateMap[l.state]) {
      stateMap[l.state] = { state: l.state, slug: slugify(STATE_NAMES[l.state] || l.state), cities: new Set(), count: 0 };
    }
    stateMap[l.state].cities.add(l.city);
    stateMap[l.state].count++;
  }
  const statesOut = Object.values(stateMap).map(s => ({ ...s, cities: [...s.cities] }));
  writeFileSync(resolve(process.cwd(), 'data/states-meta.json'), JSON.stringify(statesOut, null, 2));

  console.log(`\n=== DONE ===`);
  console.log(`${allListings.length} listings with websites -> data/listings.json`);
  console.log(`${allNoSite.length} businesses WITHOUT websites -> data/no-website.csv`);
  console.log(`${Object.keys(cityMap).length} cities, ${Object.keys(stateMap).length} states`);
  console.log(`Estimated API cost: ${cities.length} x $0.002 = $${(cities.length * 0.002).toFixed(2)}`);
}

main();
