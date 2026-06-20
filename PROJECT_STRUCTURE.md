# Project Structure Reference

## Complete Campus Service Marketplace Architecture

```
Campus-Service-Marketplace/
│
├── 📄 README.md                          # Main project readme
├── 📄 SETUP_GUIDE.md                     # Complete setup instructions
├── 📄 QUICK_START.md                     # Quick terminal commands
├── 📄 API_DOCUMENTATION.md               # API endpoints reference
├── 📄 FRONTEND_GUIDE.md                  # Frontend development guide
├── 📄 setup.sh                           # Automated setup script
├── 📄 postman_collection.json            # Postman API testing
│
└── 📁 backend/
    ├── 📄 package.json                   # Backend dependencies
    ├── 📄 tsconfig.json                  # TypeScript config
    ├── 📄 .env.example                   # Environment variables template
    ├── 📄 .gitignore                     # Git ignore rules
    │
    ├── 📁 src/
    │   ├── 📄 app.ts                     # Express app setup with middleware
    │   ├── 📄 server.ts                  # Server entry point
    │   │
    │   ├── 📁 config/
    │   │   ├── 📄 database.ts            # MongoDB connection (Mongoose)
    │   │   ├── 📄 cloudinary.ts          # Cloudinary image service
    │   │   └── 📄 redis.ts               # Redis cache connection
    │   │
    │   ├── 📁 controllers/               # Business logic
    │   │   ├── 📄 healthController.ts    # Health check & test endpoints
    │   │   └── .gitkeep
    │   │
    │   ├── 📁 routes/                    # API route definitions
    │   │   └── 📄 healthRoutes.ts        # Health check routes
    │   │
    │   ├── 📁 models/                    # Mongoose schemas
    │   │   └── .gitkeep
    │   │
    │   ├── 📁 middlewares/               # Custom middleware
    │   │   └── 📄 errorHandler.ts        # Global error handling
    │   │
    │   └── 📁 utils/
    │       └── 📄 apiResponse.ts         # Standard API response formatter
    │
    └── 📁 dist/                          # Compiled JavaScript (after build)
        └── (generated after npm run build)
│
└── 📁 frontend/
    ├── 📄 package.json                   # Frontend dependencies
    ├── 📄 tsconfig.json                  # TypeScript config
    ├── 📄 tsconfig.node.json             # TypeScript config for build
    ├── 📄 vite.config.ts                 # Vite build config
    ├── 📄 tailwind.config.js             # Tailwind CSS config
    ├── 📄 postcss.config.js              # PostCSS plugins config
    ├── 📄 index.html                     # HTML entry point
    ├── 📄 .env.example                   # Environment variables template
    ├── 📄 .gitignore                     # Git ignore rules
    │
    ├── 📁 src/
    │   ├── 📄 main.tsx                   # React app entry point with routing
    │   ├── 📄 App.tsx                    # Main app component (home page)
    │   ├── 📄 index.css                  # Global styles with Tailwind
    │   │
    │   ├── 📁 api/
    │   │   ├── 📄 axiosConfig.ts         # Axios instance with interceptors
    │   │   ├── 📄 healthAPI.ts           # Health check API service
    │   │   └── 📄 errorHandler.ts        # API error handling utilities
    │   │
    │   ├── 📁 pages/
    │   │   └── 📄 APITest.tsx            # API testing component
    │   │
    │   ├── 📁 components/                # Reusable React components (future)
    │   └── 📁 hooks/                     # Custom React hooks (future)
    │
    ├── 📁 public/                        # Static assets
    │   └── (add your images, fonts, etc.)
    │
    └── 📁 dist/                          # Built frontend (after npm run build)
        └── (generated after npm run build)
```

---

## File Descriptions

### Backend Files

| File | Purpose |
|------|---------|
| `backend/src/app.ts` | Express app setup with CORS, Helmet, body parser |
| `backend/src/server.ts` | Server startup and service initialization |
| `backend/src/config/database.ts` | MongoDB/Mongoose connection |
| `backend/src/config/cloudinary.ts` | Cloudinary image service config |
| `backend/src/config/redis.ts` | Redis cache service config |
| `backend/src/controllers/healthController.ts` | Health check & test connection logic |
| `backend/src/routes/healthRoutes.ts` | API route definitions |
| `backend/src/middlewares/errorHandler.ts` | Global error handling |
| `backend/src/utils/apiResponse.ts` | Standard response formatter |
| `backend/package.json` | Dependencies: express, mongoose, cloudinary, ioredis |
| `backend/tsconfig.json` | TypeScript compiler options |
| `backend/.env.example` | Template for environment variables |

### Frontend Files

| File | Purpose |
|------|---------|
| `frontend/src/main.tsx` | React app entry with React Router |
| `frontend/src/App.tsx` | Main app component (home page) |
| `frontend/src/pages/APITest.tsx` | API testing UI component |
| `frontend/src/api/axiosConfig.ts` | Axios HTTP client with interceptors |
| `frontend/src/api/healthAPI.ts` | API service for health endpoints |
| `frontend/src/index.css` | Global styles with Tailwind CSS |
| `frontend/vite.config.ts` | Vite bundler configuration |
| `frontend/tailwind.config.js` | Tailwind CSS customization |
| `frontend/postcss.config.js` | PostCSS plugin configuration |
| `frontend/package.json` | Dependencies: react, vite, axios, tailwind |
| `frontend/tsconfig.json` | TypeScript compiler options |
| `frontend/.env.example` | Template for environment variables |

---

## Technology Stack

### Backend
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB + Mongoose ODM
- **Cache:** Redis (ioredis)
- **File Upload:** Cloudinary
- **Security:** Helmet.js, CORS
- **Build:** TypeScript compiler

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Package Manager:** npm

---

## Development Workflow

### Adding a New API Endpoint

1. **Create Controller** → `backend/src/controllers/newController.ts`
2. **Create Route** → `backend/src/routes/newRoutes.ts`
3. **Add to App** → Import and use in `backend/src/app.ts`
4. **Test** → Use Postman or frontend

### Adding a New Frontend Page

1. **Create Component** → `frontend/src/pages/NewPage.tsx`
2. **Create API Service** → `frontend/src/api/newAPI.ts` (if needed)
3. **Add Route** → Import and add in `frontend/src/main.tsx`
4. **Add Navigation** → Link in `frontend/src/App.tsx`

### Adding a New Model

1. **Create Schema** → `backend/src/models/NewModel.ts`
2. **Create Controller** → `backend/src/controllers/newController.ts`
3. **Create Routes** → `backend/src/routes/newRoutes.ts`
4. **Add CRUD Operations**

---

## Key Directories

- **Configuration:** `backend/src/config/` - External services setup
- **Business Logic:** `backend/src/controllers/` - Route handlers
- **API Routes:** `backend/src/routes/` - Endpoint definitions
- **Data Models:** `backend/src/models/` - Database schemas
- **Middleware:** `backend/src/middlewares/` - Custom middleware
- **API Clients:** `frontend/src/api/` - HTTP services
- **UI Pages:** `frontend/src/pages/` - React components

---

## Environment Configuration

### Backend .env
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
REDIS_URL=redis://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=http://localhost:5173
```

### Frontend .env
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## Build Output

### Backend
- Source: `src/` (TypeScript)
- Output: `dist/` (JavaScript)
- Command: `npm run build`

### Frontend
- Source: `src/` (TypeScript/React)
- Output: `dist/` (Static HTML/CSS/JS)
- Command: `npm run build`

---

## Git Workflow

### Ignored Files
- `.env` files (use `.env.example` as template)
- `node_modules/` directories
- `dist/` build output
- `.DS_Store` (macOS)
- `*.log` files

### Track These
- Source code (`src/`)
- Config files (`tsconfig.json`, `vite.config.ts`)
- Templates (`.env.example`, `.gitignore`)
- Documentation (`.md` files)

