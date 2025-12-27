const https = require('https');
const fs = require('fs');

// Helper function to convert product name to URL slug
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/--+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
}

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

// Function to extract description from HTML
function extractDescription(html) {
  // Extract text between product description section
  // Look for patterns that indicate product description
  
  // Pattern 1: Look for main product description text
  const descPattern1 = /<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
  const match1 = html.match(descPattern1);
  
  if (match1) {
    let desc = match1[1];
    // Clean HTML tags
    desc = desc.replace(/<[^>]+>/g, ' ');
    // Clean extra whitespace
    desc = desc.replace(/\s+/g, ' ').trim();
    // Decode HTML entities
    desc = desc.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'");
    return desc;
  }
  
  // Pattern 2: Look for SKU description area
  const descPattern2 = /<div[^>]*class="[^"]*product-short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i;
  const match2 = html.match(descPattern2);
  
  if (match2) {
    let desc = match2[1];
    desc = desc.replace(/<[^>]+>/g, ' ');
    desc = desc.replace(/\s+/g, ' ').trim();
    desc = desc.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#39;/g, "'");
    return desc;
  }
  
  return null;
}

// Function to extract about/specifications from HTML
function extractAbout(html) {
  // Look for description tab content or specifications
  const patterns = [
    /<div[^>]*id="tab-description"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/i,
    /<div[^>]*class="[^"]*woocommerce-Tabs-panel--description[^"]*"[^>]*>([\s\S]*?)<\/div>/i
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      let about = match[1];
      // Clean HTML tags but keep structure info
      about = about.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
      about = about.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
      about = about.replace(/<[^>]+>/g, ' ');
      about = about.replace(/\s+/g, ' ').trim();
      about = about.replace(/&nbsp;/g, ' ')
                   .replace(/&amp;/g, '&')
                   .replace(/&lt;/g, '<')
                   .replace(/&gt;/g, '>')
                   .replace(/&quot;/g, '"')
                   .replace(/&#39;/g, "'");
      return about.substring(0, 1000); // Limit length
    }
  }
  
  return null;
}

// Main function to process products
async function processProducts() {
  console.log('Reading product service file...');
  
  // Read the product service file
  const serviceFilePath = './src/app/services/product.service.ts';
  const content = fs.readFileSync(serviceFilePath, 'utf8');
  
  // Extract product objects using regex
  const productPattern = /{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',/g;
  let match;
  const products = [];
  
  while ((match = productPattern.exec(content)) !== null) {
    products.push({
      id: match[1],
      name: match[2]
    });
  }
  
  console.log(`Found ${products.length} products to process`);
  
  const results = {
    success: [],
    failed: [],
    notFound: []
  };
  
  // Process products in batches to avoid overwhelming the server
  const BATCH_SIZE = 5;
  const DELAY_MS = 2000; // 2 seconds between requests
  
  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);
    console.log(`\nProcessing batch ${Math.floor(i / BATCH_SIZE) + 1} of ${Math.ceil(products.length / BATCH_SIZE)}`);
    
    for (const product of batch) {
      try {
        const slug = nameToSlug(product.name);
        const url = `https://www.agarwalelectronics.com/product/${slug}/`;
        
        console.log(`Fetching: ${product.name}`);
        console.log(`URL: ${url}`);
        
        const html = await fetchWebpage(url);
        
        // Check if page exists (not 404)
        if (html.includes('404') || html.includes('Page not found')) {
          console.log(`⚠ Product not found: ${product.name}`);
          results.notFound.push({ ...product, url });
          continue;
        }
        
        const description = extractDescription(html);
        const aboutProduct = extractAbout(html);
        
        if (description || aboutProduct) {
          results.success.push({
            ...product,
            description: description || '',
            aboutProduct: aboutProduct || '',
            url
          });
          console.log(`✓ Successfully fetched data for: ${product.name}`);
        } else {
          console.log(`⚠ No data extracted for: ${product.name}`);
          results.failed.push({ ...product, url });
        }
        
        // Delay between requests
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        
      } catch (error) {
        console.error(`✗ Error fetching ${product.name}:`, error.message);
        results.failed.push({ ...product, error: error.message });
      }
    }
  }
  
  // Save results to JSON file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = `product-data-${timestamp}.json`;
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  
  console.log('\n========== SUMMARY ==========');
  console.log(`Total products: ${products.length}`);
  console.log(`Successfully fetched: ${results.success.length}`);
  console.log(`Not found: ${results.notFound.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`\nResults saved to: ${outputFile}`);
  console.log('\nNext steps:');
  console.log('1. Review the JSON file to verify the fetched data');
  console.log('2. Run the update script to apply changes to product.service.ts');
}

// Run the script
processProducts().catch(console.error);
