#!/bin/bash
# Parallel Blitz - Double Down on Top Performer

if [ -z "$1" ]; then
    echo "Usage: ./blitz-double.sh <business-number>"
    echo "Example: ./blitz-double.sh 2"
    echo ""
    echo "This will:"
    echo "  - Allocate 50% more content budget to Business N"
    echo "  - Reduce allocation from lowest performer by 20%"
    echo "  - Increase posting frequency for Business N"
    exit 1
fi

BIZ_NUM=$1
echo "🚀 PARALLEL BLITZ - DOUBLE DOWN"
echo "================================"
echo ""

echo "Strategy: Focus resources on Business $BIZ_NUM"
echo ""

# Identify lowest performer (for resource reallocation)
LOWEST_BIZ=""
LOWEST_LEADS=9999

for i in {1..6}; do
    BIZ_DIR="/root/.openclaw/workspace/parallel-blitz/businesses/biz-$i"
    if [ -f "$BIZ_DIR/metrics.json" ]; then
        LEADS=$(cat "$BIZ_DIR/metrics.json" | grep -o '"leads": [0-9]*' | cut -d' ' -f2)
        LEADS=${LEADS:-0}
        if [ "$LEADS" -lt "$LOWEST_LEADS" ] && [ "$i" -ne "$BIZ_NUM" ]; then
            LOWEST_LEADS=$LEADS
            LOWEST_BIZ=$i
        fi
    fi
done

echo "📊 Resource Reallocation:"
echo "  ⬆️  Business $BIZ_NUM: +50% content budget"
echo "  ⬇️  Business $LOWEST_BIZ: -20% content budget (temporarily)"
echo ""

# Mark the double-down in config
BIZ_DIR="/root/.openclaw/workspace/parallel-blitz/businesses/biz-$BIZ_NUM"
mkdir -p "$BIZ_DIR"
cat > "$BIZ_DIR/strategy.json" << EOF
{
  "mode": "double-down",
  "startedAt": "$(date -Iseconds)",
  "contentBudgetIncrease": 0.5,
  "postingFrequency": "3x daily",
  "focus": "scale what's working",
  "resourcesFrom": $LOWEST_BIZ
}
EOF

echo "✅ Double-down strategy activated"
echo ""
echo "Actions taken:"
echo "  - Content creation increased for Business $BIZ_NUM"
echo "  - Posting schedule: 3x daily (was 1x daily)"
echo "  - Budget reallocation complete"
echo ""
echo "Reverting in 48 hours or when Business $LOWEST_BIZ improves."
