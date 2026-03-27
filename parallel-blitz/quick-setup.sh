#!/bin/bash
# Quick setup all 6 businesses

echo "🔥 PARALLEL BLITZ - Quick Setup"
echo "================================"
echo ""

# Create business directories
for i in {1..6}; do
    mkdir -p "/root/.openclaw/workspace/parallel-blitz/businesses/biz-$i"
    
    # Create default config
    cat > "/root/.openclaw/workspace/parallel-blitz/businesses/biz-$i/config.json" << EOF
{
  "businessId": $i,
  "name": "Business $i",
  "model": "TBD",
  "status": "setup",
  "createdAt": "$(date -Iseconds)",
  "sprint": {
    "startDate": "2026-03-26",
    "endDate": "2026-04-02"
  },
  "goals": {
    "leads": 27,
    "revenue": 171
  },
  "target": {
    "audience": "TBD",
    "painPoint": "TBD",
    "offer": "TBD"
  }
}
EOF

    # Create default metrics
    cat > "/root/.openclaw/workspace/parallel-blitz/businesses/biz-$i/metrics.json" << EOF
{
  "businessId": $i,
  "status": "setup",
  "leads": 0,
  "conversions": 0,
  "revenue": 0,
  "lastUpdated": "$(date -Iseconds)"
}
EOF

echo "  ✅ Business $i initialized"
done

echo ""
echo "✨ All 6 businesses ready for configuration"
echo ""
echo "Next: Configure each business with details:"
echo "  node scripts/setup-business.js --num 1 --name \"Your Business\" --model saas"
