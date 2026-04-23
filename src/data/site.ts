export const SITE = {
  name: 'Red Roan Construction',
  tagline: 'Expert Roofing for Hill Country & Austin',
  description: 'Expert roofing contractor serving the Texas Hill Country and Austin metro. Metal and asphalt shingle roofing, storm damage repair, and inspections. 10+ years experience, 5-year workmanship warranty.',
  url: 'https://red-roan-preview.pages.dev',
  phones: {
    hillCountry: '(830) 388-1502',
    hillCountryTel: '+18303881502',
    austin: '(512) 779-0037',
    austinTel: '+15127790037',
  },
  email: 'Info@RedRoanConstruction.com',
  address: {
    city: 'Copperas Cove',
    state: 'TX',
    serviceArea: 'Hill Country, Austin Metro & Central Texas',
  },
  years: '10+',
  warranty: '5-year workmanship warranty',
  colors: {
    accent: '#a6442e',
    navy: '#1a2744',
  },
  social: {},
} as const;

export const SERVICES = [
  {
    slug: 'roof-replacement',
    title: 'Roof Replacement',
    shortTitle: 'Roof Replacement',
    description: 'Full asphalt shingle and metal roof replacement for residential and light commercial properties across Central Texas.',
    icon: 'home',
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Repair',
    shortTitle: 'Storm Damage',
    description: 'Hail and wind damage assessment, insurance claim support, and emergency repairs after Texas storms.',
    icon: 'storm',
  },
  {
    slug: 'roof-repair',
    title: 'Roof Repair',
    shortTitle: 'Roof Repair',
    description: 'Leak repair, partial replacement, and emergency callouts for damaged or aging roofs.',
    icon: 'wrench',
  },
  {
    slug: 'roof-inspection',
    title: 'Roof Inspection',
    shortTitle: 'Roof Inspection',
    description: 'Free inspections for homeowners and buyers. Full documentation for insurance claims and annual maintenance.',
    icon: 'search',
  },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Mark D.',
    location: 'Copperas Cove, TX',
    text: 'Red Roan replaced our entire roof after a hailstorm. The crew was professional, the job was done in a day, and the cleanup was spotless. Highly recommend.',
    stars: 5,
  },
  {
    name: 'Sandra K.',
    location: 'Lampasas, TX',
    text: "We got a metal roof installed and couldn't be happier. The price was fair, the workmanship is excellent, and they handled everything with our insurance.",
    stars: 5,
  },
  {
    name: 'James R.',
    location: 'Georgetown, TX',
    text: 'Called them for a leak repair and they were out the next morning. Fixed the issue quickly and explained exactly what had caused it. Will use again.',
    stars: 5,
  },
  {
    name: 'Connie M.',
    location: 'Burnet, TX',
    text: 'Red Roan did our inspection before we bought our home. Thorough report, clear photos, and they caught an issue the seller had missed. Worth every penny.',
    stars: 5,
  },
];
