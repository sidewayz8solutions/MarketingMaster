#!/usr/bin/env node
/**
 * Content Batch Generator
 * Creates content for all 6 businesses simultaneously
 * 
 * Usage: node content-batch.js --type tiktok --count 3
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

async function generateContent() {
  console.log('🎨 CONTENT BATCH GENERATOR\n');
  console.log('Creating content for all 6 businesses...\n');
  
  const type = getArg('type') || 'tiktok';
  const count = parseInt(getArg('count')) || 3;
  
  const businessesDir = path.join(__dirname, '..', 'businesses');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  
  for (let i = 1; i <= 6; i++) {
    const bizDir = path.join(businessesDir, `biz-${i}`);
    
    if (!fs.existsSync(bizDir)) {
      console.log(`  ⚠️  Business ${i} not set up, skipping`);
      continue;
    }
    
    const configPath = path.join(bizDir, 'config.json');
    if (!fs.existsSync(configPath)) {
      console.log(`  ⚠️  Business ${i} not configured, skipping`);
      continue;
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    
    if (config.status === 'paused') {
      console.log(`  ⏸️  Business ${i} paused, skipping`);
      continue;
    }
    
    console.log(`  🔥 Business ${i}: ${config.name || 'Unnamed'}`);
    
    // Create content batch
    const contentDir = path.join(bizDir, 'content', 'batches');
    fs.mkdirSync(contentDir, { recursive: true });
    
    const batch = {
      businessId: i,
      type,
      count,
      createdAt: new Date().toISOString(),
      items: []
    };
    
    for (let j = 1; j <= count; j++) {
      const hooks = [
        `I showed my ${['boss', 'client', 'partner', 'team'][Math.floor(Math.random()*4)]} what AI thinks ${config.target?.painPoint || 'our industry'} should look like`,
        `POV: You're a ${config.target?.audience || 'business owner'} who discovered the secret to ${config.target?.painPoint || 'growth'}`,
        `My ${['competitors', 'rivals', 'colleagues'][Math.floor(Math.random()*3)]} don't want you to know this about ${config.model || 'business'}`,
        `The ${config.model || 'business'} industry doesn't want you to see this`,
        `I was struggling with ${config.target?.painPoint || 'growth'} until I tried this`
      ];
      
      const hook = hooks[Math.floor(Math.random() * hooks.length)];
      
      batch.items.push({
        id: `${i}-${timestamp}-${j}`,
        hook,
        slide1: hook,
        slide2: 'The problem was real...',
        slide3: 'Then I found the solution',
        slide4: 'Wait, this actually works?',
        slide5: 'Mind = blown',
        slide6: `Link in bio to try ${config.name || 'it'}`,
        status: 'draft'
      });
    }
    
    const batchFile = path.join(contentDir, `${type}-${timestamp}.json`);
    fs.writeFileSync(batchFile, JSON.stringify(batch, null, 2));
    
    console.log(`     ✅ ${count} ${type}(s) generated`);
  }
  
  console.log('\n✨ Content batch complete!');
  console.log('   Next: Review and approve content, then post.');
}

generateContent().catch(console.error);
