#!/bin/bash
# Parallel Blitz - Status Check

echo "📊 PARALLEL BLITZ - STATUS DASHBOARD"
echo "====================================="
echo ""

cd /root/.openclaw/workspace/parallel-blitz

# Get current date
DATE=$(date '+%Y-%m-%d')
TIME=$(date '+%H:%M')

echo "Snapshot: $DATE @ $TIME"
echo ""

# Table header
printf "%-12s %-10s %-12s %-12s %-10s\n" "BUSINESS" "LEADS" "CONV" "REVENUE" "STATUS"
echo "------------------------------------------------------------"

TOTAL_LEADS=0
TOTAL_CONV=0
TOTAL_REV=0

for i in {1..6}; do
    BIZ_DIR="businesses/biz-$i"
    
    if [ -f "$BIZ_DIR/metrics.json" ]; then
        LEADS=$(cat "$BIZ_DIR/metrics.json" | grep -o '"leads": [0-9]*' | cut -d' ' -f2)
        CONV=$(cat "$BIZ_DIR/metrics.json" | grep -o '"conversions": [0-9]*' | cut -d' ' -f2)
        REV=$(cat "$BIZ_DIR/metrics.json" | grep -o '"revenue": [0-9.]*' | cut -d' ' -f2)
        STATUS=$(cat "$BIZ_DIR/metrics.json" | grep -o '"status": "[^"]*"' | cut -d'"' -f4)
        
        # Fallback if empty
        LEADS=${LEADS:-0}
        CONV=${CONV:-0}
        REV=${REV:-0}
        STATUS=${STATUS:-setup}
        
        printf "%-12s %-10s %-12s $%-11s %-10s\n" "Business $i" "$LEADS" "$CONV" "$REV" "$STATUS"
        
        TOTAL_LEADS=$((TOTAL_LEADS + LEADS))
        TOTAL_CONV=$((TOTAL_CONV + CONV))
        TOTAL_REV=$(echo "$TOTAL_REV + $REV" | bc)
    else
        printf "%-12s %-10s %-12s %-12s %-10s\n" "Business $i" "-" "-" "-" "setup"
    fi
done

echo "------------------------------------------------------------"
printf "%-12s %-10s %-12s $%-11s\n" "TOTAL" "$TOTAL_LEADS" "$TOTAL_CONV" "$TOTAL_REV"
echo ""

# Progress to goal
echo "SPRINT PROGRESS:"
echo "  Leads: $TOTAL_LEADS / 160 ($(echo "scale=1; $TOTAL_LEADS * 100 / 160" | bc)%)"
echo "  Revenue: $$TOTAL_REV / $1,025 ($(echo "scale=1; $TOTAL_REV * 100 / 1025" | bc)%)"
echo ""

# Identify leaders
BEST_BIZ=""
BEST_LEADS=0

for i in {1..6}; do
    BIZ_DIR="businesses/biz-$i"
    if [ -f "$BIZ_DIR/metrics.json" ]; then
        LEADS=$(cat "$BIZ_DIR/metrics.json" | grep -o '"leads": [0-9]*' | cut -d' ' -f2)
        LEADS=${LEADS:-0}
        if [ "$LEADS" -gt "$BEST_LEADS" ]; then
            BEST_LEADS=$LEADS
            BEST_BIZ="Business $i"
        fi
    fi
done

if [ -n "$BEST_BIZ" ]; then
    echo "🏆 CURRENT LEADER: $BEST_BIZ ($BEST_LEADS leads)"
fi

echo ""
echo "Run './blitz-report.sh' for detailed breakdown."
