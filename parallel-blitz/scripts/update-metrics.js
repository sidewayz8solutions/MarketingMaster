#!/usr/bin/env node
/**
 * Update Metrics Script
 * Updates metrics for a business
 * 
 * Usage: node update-metrics.js --biz 1 --leads 5 --conv 2 --rev 100
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

async function updateMetrics() {
  console.log('📊 Update Business Metrics\n');
  
  const bizNum = getArg('biz') || await prompt('Business number (1-6): ');
  const leads = getArg('leads') || await prompt('New leads today: ');
  const conv = getArg('conv') || await prompt('Conversions: ');
  const rev = getArg('rev') || await prompt('Revenue ($): ');
  
  const bizDir = path.join(__dirname, '..', 'businesses', `biz-${bizNum}`);
  
  if (!fs.existsSync(bizDir)) {
    console.log(`❌ Business ${bizNum} not found. Run setup first.`);
    process.exit(1);
  }
  
  const metricsPath = path.join(bizDir, 'metrics.json');
  let metrics = { businessId: parseInt(bizNum), leads: 0, conversions: 0, revenue: 0 };
  
  if (fs.existsSync(metricsPath)) {
    metrics = JSON.parse(fs.readFileSync(metricsPath, 'utf-8'));
  }
  
  // Add new metrics
  metrics.leads += parseInt(leads) || 0;
  metrics.conversions += parseInt(conv) || 0;
  metrics.revenue = (parseFloat(metrics.revenue) || 0) + (parseFloat(rev) || 0);
  metrics.lastUpdated = new Date().toISOString();
  
  fs.writeFileSync(metricsPath, JSON.stringify(metrics, null, 2));
  
  console.log(`\n✅ Business ${bizNum} metrics updated:`);
  console.log(`   Leads: ${metrics.leads}`);
  console.log(`   Conversions: ${metrics.conversions}`);
  console.log(`   Revenue: $${metrics.revenue.toFixed(2)}`);
  
  // Check if hit goal
  const configPath = path.join(bizDir, 'config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    const leadGoal = config.goals?.leads || 27;
    const revGoal = config.goals?.revenue || 171;
    
    console.log('\n   Progress to goal:');
    console.log(`   Leads: ${metrics.leads}/${leadGoal} (${Math.round(metrics.leads/leadGoal*100)}%)`);
    console.log(`   Revenue: $${metrics.revenue.toFixed(0)}/$${revGoal} (${Math.round(metrics.revenue/revGoal*100)}%)`);
  }
}

updateMetrics().catch(console.error);
