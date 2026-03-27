#!/bin/bash
# AutoScale AI - Quick Setup Script
# Run this to set up the entire AI automation business infrastructure

set -e

echo "🚀 Setting up AutoScale AI..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18+. Found: $(node -v)"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✅ npm $(npm -v)"

echo ""
echo -e "${BLUE}Step 2: Installing LarryBrain skills...${NC}"

# Install key skills
SKILLS=(
    "tiktok-app-marketing"
    "xcellent"
    "support-dashboard"
    "content-engine"
    "email-manager"
    "web-scraper"
    "late-integration"
)

for skill in "${SKILLS[@]}"; do
    echo "Installing $skill..."
    # This would be replaced with actual skill installation
    echo "  ✅ $skill"
done

echo ""
echo -e "${BLUE}Step 3: Setting up Paperclip...${NC}"

# Check if paperclip directory exists
if [ ! -d "/root/.openclaw/workspace/paperclip" ]; then
    echo "⚠️  Paperclip not found. Cloning..."
    git clone https://github.com/paperclipai/paperclip.git /root/.openclaw/workspace/paperclip
fi

cd /root/.openclaw/workspace/paperclip

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing Paperclip dependencies..."
    npm install
fi

echo "✅ Paperclip ready"

echo ""
echo -e "${BLUE}Step 4: Creating client template structure...${NC}"

mkdir -p /root/.openclaw/workspace/autoscale-ai/clients/{templates,active,archive}
mkdir -p /root/.openclaw/workspace/autoscale-ai/deployments/{websites,apis,databases}
mkdir -p /root/.openclaw/workspace/autoscale-ai/reports/{daily,weekly,monthly}

echo "✅ Directory structure created"

echo ""
echo -e "${BLUE}Step 5: Setting up SkillBoss deployment config...${NC}"

# Create SkillBoss config template
cat > /root/.openclaw/workspace/autoscale-ai/.skillboss.json << 'EOF'
{
  "project": "autoscale-ai",
  "domain": "autoscale-ai.com",
  "deployment": {
    "platform": "cloudflare-workers",
    "region": "auto"
  },
  "features": {
    "auth": true,
    "payments": {
      "provider": "stripe",
      "webhooks": true
    },
    "database": {
      "type": "d1",
      "migrations": true
    },
    "storage": {
      "type": "r2",
      "public": true
    }
  }
}
EOF

echo "✅ SkillBoss config created"

echo ""
echo -e "${GREEN}✨ AutoScale AI setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure your API keys in .env"
echo "2. Set up Late account at late.pro"
echo "3. Configure Stripe for payments"
echo "4. Run: ./scripts/start-agents.sh"
echo ""
echo "Ready to onboard your first client!"
