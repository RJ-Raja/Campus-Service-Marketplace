# Campus Service Marketplace - Setup Guide

## 📋 Project Overview

This is a professional Node.js + Express backend with a Vite React frontend for a Campus Service Marketplace. The architecture provides strict separation between frontend and backend with proper environment variable management.

---

## 🗂️ Folder Structure

```
Campus-Service-Marketplace/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts       # MongoDB connection
│   │   │   ├── cloudinary.ts     # Cloudinary configuration
│   │   │   └── redis.ts          # Redis connection
│   │   ├── controllers/
│   │   │   └── healthController.ts
│   │   ├── routes/
│   │   │   └── healthRoutes.ts
│   │   ├── models/               # Mongoose schemas
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts
│   │   ├── utils/
│   │   │   └── apiResponse.ts
│   │   ├── app.ts                # Express app setup
│   │   └── server.ts             # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosConfig.ts    # Axios setup with interceptors
│   │   │   └── healthAPI.ts      # API endpoints
│   │   ├── pages/
│   │   │   └── APITest.tsx       # API testing page
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Tailwind + global styles
│   ├── public/                   # Static assets
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Installation Steps

### Prerequisites

- **Node.js** (v18+) - Installed via `fnm`
- **fnm** (Fast Node Manager) - Already configured
- **MongoDB Atlas** - Cloud database account
- **Redis** - Locally running or cloud instance
- **Cloudinary** - Media upload service account

### Step 1: Install fnm (if not installed)

```bash
# On Windows, use Chocolatey or download from https://github.com/Schniz/fnm
choco install fnm

# Or use the installer
```

### Step 2: Set up Backend

```bash
# Navigate to the backend directory
cd C:\Projects\Campus-Service-Marketplace\backend

# Use fnm to set Node version (recommended: v18+)
fnm use 18

# Install dependencies
npm install

# Create .env file from .env.example
copy .env.example .env

# Edit .env with your credentials
# MONGODB_URI=your_mongodb_atlas_uri
# REDIS_URL=your_redis_url
# CLOUDINARY_CLOUD_NAME=your_cloud_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Set up Frontend

```bash
# Navigate to the frontend directory
cd C:\Projects\Campus-Service-Marketplace\frontend

# Use fnm to set Node version
fnm use 18

# Install dependencies
npm install

# Create .env file from .env.example
copy .env.example .env

# Verify VITE_API_BASE_URL is set correctly
# VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## ▶️ Running the Application

### Terminal 1: Backend Server

```bash
cd C:\Projects\Campus-Service-Marketplace\backend
fnm use 18
npm run dev
```

Expected output:
```
✅ Server is running on http://localhost:5000
📋 Environment: development
🔗 API Base URL: http://localhost:5000/api/v1
```

### Terminal 2: Frontend Server

```bash
cd C:\Projects\Campus-Service-Marketplace\frontend
fnm use 18
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## 🧪 Testing the API Connection

### Using the Frontend UI

1. Open `http://localhost:5173/` in your browser
2. Click on "API Test" tab
3. Click "Health Check" button
4. Click "Test All Connections" button

### Using cURL

```bash
# Health Check
curl -X GET http://localhost:5000/api/v1/health

# Test All Connections
curl -X GET http://localhost:5000/api/v1/test-connection
```

### Using Postman

Import the provided Postman collection (see below)

---

## 📮 Postman Testing

### Health Check Endpoint

**URL:** `GET` `http://localhost:5000/api/v1/health`

**Response:**
```json
{
  "success": true,
  "message": "Server is running successfully ✅",
  "data": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "uptime": 123.456,
    "environment": "development"
  },
  "statusCode": 200
}
```

### Test Connection Endpoint

**URL:** `GET` `http://localhost:5000/api/v1/test-connection`

**Response:**
```json
{
  "success": true,
  "message": "All connections are working ✅",
  "data": {
    "database": "MongoDB connected",
    "redis": "Redis connected (PONG)",
    "cloudinary": "Configured",
    "timestamp": "2024-01-15T10:30:00.000Z"
  },
  "statusCode": 200
}
```

---

## 🛠️ Available Scripts

### Backend

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript
npm build

# Start compiled application
npm start

# Run linter
npm run lint
```

### Frontend

```bash
# Development server with hot reload
npm run dev

# Build for production
npm build

# Preview production build
npm preview

# Run linter
npm run lint
```

---

## 📁 Environment Variables

### Backend (.env)

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

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 🔐 Security Notes

- **Never commit `.env` files** to version control
- Use `.env.example` as a template
- Secrets are managed through environment variables
- Backend uses Helmet for HTTP headers security
- CORS is configured to allow frontend origin only
- Add JWT authentication for production

---

## 🔄 API Response Format

All API responses follow a standard format:

```json
{
  "success": true,
  "message": "Description of the response",
  "data": {},
  "statusCode": 200
}
```

---

## 🎯 Next Steps

1. **Set up Authentication:**
   - Add JWT token management
   - Create login/signup endpoints
   - Add authentication middleware

2. **Create Database Models:**
   - Define Mongoose schemas for users, services, etc.
   - Add validation logic

3. **Build API Endpoints:**
   - Implement CRUD operations
   - Add business logic
   - Integrate Cloudinary for image uploads

4. **Enhance Frontend:**
   - Create reusable components
   - Add state management (Redux/Zustand)
   - Implement routing
   - Add form validation

5. **Testing:**
   - Write unit tests
   - Add integration tests
   - Set up CI/CD pipeline

---

## 🐛 Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill the process using the port (Windows)
taskkill /PID <PID> /F

# Or use a different port
PORT=5001 npm run dev
```

### Frontend API calls failing

1. Verify backend is running
2. Check VITE_API_BASE_URL in `.env`
3. Check CORS configuration in backend `app.ts`
4. Open DevTools → Network tab to see actual requests

### MongoDB connection failed

1. Verify connection string in `.env`
2. Check MongoDB Atlas IP whitelist
3. Ensure database user credentials are correct

### Redis connection failed

1. Verify Redis is running locally or connection string is correct
2. Check Redis URL in `.env`

---

## 📚 Useful Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Redis Documentation](https://redis.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

## 📝 License

MIT License - Feel free to use this template for your projects!
