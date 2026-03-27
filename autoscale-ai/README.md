# AutoScale AI - Getting Started

## What You've Got

This is a complete AI automation business infrastructure using:
- **Paperclip** — Multi-agent orchestration
- **SkillBoss** — Deployment, payments, infrastructure
- **LarryBrain** — Marketing automation skills

## Quick Start

### 1. Setup Environment
```bash
cd /root/.openclaw/workspace/autoscale-ai
bash scripts/setup.sh
```

### 2. Configure API Keys
Create a `.env` file:
```env
# OpenAI (for content generation)
OPENAI_API_KEY=sk-...

# Late (for social media posting)
POSTIZ_API_KEY=...

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# RevenueCat (optional, for app conversion tracking)
REVENUECAT_API_KEY=sk_...
```

### 3. Start the Agent Fleet
```bash
bash scripts/start-agents.sh
```

### 4. Onboard Your First Client
```bash
node scripts/onboard-client.js --name "Acme Corp" --package starter
```

### 5. Deploy Client Infrastructure
```bash
bash scripts/deploy.sh acme-corp-xxx
```

## Service Packages

| Package | Monthly | Setup | What You Get |
|---------|---------|-------|--------------|
| Starter | $297 | $500 | Social automation, landing page, basic reports |
| Growth | $997 | $2,000 | Full stack, custom workflows, weekly strategy |
| Enterprise | $2,997 | $5,000 | White-glove, custom agents, dedicated support |

## Agent Team

| Agent | Role | Responsibility |
|-------|------|----------------|
| Alex (CEO) | Chief Executive | Strategy, reports, growth |
| Sam (CTO) | Chief Technology | Deployments, infrastructure |
| Maya (Marketing) | CMO | Content, campaigns, growth |
| Sean (Support) | Customer Success | Client success, retention |
| Sara (Sales) | CRO | Leads, proposals, revenue |

## Revenue Projections

- **Month 3:** ~$3,500 MRR
- **Month 6:** ~$12,500 MRR  
- **Month 12:** ~$30,000 MRR

## Next Steps

1. Set up your Late account (late.pro)
2. Connect Stripe for payments
3. Create your own branding
4. Launch with 3 pilot clients
5. Scale the agent team

## Support

Your AI agent team is ready to work. Ask them to:
- "Create a content calendar for [client]"
- "Generate a proposal for [prospect]"
- "Deploy landing page for [client]"
- "Check analytics for all clients"

---
**Ready to automate the world, one business at a time.** 🚀
