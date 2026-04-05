/**
 * Data access layer for listings, cities, and states.
 * Reads from JSON files in /data/ directory.
 */

import listingsData from '../../data/listings.json';

export interface Listing {
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

export interface CityMeta {
  city: string;
  state: string;
  slug: string;
  stateSlug: string;
  count: number;
  avgRating: number;
}

export interface StateMeta {
  state: string;
  slug: string;
  cities: string[];
  count: number;
}

const listings: Listing[] = listingsData as Listing[];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// State name to abbreviation mapping
const STATE_ABBR: Record<string, string> = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
  'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
  'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
  'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
  'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
  'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
  'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
  'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
  'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
  'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
  'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
  'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
  'wisconsin': 'WI', 'wyoming': 'WY',
};

const ABBR_TO_STATE: Record<string, string> = {};
for (const [name, abbr] of Object.entries(STATE_ABBR)) {
  ABBR_TO_STATE[abbr] = name.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

export function getStateName(abbr: string): string {
  return ABBR_TO_STATE[abbr.toUpperCase()] || abbr;
}

export function getStateSlug(abbr: string): string {
  const name = getStateName(abbr);
  return slugify(name);
}

export function getAllListings(): Listing[] {
  return listings;
}

export function getListingsByCity(city: string, state: string): Listing[] {
  return listings.filter(
    l => l.city.toLowerCase() === city.toLowerCase() && l.state.toUpperCase() === state.toUpperCase()
  ).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
}

export function getListingBySlug(slug: string): Listing | undefined {
  return listings.find(l => l.slug === slug);
}

export function getAllCities(): CityMeta[] {
  const cityMap = new Map<string, CityMeta>();

  for (const l of listings) {
    const key = `${l.city}-${l.state}`;
    if (!cityMap.has(key)) {
      cityMap.set(key, {
        city: l.city,
        state: l.state,
        slug: slugify(l.city),
        stateSlug: getStateSlug(l.state),
        count: 0,
        avgRating: 0,
      });
    }
    const meta = cityMap.get(key)!;
    meta.avgRating = (meta.avgRating * meta.count + l.rating) / (meta.count + 1);
    meta.count++;
  }

  return Array.from(cityMap.values()).sort((a, b) => b.count - a.count);
}

export function getCitiesByState(state: string): CityMeta[] {
  return getAllCities().filter(c => c.state.toUpperCase() === state.toUpperCase());
}

export function getAllStates(): StateMeta[] {
  const stateMap = new Map<string, StateMeta>();

  for (const l of listings) {
    if (!stateMap.has(l.state)) {
      stateMap.set(l.state, {
        state: l.state,
        slug: getStateSlug(l.state),
        cities: [],
        count: 0,
      });
    }
    const meta = stateMap.get(l.state)!;
    if (!meta.cities.includes(l.city)) meta.cities.push(l.city);
    meta.count++;
  }

  return Array.from(stateMap.values()).sort((a, b) => b.count - a.count);
}

export function getStateBySlug(slug: string): StateMeta | undefined {
  return getAllStates().find(s => s.slug === slug);
}

export function getCityBySlug(stateSlug: string, citySlug: string): CityMeta | undefined {
  return getAllCities().find(c => c.stateSlug === stateSlug && c.slug === citySlug);
}
