const https = require('https');
const fs = require('fs');

// Function to fetch webpage content
function fetchWebpage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Function to clean HTML text
function cleanText(text) {
  if (!text) return '';
  
  text = text.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\s+/g, ' ');
  text = text.trim();
  
  return text;
}

// Extract main description (the text right under product title)
function extractMainDescription(html) {
  // Look for the product short description or main description area
  const patterns = [
    // Pattern 1: Short description div
    /<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    // Pattern 2: Product description paragraph
    /<div[^>]*class="[^"]*product-short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    // Pattern 3: Summary div
    /<div[^>]*class="[^"]*summary[^"]*entry-summary[^"]*"[^>]*>[\s\S]*?<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const cleaned = cleanText(match[1]);
      if (cleaned.length > 20) { // Must be substantial
        return cleaned;
      }
    }
  }
  
  return null;
}

// Extract about/description tab content (detailed specs)
function extractAboutProduct(html) {
  // Look for the Description tab content
  const patterns = [
    // Pattern 1: Description tab panel
    /<div[^>]*id="tab-description"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    // Pattern 2: WooCommerce description panel
    /<div[^>]*class="[^"]*woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    // Pattern 3: Tab content description
    /<div[^>]*id="tab-description"[^>]*class="[^"]*woocommerce-Tabs-panel[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      let content = match[1];
      
      // Remove any nested divs we don't want
      content = content.replace(/<div[^>]*class="[^"]*panel[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
      
      const cleaned = cleanText(content);
      if (cleaned.length > 20) {
        return cleaned;
      }
    }
  }
  
  return null;
}

// Known working URLs from the production site
const knownProducts = [
  { name: 'DM002 DIY DRONE KIT', url: 'dm002-diy-drone-kit' },
  { name: '4WD Mecannum wheels Normal Chassis Kit', url: '4wd-mecannum-wheels-normal-chassis-kit' },
  { name: 'ACEBOTT ESP32 4WD Smart Robot Car Kit for Arduino', url: 'acebott-esp32-4wd-smart-robot-car-kit-for-arduino' },
  { name: '3-In-1 ACEBOTT ESP32 STEM School Smart Home Education Kit – LV 1', url: '3-in-1-acebott-esp32-stem-school-smart-home-education-kit-lv-1' },
  { name: '5-in-1 ACEBOTT ESP32 STEM School Smart Home Kit – Level 2', url: '5-in-1-acebott-esp32-stem-school-smart-home-kit-level-2' },
  { name: 'DIY MINI DRONE WITH WIFI CAMERA', url: 'diy-mini-drone-with-wifi-camera' },
  { name: 'XYQ2 DRONE KIT', url: 'xyq2-drone-kit' },
  // Add more known products here
];

async function fetchProductData(productName, urlSlug) {
  try {
    const url = `https://www.agarwalelectronics.com/product/${urlSlug}/`;
    console.log(`\nFetching: ${productName}`);
    console.log(`URL: ${url}`);
    
    const html = await fetchWebpage(url);
    
    // Check if page exists
    if (html.includes('404') || html.includes('Page not found')) {
      console.log(`⚠ Product not found`);
      return null;
    }
    
    const description = extractMainDescription(html);
    const aboutProduct = extractAboutProduct(html);
    
    if (!description && !aboutProduct) {
      console.log(`⚠ No data extracted`);
      return null;
    }
    
    console.log(`✓ Successfully fetched`);
    console.log(`  Description length: ${description ? description.length : 0}`);
    console.log(`  AboutProduct length: ${aboutProduct ? aboutProduct.length : 0}`);
    
    return {
      name: productName,
      url: url,
      description: description || '',
      aboutProduct: aboutProduct || ''
    };
    
  } catch (error) {
    console.error(`✗ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Starting product data fetch...\n');
  
  const results = [];
  const DELAY_MS = 2000; // 2 seconds between requests
  
  for (const product of knownProducts) {
    const data = await fetchProductData(product.name, product.url);
    if (data) {
      results.push(data);
    }
    
    // Delay between requests to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  }
  
  // Save results
  const outputFile = 'fetched-products-data.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  
  console.log('\n========== SUMMARY ==========');
  console.log(`Total products attempted: ${knownProducts.length}`);
  console.log(`Successfully fetched: ${results.length}`);
  console.log(`Results saved to: ${outputFile}`);
  console.log('\nYou can now review the data and update your product.service.ts file');
}

main().catch(console.error);
