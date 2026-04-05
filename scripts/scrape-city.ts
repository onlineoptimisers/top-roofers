/**
 * Scrape roofing contractors for a single city via DataForSEO Maps API.
 *
 * Usage: npx tsx scripts/scrape-city.ts "San Antonio" "TX"
 *
 * Requires DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD env vars.
 * Cost: $0.002 per query.
 */

interface DataForSEOResult {
  title: string;
  domain?: string;
  url?: string;
  phone?: string;
  address?: string;
  rating?: { value: number; votes_count: number };
  category?: string;
  place_id?: string;
  latitude?: number;
  longitude?: number;
}

interface Listing {
  slug: string;
  title: string;
  domain: string;
  url: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  category: string;
  place_id: string;
  claimed: boolean;
  scraped_at: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractZip(address: string): string {
  const match = address.match(/\b(\d{5})\b/);
  return match ? match[1] : '';
}

export async function scrapeCity(city: string, state: string): Promise<Listing[]> {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    throw new Error('DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD env vars required');
  }

  const keyword = `roofing contractor ${city} ${state}`;
  const auth = Buffer.from(`${login}:${password}`).toString('base64');

  const response = await fetch('https://api.dataforseo.com/v3/serp/google/maps/live/advanced', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      keyword,
      location_name: `${city},${state},United States`,
      language_code: 'en',
      depth: 100,
    }]),
  });

  const data = await response.json();

  if (!data.tasks?.[0]?.result?.[0]?.items) {
    console.error('No results for', keyword);
    return [];
  }

  const items: DataForSEOResult[] = data.tasks[0].result[0].items.filter(
    (item: any) => item.type === 'maps_search'
  );

  const seen = new Set<string>();
  const listings: Listing[] = [];

  for (const item of items) {
    // Skip businesses without websites
    if (!item.domain || !item.url) continue;

    // Skip if category doesn't relate to roofing
    const cat = (item.category || '').toLowerCase();
    if (!cat.includes('roof') && !cat.includes('contractor') && !cat.includes('construction')) continue;

    // Dedup by domain
    const domain = item.domain.replace(/^www\./, '').toLowerCase();
    if (seen.has(domain)) continue;
    seen.add(domain);

    // Skip low quality
    const rating = item.rating?.value || 0;
    const reviews = item.rating?.votes_count || 0;
    if (rating < 3.0 || reviews < 3) continue;

    const listing: Listing = {
      slug: slugify(`${item.title}-${city}`),
      title: item.title || '',
      domain,
      url: item.url || '',
      phone: item.phone || '',
      address: item.address || '',
      city,
      state,
      zip: extractZip(item.address || ''),
      lat: item.latitude || 0,
      lng: item.longitude || 0,
      rating,
      reviews,
      category: item.category || 'Roofing contractor',
      place_id: item.place_id || '',
      claimed: false,
      scraped_at: new Date().toISOString().split('T')[0],
    };

    listings.push(listing);
  }

  return listings;
}

// CLI usage
if (process.argv[1]?.includes('scrape-city')) {
  const city = process.argv[2];
  const state = process.argv[3];

  if (!city || !state) {
    console.error('Usage: npx tsx scripts/scrape-city.ts "San Antonio" "TX"');
    process.exit(1);
  }

  scrapeCity(city, state).then(listings => {
    console.log(JSON.stringify(listings, null, 2));
    console.error(`Found ${listings.length} listings for ${city}, ${state}`);
  });
}
