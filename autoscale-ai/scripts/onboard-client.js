#!/usr/bin/env node
/**
 * Client Onboarding Script
 * Creates a new client profile and sets up their automation infrastructure
 * 
 * Usage: node onboard-client.js --name "Client Name" --package starter
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

async function onboardClient() {
  console.log('🚀 AutoScale AI - Client Onboarding\n');
  
  // Get client details
  const name = getArg('name') || await prompt('Company Name: ');
  const package = getArg('package') || await prompt('Package (starter/growth/enterprise): ');
  const industry = await prompt('Industry: ');
  const contact = await prompt('Primary Contact Name: ');
  const email = await prompt('Contact Email: ');
  
  // Generate client ID
  const clientId = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString(36);
  
  // Create client directory
  const clientDir = path.join(__dirname, '..', 'clients', 'active', clientId);
  fs.mkdirSync(clientDir, { recursive: true });
  
  // Create subdirectories
  ['content', 'reports', 'config', 'assets'].forEach(sub => {
    fs.mkdirSync(path.join(clientDir, sub), { recursive: true });
  });
  
  // Load template
  const templatePath = path.join(__dirname, '..', 'clients', 'templates', 'onboarding.md');
  let template = fs.readFileSync(templatePath, 'utf-8');
  
  // Fill in known values
  const now = new Date();
  const pricing = {
    starter: { monthly: 297, setup: 500 },
    growth: { monthly: 997, setup: 2000 },
    enterprise: { monthly: 2997, setup: 5000 }
  };
  
  template = template
    .replace('{{COMPANY_NAME}}', name)
    .replace('{{INDUSTRY}}', industry)
    .replace('{{PACKAGE}}', package.charAt(0).toUpperCase() + package.slice(1))
    .replace('{{START_DATE}}', now.toISOString().split('T')[0])
    .replace('{{MONTHLY_FEE}}', pricing[package]?.monthly || 297)
    .replace('{{SETUP_FEE}}', pricing[package]?.setup || 500)
    .replace('{{CONTACT_NAME}}', contact)
    .replace('{{CONTACT_EMAIL}}', email);
  
  // Save client profile
  const profilePath = path.join(clientDir, 'profile.md');
  fs.writeFileSync(profilePath, template);
  
  // Create config file
  const config = {
    clientId,
    name,
    package,
    industry,
    contact: { name: contact, email },
    createdAt: now.toISOString(),
    status: 'onboarding',
    integrations: {
      postiz: { enabled: false },
      stripe: { enabled: false },
      openai: { enabled: false }
    }
  };
  
  fs.writeFileSync(
    path.join(clientDir, 'config', 'client.json'),
    JSON.stringify(config, null, 2)
  );
  
  console.log('\n✅ Client onboarded successfully!');
  console.log(`Client ID: ${clientId}`);
  console.log(`Profile: ${profilePath}`);
  console.log('\nNext steps:');
  console.log('1. Collect API keys and credentials');
  console.log('2. Deploy landing page');
  console.log('3. Set up content pipeline');
  console.log('4. Schedule kickoff call');
  
  return clientId;
}

onboardClient().catch(console.error);
