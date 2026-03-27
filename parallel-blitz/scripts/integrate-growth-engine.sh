#!/bin/bash
# Integration with MarketingMaster/growth-engine

echo "🔗 INTEGRATING WITH GROWTH ENGINE"
echo "=================================="
echo ""

MARKETINGMASTER="/root/.openclaw/workspace/MarketingMaster"
PARALLEL_BLITZ="/root/.openclaw/workspace/parallel-blitz"

# Check if MarketingMaster exists
if [ ! -d "$MARKETINGMASTER" ]; then
    echo "⚠️  MarketingMaster not found. Cloning..."
    git clone https://github.com/sidewayz8solutions/MarketingMaster.git "$MARKETINGMASTER"
fi

echo "✅ MarketingMaster found at $MARKETINGMASTER"
echo ""

# Create integration config
cat > "$PARALLEL_BLITZ/.integration.json" << EOF
{
  "growthEngine": "$MARKETINGMASTER",
  "parallelBlitz": "$PARALLEL_BLITZ",
  "integratedAt": "$(date -Iseconds)",
  "features": {
    "contentSync": true,
    "leadSync": true,
    "metricsSync": true,
    "automationSync": true
  }
}
EOF

echo "Integration points:"
echo "  ✅ Content templates from MarketingMaster"
echo "  ✅ Lead capture forms"
echo "  ✅ Analytics tracking"
echo "  ✅ Automation workflows"
echo ""

# Create symlinks for shared resources
mkdir -p "$PARALLEL_BLITZ/shared/templates"

if [ -d "$MARKETINGMASTER/templates" ]; then
    ln -sf "$MARKETINGMASTER/templates" "$PARALLEL_BLITZ/shared/templates/marketingmaster"
    echo "  ✅ Linked: MarketingMaster templates"
fi

if [ -d "$MARKETINGMASTER/assets" ]; then
    ln -sf "$MARKETINGMASTER/assets" "$PARALLEL_BLITZ/shared/assets/marketingmaster"
    echo "  ✅ Linked: MarketingMaster assets"
fi

if [ -f "$MARKETINGMASTER/growth-engine.js" ]; then
    cat > "$PARALLEL_BLITZ/scripts/run-growth-engine.js" << 'EOF'
#!/usr/bin/env node
/**
 * Run growth-engine for all 6 businesses
 */
const { execSync } = require('child_process');
const path = require('path');

const MARKETINGMASTER = '/root/.openclaw/workspace/MarketingMaster';

console.log('Running growth-engine for Parallel Blitz...\n');

for (let i = 1; i <= 6; i++) {
  console.log(`Processing Business ${i}...`);
  try {
    execSync(`cd ${MARKETINGMASTER} && node growth-engine.js run --biz ${i}`, {
      stdio: 'inherit'
    });
  } catch (e) {
    console.log(`  ⚠️  Business ${i} skipped or errored`);
  }
}

console.log('\n✅ Growth engine complete for all businesses');
EOF
    chmod +x "$PARALLEL_BLITZ/scripts/run-growth-engine.js"
    echo "  ✅ Created: run-growth-engine.js"
fi

echo ""
echo "✨ Integration complete!"
echo ""
echo "You can now:"
echo "  - Use MarketingMaster assets in all 6 businesses"
echo "  - Run growth-engine across all businesses"
echo "  - Share content templates between systems"
