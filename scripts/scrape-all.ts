/**
 * Batch scrape all cities from data/cities.csv.
 * Outputs combined listings to data/listings.json.
 *
 * Usage: npx tsx scripts/scrape-all.ts
 * Cost: ~$0.002 per city (50 cities = $0.10)
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { scrapeCity } from './scrape-city.js';

interface CityRow {
  city: string;
  state: string;
  state_abbr: string;
}

function parseCsv(content: string): CityRow[] {
  const lines = content.trim().split('\n');
  const rows: CityRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',').map(s => s.trim());
    if (parts.length >= 3) {
      rows.push({
        city: parts[0],
        state: parts[1],
        state_abbr: parts[2],
      });
    }
  }
  return rows;
}

async function main() {
  const csvPath = resolve(process.cwd(), 'data/cities.csv');
  const outputPath = resolve(process.cwd(), 'data/listings.json');

  const csv = readFileSync(csvPath, 'utf-8');
  const cities = parseCsv(csv);

  console.log(`Scraping ${cities.length} cities...`);

  const allListings: any[] = [];
  const seenDomains = new Set<string>();

  for (let i = 0; i < cities.length; i++) {
    const { city, state_abbr } = cities[i];
    console.log(`[${i + 1}/${cities.length}] ${city}, ${state_abbr}...`);

    try {
      const listings = await scrapeCity(city, state_abbr);

      // Global dedup by domain
      for (const listing of listings) {
        if (!seenDomains.has(listing.domain)) {
          seenDomains.add(listing.domain);
          allListings.push(listing);
        }
      }

      console.log(`  Found ${listings.length} (total unique: ${allListings.length})`);

      // Small delay to be respectful
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.error(`  Error: ${err}`);
    }
  }

  writeFileSync(outputPath, JSON.stringify(allListings, null, 2));
  console.log(`\nDone. ${allListings.length} unique listings saved to ${outputPath}`);

  // Generate city and state metadata
  const cityMeta: Record<string, any> = {};
  const stateMeta: Record<string, any> = {};

  for (const listing of allListings) {
    const cityKey = `${listing.city}-${listing.state}`;
    if (!cityMeta[cityKey]) {
      cityMeta[cityKey] = {
        city: listing.city,
        state: listing.state,
        slug: listing.city.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        stateSlug: listing.state.toLowerCase(),
        count: 0,
        avgRating: 0,
        totalReviews: 0,
        lat: listing.lat,
        lng: listing.lng,
      };
    }
    cityMeta[cityKey].count++;
    cityMeta[cityKey].avgRating += listing.rating;
    cityMeta[cityKey].totalReviews += listing.reviews;

    if (!stateMeta[listing.state]) {
      stateMeta[listing.state] = {
        state: listing.state,
        slug: listing.state.toLowerCase(),
        cities: new Set<string>(),
        count: 0,
      };
    }
    stateMeta[listing.state].cities.add(listing.city);
    stateMeta[listing.state].count++;
  }

  // Finalize averages
  for (const key of Object.keys(cityMeta)) {
    cityMeta[key].avgRating = Math.round((cityMeta[key].avgRating / cityMeta[key].count) * 10) / 10;
  }

  // Convert state city sets to arrays
  const stateOutput: any[] = [];
  for (const key of Object.keys(stateMeta)) {
    stateOutput.push({
      ...stateMeta[key],
      cities: Array.from(stateMeta[key].cities),
    });
  }

  writeFileSync(
    resolve(process.cwd(), 'data/cities.json'),
    JSON.stringify(Object.values(cityMeta), null, 2)
  );
  writeFileSync(
    resolve(process.cwd(), 'data/states.json'),
    JSON.stringify(stateOutput, null, 2)
  );

  console.log('City and state metadata generated.');
}

main();
