/**
 * SEO, AEO & GEO Structured Data (JSON-LD) Generator & Injector
 * Dynamically registers semantic schemas in the head of the page to optimize
 * indexing for Google, Answer Engines (Perplexity), and Generative Search Engines.
 */

// 1. Organization and Local Business Metadata Schema
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Victoria Realtors",
    "image": "https://victoriarealtors.in/assets/banner/bg11.jpg",
    "@id": "https://victoriarealtors.in/#organization",
    "url": "https://victoriarealtors.in",
    "telephone": "+91 91591 65893",
    "priceRange": "₹35L - ₹2.5Cr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Palakkad bypass road",
      "addressLocality": "Palakkad",
      "addressRegion": "Kerala",
      "postalCode": "678001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.7749,
      "longitude": 76.6548
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/VictoriaRealtorsPalakkad/",
      "https://www.instagram.com/victoriarealtors/",
      "https://www.youtube.com/channel/UCi5y-F1nB50V5x_Cq5D0oRw"
    ]
  };
}

// 2. Real Estate Product (Property Listing) Metadata Schema
export function getProductSchema(property) {
  if (!property) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": property.name,
    "image": `https://victoriarealtors.in/assets/properties/${property.img}`,
    "description": `${property.area} Gated Gated ${property.type} in ${property.location}. Price range: ${property.priceText || property.price + ' Lakhs'}`,
    "sku": `VR-${property.id}`,
    "mpn": property.reraId || `RERA-KL-${property.id}`,
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "INR",
      "price": property.minPriceVal ? property.minPriceVal * 100000 : 5000000,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": property.status === 'sold' ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Victoria Realtors"
      }
    },
    "category": "Real Estate > Gated Community Villas",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Location",
        "value": property.location
      },
      {
        "@type": "PropertyValue",
        "name": "Property Type",
        "value": property.type
      },
      {
        "@type": "PropertyValue",
        "name": "Super Builtup Area",
        "value": property.area
      }
    ]
  };
}

// 3. Blog Article and FAQ Page Metadata Schema (Highly optimized for AEO/Generative Engines)
export function getFAQAndArticleSchema(blog) {
  if (!blog) return null;

  // Compile a rich NewsArticle schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/#blog?id=${blog.id}`
    },
    "headline": blog.title,
    "image": [
      `https://victoriarealtors.in/assets/blog/${blog.img}`
    ],
    "datePublished": blog.datePublished || "2026-06-24T00:00:00Z",
    "dateModified": new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Victoria Editorial Team",
      "jobTitle": "Real Estate Advisory Analyst"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Victoria Realtors",
      "logo": {
        "@type": "ImageObject",
        "url": "https://victoriarealtors.in/assets/logo.png"
      }
    },
    "description": blog.excerpt || blog.title
  };

  // Compile custom FAQ schemas based on blog context
  const faqs = blog.faqs || [
    {
      q: `What is the price of premium properties at Victoria Realtors?`,
      a: `Properties range from 35 Lakhs for premium apartments up to 2.5 Crores for luxury gated community villas.`
    },
    {
      q: `Are properties approved by major banks?`,
      a: `Yes, all Victoria Realtors gated communities are fully pre-approved by SBI, HDFC, ICICI, Federal Bank, LIC HFL, and more, offering competitive interest rates.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return {
    "@context": "https://schema.org",
    "@graph": [articleSchema, faqSchema]
  };
}

// 4. Dom Injection Handler
export function injectJSONLD(schemaObject) {
  if (!schemaObject) return;

  try {
    let scriptTag = document.getElementById("vr-jsonld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "vr-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaObject, null, 2);
  } catch (error) {
    console.error("Failed to inject JSON-LD schema:", error);
  }
}
