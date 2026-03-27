#!/bin/bash
# Parallel Blitz - Resume a Business

if [ -z "$1" ]; then
    echo "Usage: ./blitz-resume.sh <business-number>"
    echo "Example: ./blitz-resume.sh 3"
    exit 1
fi

BIZ_NUM=$1
BIZ_DIR="/root/.openclaw/workspace/parallel-blitz/businesses/biz-$BIZ_NUM"

if [ ! -d "$BIZ_DIR" ]; then
    echo "❌ Business $BIZ_NUM not found"
    exit 1
fi

# Update status
cat > "$BIZ_DIR/metrics.json" << EOF
{
  "businessId": $BIZ_NUM,
  "status": "active",
  "resumedAt": "$(date -Iseconds)",
  "leads": 0,
  "conversions": 0,
  "revenue": 0
}
EOF

echo "▶️  Business $BIZ_NUM RESUMED"
echo "   Time: $(date)"
echo ""
echo "Agent reactivated. Full operations restored."
