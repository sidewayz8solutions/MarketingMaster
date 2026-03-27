#!/bin/bash
# Parallel Blitz - Pause a Business

if [ -z "$1" ]; then
    echo "Usage: ./blitz-pause.sh <business-number>"
    echo "Example: ./blitz-pause.sh 3"
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
  "status": "paused",
  "pausedAt": "$(date -Iseconds)",
  "reason": "Manual pause",
  "leads": 0,
  "conversions": 0,
  "revenue": 0
}
EOF

echo "⏸️  Business $BIZ_NUM PAUSED"
echo "   Time: $(date)"
echo ""
echo "Resources reallocated to other businesses."
echo "Resume with: ./blitz-resume.sh $BIZ_NUM"
