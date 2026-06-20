# Desired runtime versions
DESIRED_NODE="v24.13.1"
DESIRED_NPM="11.8.0"

# Check installed versions and warn if different
CURRENT_NODE=$(node -v 2>/dev/null || echo "none")
CURRENT_NPM=$(npm -v 2>/dev/null || echo "none")
if [ "$CURRENT_NODE" != "$DESIRED_NODE" ]; then
  echo "⚠️  Node version mismatch. Desired: $DESIRED_NODE, Found: $CURRENT_NODE"
  echo "   Consider using fnm/nvm/volta to switch to $DESIRED_NODE"
fi
if [ "$CURRENT_NPM" != "$DESIRED_NPM" ]; then
  echo "⚠️  npm version mismatch. Desired: $DESIRED_NPM, Found: $CURRENT_NPM"
fi
#!/bin/bash

# ============================================
# CAMPUS SERVICE MARKETPLACE - QUICK START
# ============================================

# This script sets up both backend and frontend

echo "🚀 Campus Service Marketplace - Setup Script"
echo "=============================================="
echo ""

# Step 1: Setup Backend
echo "📦 Setting up Backend..."
echo ""

cd backend

# Use fnm to set Node version
echo "Using Node ${DESIRED_NODE} with fnm..."
fnm use 24.13.1

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Create .env file
echo "Creating .env file from template..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env created. Please edit with your credentials:"
  echo "   - MONGODB_URI"
  echo "   - REDIS_URL"
  echo "   - CLOUDINARY_CLOUD_NAME"
  echo "   - CLOUDINARY_API_KEY"
  echo "   - CLOUDINARY_API_SECRET"
else
  echo "✅ .env already exists"
fi

echo ""
echo "✅ Backend setup complete!"
echo ""

# Step 2: Setup Frontend
echo "📦 Setting up Frontend..."
echo ""

cd ../frontend

# Use fnm to set Node version
  echo "Using Node ${DESIRED_NODE} with fnm..."
  fnm use 24.13.1

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Create .env file
echo "Creating .env file from template..."
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env created"
else
  echo "✅ .env already exists"
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""

# Done
echo ""
echo "=============================================="
echo "🎉 Setup Complete!"
echo "=============================================="
echo ""
echo "📝 Next Steps:"
echo ""
echo "1️⃣  Configure environment variables:"
echo "   Backend:  cd backend && edit .env"
echo "   Frontend: cd frontend && edit .env"
echo ""
echo "2️⃣  Start the backend (Terminal 1):"
echo "   cd backend"
  echo "   fnm use ${DESIRED_NODE}"
echo "   npm run dev"
echo ""
echo "3️⃣  Start the frontend (Terminal 2):"
echo "   cd frontend"
  echo "   fnm use ${DESIRED_NODE}"
echo "   npm run dev"
echo ""
echo "4️⃣  Open browser:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "5️⃣  Test API Connection:"
echo "   Go to http://localhost:5173/api-test"
echo ""
echo "✨ Happy coding!"
