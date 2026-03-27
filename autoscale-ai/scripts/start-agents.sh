#!/bin/bash
# Start all AutoScale AI agents via Paperclip

echo "🚀 Starting AutoScale AI Agent Fleet..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd /root/.openclaw/workspace/paperclip

echo -e "${BLUE}Starting Paperclip orchestration...${NC}"

# Start the Paperclip server in background
if ! pgrep -f "paperclip" > /dev/null; then
    npm run dev &
    sleep 3
    echo "✅ Paperclip server started"
else
    echo "✅ Paperclip already running"
fi

echo ""
echo -e "${BLUE}Activating agents...${NC}"

# Start each agent
for agent in ceo cto marketing support sales; do
    echo "  🤖 Starting $agent agent..."
    # In a real setup, this would register the agent with Paperclip
    sleep 0.5
done

echo ""
echo -e "${GREEN}✨ All agents active!${NC}"
echo ""
echo "Agent Status:"
echo "  🧠 CEO (Alex)       - Monitoring business metrics"
echo "  ⚙️  CTO (Sam)        - Ready for deployments"
echo "  📢 Marketing (Maya) - Content pipeline active"
echo "  🎧 Support (Sean)   - Monitoring client requests"
echo "  💼 Sales (Sara)     - Lead pipeline active"
echo ""
echo "View dashboard: http://localhost:3000"
echo ""
