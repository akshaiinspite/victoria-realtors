/**
 * Simple NLP Parser for Natural Language Property Search Queries
 * Example inputs:
 * - "villas in Thrissur under 1 Cr"
 * - "apartment in Palakkad below 50 Lakhs"
 * - "independent homes in Coimbatore less than 90L"
 */
export function parseNaturalQuery(queryText) {
  if (!queryText) return null;
  const text = queryText.toLowerCase().trim();

  // 1. Extract Location
  const locations = ['thrissur', 'palakkad', 'ottapalam', 'trivandrum', 'irinjalakuda', 'coimbatore', 'tiruppur'];
  let detectedLocation = '';
  for (const loc of locations) {
    if (text.includes(loc)) {
      // Capitalize first letter to match the database values
      detectedLocation = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  // 2. Extract Property Type
  let detectedType = '';
  if (text.includes('villa') || text.includes('villas')) {
    detectedType = 'villa';
  } else if (text.includes('apartment') || text.includes('apartments') || text.includes('flat') || text.includes('flats')) {
    detectedType = 'apartment';
  } else if (text.includes('bungalow') || text.includes('bungalows')) {
    detectedType = 'bungalow';
  } else if (text.includes('home') || text.includes('homes') || text.includes('house') || text.includes('houses')) {
    detectedType = 'villa'; // Map general house/home queries to villa default
  }

  // 3. Extract Max Price limit in Lakhs (1 Cr = 100 Lakhs)
  let detectedMaxPrice = 300; // default no limit (300 Lakhs/3 Cr)
  
  // Look for budget numbers: e.g. "90 lakhs", "1 cr", "1.2 crore", "50l"
  const crRegex = /(?:under|below|less than|within)?\s*([0-9.]+)\s*(?:cr|crore|crores)/i;
  const lakhRegex = /(?:under|below|less than|within)?\s*([0-9.]+)\s*(?:lakh|lakhs|l)/i;

  const crMatch = text.match(crRegex);
  const lakhMatch = text.match(lakhRegex);

  if (crMatch) {
    const val = parseFloat(crMatch[1]);
    if (!isNaN(val)) {
      detectedMaxPrice = val * 100; // Convert Cr to Lakhs
    }
  } else if (lakhMatch) {
    const val = parseFloat(lakhMatch[1]);
    if (!isNaN(val)) {
      detectedMaxPrice = val;
    }
  }

  return {
    search: queryText,
    location: detectedLocation,
    type: detectedType,
    maxPrice: detectedMaxPrice,
    status: 'active'
  };
}
