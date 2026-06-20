# Campus Service Marketplace - Terminal Commands

## ============================================
## COMPLETE SETUP INSTRUCTIONS
## ============================================

## Step 1: Navigate to project root
```
cd C:\Projects\Campus-Service-Marketplace
```

---

## BACKEND SETUP

### Step 2a: Setup Backend Environment
```bash
cd backend
fnm use 18
npm install
copy .env.example .env
```

### Step 2b: Edit Backend .env
Open `backend\.env` and add:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-marketplace
REDIS_URL=redis://localhost:6379
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

### Step 2c: Start Backend Server (TERMINAL 1)
```bash
cd C:\Projects\Campus-Service-Marketplace\backend
fnm use 18
npm run dev
```

**Expected Output:**
```
✅ Server is running on http://localhost:5000
📋 Environment: development
🔗 API Base URL: http://localhost:5000/api/v1
```

---

## FRONTEND SETUP

### Step 3a: Setup Frontend Environment (TERMINAL 2 - New Terminal)
```bash
cd C:\Projects\Campus-Service-Marketplace\frontend
fnm use 18
npm install
copy .env.example .env
```

### Step 3b: Verify Frontend .env
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Step 3c: Start Frontend Server (TERMINAL 2)
```bash
cd C:\Projects\Campus-Service-Marketplace\frontend
fnm use 18
npm run dev
```

**Expected Output:**
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## TESTING THE APPLICATION

### Option 1: Use Frontend UI (Easiest)
1. Open browser: `http://localhost:5173`
2. Click "API Test" button
3. Click "Health Check"
4. Click "Test All Connections"

### Option 2: Use cURL
```bash
# Health Check
curl -X GET http://localhost:5000/api/v1/health

# Test Connections
curl -X GET http://localhost:5000/api/v1/test-connection
```

### Option 3: Use Postman
1. Open Postman
2. Click "Import"
3. Select `postman_collection.json` from root folder
4. Run requests from imported collection

---

## USEFUL COMMANDS

### Backend Commands
```bash
# Development mode
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Frontend Commands
```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Lint code
npm run lint
```

### fnm Commands
```bash
# List installed Node versions
fnm list

# Install specific Node version
fnm install 18

# Use specific Node version
fnm use 18

# Current Node version
node --version
```

---

## TERMINAL MANAGEMENT (Windows PowerShell)

### Open Multiple Terminals in VS Code
```
Ctrl + Shift + ` → New terminal
```

### Quick Multi-Terminal Setup
1. **Terminal 1:** Backend
   ```
   cd backend
   fnm use 18
   npm run dev
   ```

2. **Terminal 2:** Frontend
   ```
   cd frontend
   fnm use 18
   npm run dev
   ```

3. **Terminal 3:** Optional (Git, other commands)
   ```
   cd C:\Projects\Campus-Service-Marketplace
   ```

---

## ENVIRONMENT VARIABLES

### Backend .env
```
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname

# Redis
REDIS_URL=redis://localhost:6379

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend .env
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## TROUBLESHOOTING

### Port Already in Use
```bash
# Check what's using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F

# Or use different port
$env:PORT=5001; npm run dev
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Backend
cd backend
rm -r node_modules
npm install

# Frontend
cd frontend
rm -r node_modules
npm install
```

### Update fnm and Node
```bash
# Update fnm
fnm self-update

# Update to latest LTS
fnm install --lts
fnm use lts-latest
```

---

## QUICK REFERENCE

| Task | Command |
|------|---------|
| Setup backend | `cd backend && fnm use 18 && npm install && copy .env.example .env` |
| Setup frontend | `cd frontend && fnm use 18 && npm install && copy .env.example .env` |
| Start backend | `cd backend && fnm use 18 && npm run dev` |
| Start frontend | `cd frontend && fnm use 18 && npm run dev` |
| Build backend | `cd backend && npm run build` |
| Build frontend | `cd frontend && npm run build` |
| Test health | `curl http://localhost:5000/api/v1/health` |
| Open frontend | `http://localhost:5173` |

---

## 🎯 When Both Servers are Running

✅ Backend: `http://localhost:5000`
- API: `http://localhost:5000/api/v1`
- Health: `http://localhost:5000/api/v1/health`
- Test: `http://localhost:5000/api/v1/test-connection`

✅ Frontend: `http://localhost:5173`
- Home: `http://localhost:5173/`
- API Test: `http://localhost:5173/api-test`

---

## 📁 File Locations for Quick Edit

- Backend config: `backend/src/app.ts`
- Frontend config: `frontend/src/main.tsx`
- Backend env: `backend/.env`
- Frontend env: `frontend/.env`
- API services: `frontend/src/api/`
- Backend routes: `backend/src/routes/`

---

**Last Updated:** 2024-01-15
