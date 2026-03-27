#!/usr/bin/env node
/**
 * Business Setup Script
 * Configures one of the 6 businesses for the parallel blitz
 * 
 * Usage: node setup-business.js --num 1 --name "Business Name" --model "saas|agency|product|service|content|marketplace"
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

function prompt(question) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    readline.question(question, answer => {
      readline.close();
      resolve(answer);
    });
  });
}

async function setupBusiness() {
  console.log('🔥 PARALLEL BLITZ - Business Setup\n');
  
  const num = getArg('num') || await prompt('Business number (1-6): ');
  const name = getArg('name') || await prompt('Business name: ');
  const model = getArg('model') || await prompt('Business model (saas/agency/product/service/content/marketplace): ');
  
  const bizDir = path.join(__dirname, '..', 'businesses', `biz-${num}`);
  fs.mkdirSync(bizDir, { recursive: true });
  
  // Create subdirectories
  ['content', 'assets', 'leads', 'campaigns'].forEach(sub => {
    fs.mkdirSync(path.join(bizDir, sub), { recursive: true });
  });
  
  // Business configuration
  const config = {
    businessId: parseInt(num),
    name,
    model,
    status: 'active',
    createdAt: new Date().toISOString(),
    sprint: {
      startDate: '2026-03-26',
      endDate: '2026-04-02',
      day: Math.min(parseInt(num), 7)
    },
    goals: {
      leads: 27,  // 160 / 6
      revenue: 171,  // 1025 / 6
      conversionRate: 0.05
    },
    target: {
      audience: await prompt('Target audience: ') || 'TBD',
      painPoint: await prompt('Pain point you solve: ') || 'TBD',
      offer: await prompt('Main offer: ') || 'TBD',
      pricePoint: await prompt('Price point ($): ') || '0'
    },
    channels: {
      tiktok: { enabled: true, handle: '', followers: 0 },
      twitter: { enabled: true, handle: '', followers: 0 },
      email: { enabled: true, listSize: 0 },
      ads: { enabled: false, budget: 0 }
    },
    integrations: {
      postiz: { enabled: false, apiKey: '' },
      stripe: { enabled: false, account: '' },
      openai: { enabled: false, apiKey: '' }
    }
  };
  
  fs.writeFileSync(
    path.join(bizDir, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  
  // Initial metrics
  const metrics = {
    businessId: parseInt(num),
    status: 'active',
    leads: 0,
    conversions: 0,
    revenue: 0,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(bizDir, 'metrics.json'),
    JSON.stringify(metrics, null, 2)
  );
  
  // Content plan template
  const contentPlan = {
    businessId: parseInt(num),
    daily: {
      tiktok: 3,
      twitter: 5,
      email: 1
    },
    themes: [
      'Problem awareness',
      'Solution reveal',
      'Social proof',
      'Offer presentation',
      'Urgency/scarcity'
    ],
    hooks: [],
    scheduled: []
  };
  
  fs.writeFileSync(
    path.join(bizDir, 'content', 'plan.json'),
    JSON.stringify(contentPlan, null, 2)
  );
  
  // Create workflow file
  const workflow = {
    businessId: parseInt(num),
    name,
    dailyTasks: [
      { time: '08:00', task: 'Check overnight metrics', agent: 'operator' },
      { time: '10:00', task: 'Create 3 TikToks', agent: 'operator' },
      { time: '12:00', task: 'Post to social media', agent: 'operator' },
      { time: '14:00', task: 'Lead follow-up', agent: 'operator' },
      { time: '16:00', task: 'Create Twitter content', agent: 'operator' },
      { time: '18:00', task: 'Engage with audience', agent: 'operator' },
      { time: '20:00', task: 'Schedule tomorrow content', agent: 'operator' }
    ],
    automation: [
      'Auto-responder for new leads',
      'Content cross-posting',
      'Lead scoring',
      'Daily metrics sync'
    ]
  };
  
  fs.writeFileSync(
    path.join(bizDir, 'workflow.json'),
    JSON.stringify(workflow, null, 2)
  );
  
  console.log(`\n✅ Business ${num} configured: ${name}`);
  console.log(`   Model: ${model}`);
  console.log(`   Goal: 27 leads, $171 revenue`);
  console.log(`   Directory: ${bizDir}`);
  console.log('\nNext steps:');
  console.log('1. Configure API keys in config.json');
  console.log('2. Set up social media accounts');
  console.log('3. Create initial content batch');
  console.log('4. Start the blitz: ./blitz-start.sh');
}

setupBusiness().catch(console.error);
