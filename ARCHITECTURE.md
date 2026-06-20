# Campus Service Marketplace - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Port 5173)                                  │
│                        React 18 + Vite + Tailwind                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────┐  ┌──────────────────┐  ┌──────────────────────┐   │
│  │   React Router      │  │   React Pages    │  │  React Components    │   │
│  │  - Home (/)         │  │  - APITest       │  │  - Cards, Forms, etc │   │
│  │  - API Test         │  │  - [Add more]    │  │  - [Future]          │   │
│  └─────────────────────┘  └──────────────────┘  └──────────────────────┘   │
│                                 ▲                                             │
│                                 │                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        API Services (Axios)                          │   │
│  │  ┌────────────────────────────────────────────────────────────────┐ │   │
│  │  │  healthAPI                                                     │ │   │
│  │  │  - getHealth()                                                 │ │   │
│  │  │  - testConnection()                                            │ │   │
│  │  └────────────────────────────────────────────────────────────────┘ │   │
│  │  ┌────────────────────────────────────────────────────────────────┐ │   │
│  │  │  axiosConfig (HTTP Client)                                     │ │   │
│  │  │  - Base URL: VITE_API_BASE_URL                                 │ │   │
│  │  │  - Request/Response Interceptors                               │ │   │
│  │  │  - Auth Token Management                                       │ │   │
│  │  └────────────────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                 │                                             │
│                    HTTP (Axios) │ (http://localhost:5000/api/v1)             │
│                                 │                                             │
│                                 ▼                                             │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Port 5000)                                   │
│                    Express + Node.js + TypeScript                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                           Express Server                              │ │
│  │  app.ts - Setup: Helmet, CORS, Body Parser                            │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                 ▼                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                          Routes (v1)                                   │ │
│  │  GET  /api/v1/health         → healthController.healthCheck()        │ │
│  │  GET  /api/v1/test-connection → healthController.testConnection()    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                 ▼                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                      Controllers (Business Logic)                     │ │
│  │  - healthController.ts                                                │ │
│  │    * healthCheck()                                                    │ │
│  │    * testConnection()                                                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                 ▼                                             │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                    Middleware & Utilities                             │ │
│  │  - errorHandler.ts   (Global error handling)                          │ │
│  │  - apiResponse.ts    (Standard response formatter)                    │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                 │                                             │
│         ┌───────────────────────┼───────────────────────┐                    │
│         │                       │                       │                    │
│         ▼                       ▼                       ▼                    │
│  ┌────────────────┐     ┌────────────────┐    ┌───────────────────┐        │
│  │   MongoDB      │     │    Redis       │    │   Cloudinary      │        │
│  │   (Mongoose)   │     │   (ioredis)    │    │   (Media Upload)  │        │
│  │                │     │                │    │                   │        │
│  │ • Database     │     │ • Caching      │    │ • Image Upload    │        │
│  │ • Models       │     │ • Sessions     │    │ • Image Transform │        │
│  │ • Validation   │     │ • Real-time    │    │ • CDN Delivery    │        │
│  └────────────────┘     └────────────────┘    └───────────────────┘        │
│         │                       │                       │                    │
│         ▼                       ▼                       ▼                    │
│    MONGODB ATLAS            REDIS SERVER          CLOUDINARY API            │
│    (Cloud Database)        (Local/Cloud Cache)    (Cloud Media)             │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Frontend → Backend Communication

```
User Action (Browser)
        │
        ▼
React Component
        │
        ▼
API Service (healthAPI.ts)
        │
        ▼
Axios Instance (axiosConfig.ts)
        │
        ├─ Request Interceptor
        │  └─ Add auth token if available
        │
        ▼
HTTP Request
        │
        ▼ (Network)
        │
        ▼
Backend Express Server
        │
        ├─ CORS Middleware
        ├─ Helmet Security
        ├─ Body Parser
        │
        ▼
Route Handler
        │
        ▼
Controller
        │
        ├─ Business Logic
        ├─ Service Connections
        │
        ▼
Response Builder (apiResponse.ts)
        │
        ▼
HTTP Response
        │
        ▼ (Network)
        │
        ▼
Axios Interceptor
        ├─ Check Status Code
        ├─ Handle Errors
        │
        ▼
React Component
        │
        ├─ Update State
        ├─ Re-render UI
        │
        ▼
User Sees Result
```

---

## Environment Configuration Flow

```
.env Files (Never committed)
    │
    ├─ backend/.env
    │  ├─ PORT (server port)
    │  ├─ NODE_ENV (environment)
    │  ├─ MONGODB_URI (database connection)
    │  ├─ REDIS_URL (cache connection)
    │  ├─ CLOUDINARY_* (image service)
    │  └─ FRONTEND_URL (CORS origin)
    │
    └─ frontend/.env
       └─ VITE_API_BASE_URL (API endpoint)

    │
    ▼
process.env (Node.js)
    │
    ├─ Backend: config/ files read these
    │  ├─ database.ts
    │  ├─ redis.ts
    │  └─ cloudinary.ts
    │
    └─ Frontend: import.meta.env (Vite)
       └─ axiosConfig.ts reads VITE_API_BASE_URL

    │
    ▼
Application runs with secure credentials
```

---

## API Response Pattern

```
Every API Response follows this structure:

{
  "success": boolean,           // true for 2xx, false otherwise
  "message": string,            // Human-readable message
  "data": any,                  // Actual response data (optional)
  "error": string,              // Error details (dev only)
  "statusCode": number          // HTTP status code
}

Example Success (200):
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

Example Error (500):
{
  "success": false,
  "message": "Internal Server Error",
  "error": "Stack trace here (development only)",
  "statusCode": 500
}
```

---

## Component Interaction

```
┌──────────────────────────────────────────────────────┐
│                 Frontend                             │
│                                                      │
│  ┌────────────────────────────────────────────────┐ │
│  │          App Component (Home)                  │ │
│  │  ├─ Navigation links                           │ │
│  │  ├─ Welcome section                            │ │
│  │  └─ Link to API Test page                      │ │
│  └────────────────────────────────────────────────┘ │
│                       │                              │
│                       │ (React Router)               │
│                       ▼                              │
│  ┌────────────────────────────────────────────────┐ │
│  │       APITest Component (/api-test)            │ │
│  │                                                │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │ useState Hooks:                           │ │ │
│  │  │ - loading: boolean                        │ │ │
│  │  │ - error: string | null                    │ │ │
│  │  │ - healthData: HealthData | null           │ │ │
│  │  │ - connectionData: ConnectionData | null   │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  │                       │                       │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │ Methods:                                 │ │ │
│  │  │ - testHealthCheck()                      │ │ │
│  │  │ - testConnection()                       │ │ │
│  │  │ - useEffect (auto-test on mount)         │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  │                       │                       │ │
│  │                       ▼                       │ │
│  │  ┌──────────────────────────────────────────┐ │ │
│  │  │ UI Elements:                             │ │ │
│  │  │ - Test buttons                           │ │ │
│  │  │ - Loading state display                  │ │ │
│  │  │ - Error messages                         │ │ │
│  │  │ - JSON response display                  │ │ │
│  │  │ - Instructions section                   │ │ │
│  │  └──────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────┘ │
│                       │                              │
│              (Axios API Calls)                       │
│                       │                              │
│                       ▼                              │
└──────────────────────────────────────────────────────┘
              Network Request (HTTP)
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│                 Backend                              │
│  (Already described above)                           │
└──────────────────────────────────────────────────────┘
```

---

## TypeScript Type System

```
Frontend Types:
├─ HealthCheckResponse
│  ├─ success: boolean
│  ├─ message: string
│  ├─ data: { timestamp, uptime, environment }
│  └─ statusCode: number
│
├─ ConnectionTestResponse
│  ├─ success: boolean
│  ├─ message: string
│  ├─ data: { database, redis, cloudinary, timestamp }
│  └─ statusCode: number
│
├─ ComponentProps
│  └─ [Defined in each component]
│
└─ ApiResponse<T>
   ├─ success: boolean
   ├─ message: string
   ├─ data?: T
   └─ statusCode: number

Backend Types:
├─ ApiResponse<T>
│  ├─ success: boolean
│  ├─ message: string
│  ├─ data?: T
│  ├─ error?: string
│  └─ statusCode: number
│
├─ ApiError extends Error
│  ├─ statusCode?: number
│  └─ details?: unknown
│
├─ Request/Response (Express)
│  └─ Fully typed with Express generics
│
└─ Database Models
   └─ Mongoose Schema definitions
```

---

## Deployment Architecture (Future)

```
┌────────────────────────────────────────────────────────┐
│                    CDN (Vercel/Netlify)                │
│              Frontend Static Files                      │
│              (Cached globally)                          │
└────────────────────────────────────────────────────────┘
                     │
                     │ (Fast edge serving)
                     │
┌────────────────────────────────────────────────────────┐
│               Load Balancer                            │
│          (Route requests to servers)                   │
└────────────────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │ Backend │  │ Backend │  │ Backend │
   │ Server  │  │ Server  │  │ Server  │
   │ Instance│  │ Instance│  │ Instance│
   └─────────┘  └─────────┘  └─────────┘
        │            │            │
        └────────────┼────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │   Shared Services          │
        ├────────────────────────────┤
        │ • MongoDB Atlas (Cloud)    │
        │ • Redis Cloud (Cache)      │
        │ • Cloudinary (CDN Media)   │
        └────────────────────────────┘
```

---

## Security Architecture

```
Frontend
    │
    ├─ HTTPS only (production)
    ├─ Content Security Policy
    └─ XSS Protection
        │
        ▼
Backend (Helmet.js)
    │
    ├─ HTTP Security Headers
    │  ├─ X-Frame-Options
    │  ├─ X-Content-Type-Options
    │  ├─ X-XSS-Protection
    │  └─ Strict-Transport-Security
    │
    ├─ CORS Configuration
    │  ├─ Allowed Origins: [FRONTEND_URL]
    │  ├─ Allowed Methods: [GET, POST, PUT, DELETE, PATCH]
    │  └─ Credentials: true
    │
    ├─ Input Validation
    │  └─ JSON body limit
    │
    ├─ Error Handling
    │  └─ No stack traces in production
    │
    └─ Environment Variables
       └─ No secrets in code
```

---

This architecture is:
✅ Scalable - Separation of concerns
✅ Secure - Proper error handling and CORS
✅ Type-safe - Full TypeScript coverage
✅ Maintainable - Clear folder structure
✅ Extensible - Easy to add new features
✅ Production-ready - Best practices throughout
