export interface ServiceInfo {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  heroText: string;
  sections: { heading: string; text: string }[];
  avgCost: string;
  keywords: string[];
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'roof-replacement',
    title: 'Roof Replacement',
    shortTitle: 'Replacement',
    description: 'Find trusted roof replacement contractors near you. Compare reviews, ratings, and get quotes from verified roofers.',
    heroText: 'A full roof replacement is one of the biggest investments you will make in your home. Getting it right means choosing the right contractor, the right materials, and understanding the process before signing anything.',
    sections: [
      { heading: 'When to Replace Your Roof', text: 'Most asphalt shingle roofs last 20-30 years. If your roof is past 80% of its expected lifespan and showing signs of wear (curling shingles, granule loss, multiple leaks), replacement is usually smarter than ongoing repairs. A general rule: if repairs cost more than 30% of a replacement, it is time to replace.' },
      { heading: 'What to Expect', text: 'A typical roof replacement takes 1-3 days for a standard home. The process includes removing old materials, inspecting the deck for damage, installing underlayment and flashing, laying new shingles or panels, and cleanup. Expect some noise and debris during the process.' },
      { heading: 'How to Choose a Contractor', text: 'Get at least 3 quotes. Verify license and insurance. Check Google reviews (50+ reviews with 4.5+ rating is a good benchmark). Ask about warranty coverage on both materials and labor. Avoid contractors who demand full payment upfront or only accept cash.' },
    ],
    avgCost: '$5,500 - $12,000 (asphalt), $10,000 - $25,000 (metal)',
    keywords: ['roof replacement', 'new roof cost', 'replace roof', 'roof replacement near me'],
  },
  {
    slug: 'roof-repair',
    title: 'Roof Repair',
    shortTitle: 'Repair',
    description: 'Find experienced roof repair contractors near you. From leak fixes to shingle replacement, compare local roofers by reviews and ratings.',
    heroText: 'Not every roof problem needs a full replacement. Targeted repairs can extend your roof\'s life by years and cost a fraction of replacement. The key is catching issues early and hiring someone who will fix the root cause, not just patch the symptom.',
    sections: [
      { heading: 'Common Roof Repairs', text: 'The most common repairs include: replacing missing or damaged shingles ($150-$400), fixing flashing around chimneys and vents ($200-$600), patching small leaks ($300-$1,000), repairing gutter damage ($150-$500), and fixing sagging areas ($500-$2,000+). Most repairs take a few hours to one day.' },
      { heading: 'Signs You Need Repair', text: 'Water stains on ceilings, missing or cracked shingles, daylight visible through the attic, granules in gutters, sagging roof sections, and higher energy bills can all indicate roof damage. After any major storm, do a visual inspection or hire a professional.' },
      { heading: 'Repair vs Replace', text: 'If damage is isolated to one area and your roof is under 15 years old, repair is usually the right call. If you are seeing problems in multiple areas or your roof is approaching end of life, a full replacement will save money long-term.' },
    ],
    avgCost: '$300 - $1,500 (minor), $1,500 - $5,000 (major)',
    keywords: ['roof repair', 'fix roof leak', 'roof repair near me', 'emergency roof repair'],
  },
  {
    slug: 'metal-roofing',
    title: 'Metal Roofing',
    shortTitle: 'Metal',
    description: 'Find metal roofing contractors and installers near you. Compare standing seam, corrugated, and steel roofing specialists.',
    heroText: 'Metal roofing has become one of the fastest-growing segments in residential roofing. It lasts 2-3x longer than asphalt, reflects heat to reduce energy costs, and handles severe weather better than almost any other material.',
    sections: [
      { heading: 'Types of Metal Roofing', text: 'Standing seam ($10-16/sq ft) uses interlocking panels with hidden fasteners for a clean look. Corrugated metal ($5-10/sq ft) is more affordable and works well for workshops and agricultural buildings. Metal shingles ($7-12/sq ft) mimic the look of traditional shingles with metal durability. Copper and zinc are premium options at $15-30/sq ft.' },
      { heading: 'Pros and Cons', text: 'Pros: 40-70 year lifespan, energy efficient (reflects heat), handles high winds and hail, low maintenance, recyclable, increases home value. Cons: higher upfront cost, can be noisy in rain without insulation, expansion/contraction can cause fastener issues, harder to find experienced installers in some areas.' },
      { heading: 'Finding a Metal Roofing Specialist', text: 'Metal roofing installation requires different skills than asphalt. Look for contractors with specific metal roofing experience, manufacturer certifications (like Sheffield Metals or MBCI), and a portfolio of completed metal projects. Inexperienced installers are the #1 cause of metal roof problems.' },
    ],
    avgCost: '$10,000 - $25,000 (standing seam), $7,500 - $15,000 (corrugated)',
    keywords: ['metal roofing', 'metal roof cost', 'standing seam metal roof', 'metal roofing contractors'],
  },
  {
    slug: 'commercial-roofing',
    title: 'Commercial Roofing',
    shortTitle: 'Commercial',
    description: 'Find commercial roofing contractors for flat roofs, warehouses, retail, and office buildings. Compare specialists by reviews and experience.',
    heroText: 'Commercial roofing is a different game from residential. The materials, methods, and expertise required are specialized. A leaking commercial roof means business interruption, inventory damage, and liability risk.',
    sections: [
      { heading: 'Commercial Roofing Systems', text: 'TPO (thermoplastic polyolefin) is the most popular for flat commercial roofs, offering durability at $4-8/sq ft. EPDM rubber roofing ($3-7/sq ft) is proven and affordable. PVC membrane ($5-10/sq ft) offers superior chemical resistance. Built-up roofing (BUR) and modified bitumen ($4-8/sq ft) remain reliable options for larger buildings.' },
      { heading: 'What to Look For', text: 'Commercial roofing contractors should carry higher insurance limits ($1M+ general liability), have experience with your specific roof type, provide maintenance plans, and offer warranty options. Ask for references from similar-sized projects.' },
      { heading: 'Maintenance Matters', text: 'Commercial roofs need annual inspections and maintenance to reach full lifespan. A good contractor will offer a maintenance agreement that includes semi-annual inspections, drain cleaning, and minor repairs. This prevents small issues from becoming emergency replacements.' },
    ],
    avgCost: '$4 - $10/sq ft depending on system',
    keywords: ['commercial roofing', 'flat roof contractor', 'commercial roof repair', 'TPO roofing'],
  },
  {
    slug: 'flat-roofing',
    title: 'Flat Roofing',
    shortTitle: 'Flat Roof',
    description: 'Find flat roofing specialists near you. TPO, EPDM, PVC, and modified bitumen contractors with reviews and ratings.',
    heroText: 'Flat roofs require specialized knowledge that many residential roofers do not have. Drainage, membrane selection, and proper seaming are critical. The wrong contractor can create problems that show up months later as leaks.',
    sections: [
      { heading: 'Flat Roof Materials', text: 'TPO membrane is the industry standard for new flat roofs, offering reflectivity and durability at $4-8/sq ft. EPDM (rubber) at $3-7/sq ft is time-tested but less energy efficient. PVC at $5-10/sq ft is best for restaurants and buildings with rooftop grease exposure. Modified bitumen at $4-8/sq ft works well for walkable roof areas.' },
      { heading: 'Common Problems', text: 'Ponding water is the #1 flat roof issue, caused by inadequate drainage or structural settling. Other common problems: membrane punctures from foot traffic, seam failures, flashing deterioration, and UV degradation. Most flat roof failures trace back to installation errors.' },
      { heading: 'Choosing the Right Contractor', text: 'Ask specifically about flat roof experience. Many shingle roofers claim they do flat roofs but lack the specialized training. Look for certifications from material manufacturers (Firestone, Carlisle, GAF) and ask how many flat roof projects they complete per year.' },
    ],
    avgCost: '$4 - $10/sq ft installed',
    keywords: ['flat roofing', 'flat roof repair', 'TPO roof', 'EPDM roofing', 'flat roof contractors'],
  },
  {
    slug: 'storm-damage',
    title: 'Storm Damage Roofing',
    shortTitle: 'Storm Damage',
    description: 'Find storm damage roofing contractors who work with insurance. Hail, wind, and hurricane damage specialists near you.',
    heroText: 'After a storm, time matters. Temporary damage can become permanent water intrusion within days. You need a contractor who responds fast, documents properly for insurance, and does not cut corners on the repair.',
    sections: [
      { heading: 'After the Storm', text: 'Step 1: Document damage with photos from the ground (do not climb on a damaged roof). Step 2: Call your insurance company to file a claim. Step 3: Get a professional roof inspection from a licensed contractor. Step 4: Get repair estimates. Do not sign anything until your insurance adjuster has inspected the damage.' },
      { heading: 'Working with Insurance', text: 'A good storm damage contractor will: meet with your insurance adjuster on-site, provide detailed documentation and photos, help with the claims process, and work within your insurance company\'s approved pricing. Be wary of contractors who want to "supplement" your claim aggressively or ask you to sign an Assignment of Benefits (AOB).' },
      { heading: 'Red Flags', text: 'Watch out for storm chasers: contractors who appear after storms offering door-to-door inspections. Red flags include: no local address or office, asking for large deposits, pressuring you to sign immediately, offering to waive your deductible (this is insurance fraud), and not providing a written contract.' },
    ],
    avgCost: 'Varies - often covered by insurance (minus deductible)',
    keywords: ['storm damage roof', 'hail damage roof', 'wind damage roof repair', 'roof insurance claim'],
  },
  {
    slug: 'roof-inspection',
    title: 'Roof Inspection',
    shortTitle: 'Inspection',
    description: 'Find certified roof inspectors near you. Pre-purchase, maintenance, and insurance inspections from trusted professionals.',
    heroText: 'A professional roof inspection can save you thousands by catching problems early. Whether you are buying a home, filing an insurance claim, or just checking on your roof\'s condition, an inspection gives you the facts you need to make good decisions.',
    sections: [
      { heading: 'Types of Inspections', text: 'Pre-purchase inspections ($150-$400) evaluate roof condition before buying a home. Insurance inspections document damage for claims. Annual maintenance inspections catch small problems before they become expensive. Certification inspections (like for wind mitigation in FL) can reduce your insurance premiums.' },
      { heading: 'What They Check', text: 'A thorough inspection covers: shingle/material condition, flashing around penetrations (chimneys, vents, skylights), gutter condition and drainage, soffit and fascia, attic ventilation, signs of water intrusion, structural integrity, and estimated remaining lifespan.' },
      { heading: 'How Often', text: 'Best practice: inspect your roof once a year and after any major storm. Spring is ideal for catching winter damage before summer heat makes problems worse. If your roof is over 15 years old, twice-yearly inspections are worth the investment.' },
    ],
    avgCost: '$150 - $400 for a standard home inspection',
    keywords: ['roof inspection', 'roof inspection near me', 'roof inspector', 'home roof inspection cost'],
  },
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return SERVICES.find(s => s.slug === slug);
}
