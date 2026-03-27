#!/usr/bin/env node
/**
 * Content Creation Script
 * Generates content for clients using LarryBrain skills
 * 
 * Usage: node create-content.js --client <client-id> --type <tiktok|twitter|blog>
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 ? args[idx + 1] : null;
}

async function createContent() {
  console.log('🎨 AutoScale AI - Content Creation\n');
  
  const clientId = getArg('client');
  const type = getArg('type') || 'tiktok';
  
  if (!clientId) {
    console.log('Usage: node create-content.js --client <client-id> --type <tiktok|twitter|blog>');
    process.exit(1);
  }
  
  const clientDir = path.join(__dirname, '..', 'clients', 'active', clientId);
  if (!fs.existsSync(clientDir)) {
    console.log(`❌ Client not found: ${clientId}`);
    process.exit(1);
  }
  
  const config = JSON.parse(fs.readFileSync(path.join(clientDir, 'config', 'client.json'), 'utf-8'));
  console.log(`Creating ${type} content for: ${config.name}\n`);
  
  const contentDir = path.join(clientDir, 'content', type, new Date().toISOString().split('T')[0]);
  fs.mkdirSync(contentDir, { recursive: true });
  
  switch (type) {
    case 'tiktok':
      await createTikTokContent(config, contentDir);
      break;
    case 'twitter':
      await createTwitterContent(config, contentDir);
      break;
    case 'blog':
      await createBlogContent(config, contentDir);
      break;
    default:
      console.log(`Unknown content type: ${type}`);
  }
  
  console.log(`\n✅ Content created in: ${contentDir}`);
}

async function createTikTokContent(config, outputDir) {
  console.log('Generating TikTok slideshow...\n');
  
  // This would integrate with LarryBrain's TikTok skill
  const hooks = [
    `I showed my boss what AI thinks ${config.industry} should look like`,
    `My competitors don't want you to see this ${config.industry} hack`,
    `POV: You're a ${config.industry} business owner who discovered AI automation`
  ];
  
  const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];
  
  console.log(`  Hook: "${selectedHook}"`);
  console.log('  Slides:');
  console.log('    1. Hook slide');
  console.log('    2. Problem amplification');
  console.log('    3. Discovery moment');
  console.log('    4. First transformation');
  console.log('    5. Second transformation');
  console.log('    6. CTA slide');
  
  // Save content plan
  const content = {
    platform: 'tiktok',
    hook: selectedHook,
    slides: [
      { text: selectedHook, type: 'hook' },
      { text: 'The struggle was real...', type: 'problem' },
      { text: 'Then I found the solution', type: 'discovery' },
      { text: 'Wait, this actually works?', type: 'transformation1' },
      { text: 'Mind blown 🤯', type: 'transformation2' },
      { text: 'Link in bio to try it', type: 'cta' }
    ],
    createdAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    path.join(outputDir, 'content-plan.json'),
    JSON.stringify(content, null, 2)
  );
}

async function createTwitterContent(config, outputDir) {
  console.log('Generating Twitter thread...\n');
  
  const thread = [
    `Most ${config.industry} businesses are leaving money on the table.`,
    `Here's why 👇`,
    `1/ They're doing everything manually`,
    `2/ They're inconsistent with content`,
    `3/ They're not tracking what works`,
    `AI automation fixes all three.`,
    `Here's how ${config.name} did it...`
  ];
  
  console.log('Thread outline:');
  thread.forEach((tweet, i) => {
    console.log(`  ${i + 1}. ${tweet.substring(0, 50)}...`);
  });
  
  fs.writeFileSync(
    path.join(outputDir, 'thread.txt'),
    thread.join('\n\n')
  );
}

async function createBlogContent(config, outputDir) {
  console.log('Generating blog post...\n');
  
  const title = `How ${config.industry} Businesses Are Using AI to 10x Their Growth`;
  console.log(`  Title: "${title}"`);
  console.log('  Sections:');
  console.log('    - Introduction');
  console.log('    - The Problem with Manual Work');
  console.log('    - How AI Automation Works');
  console.log('    - Case Studies');
  console.log('    - Implementation Guide');
  console.log('    - Conclusion');
  
  fs.writeFileSync(
    path.join(outputDir, 'outline.md'),
    `# ${title}\n\n## Introduction\n\n## The Problem...\n`
  );
}

createContent().catch(console.error);
