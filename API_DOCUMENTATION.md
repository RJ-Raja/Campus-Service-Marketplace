# Backend API Documentation

## 📍 API Base URL

```
http://localhost:5000/api/v1
```

## 🏥 Health Check Endpoint

### Request

```http
GET /api/v1/health
```

### Response (200 OK)

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

---

## 🔗 Test Connection Endpoint

### Request

```http
GET /api/v1/test-connection
```

### Response (200 OK)

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

## 🌍 Root Endpoint

### Request

```http
GET http://localhost:5000
```

### Response (200 OK)

```json
{
  "message": "Welcome to Campus Service Marketplace API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/v1/health",
    "testConnection": "/api/v1/test-connection"
  }
}
```

---

## 🚨 Error Response Format

### Example Error Response

```json
{
  "success": false,
  "message": "Not Found",
  "error": "Error stack trace here (only in development)",
  "statusCode": 404
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200  | Success |
| 400  | Bad Request |
| 401  | Unauthorized |
| 404  | Not Found |
| 500  | Internal Server Error |

---

## 🔐 CORS Configuration

The backend allows requests from the frontend at:
- Development: `http://localhost:5173`
- Production: `${FRONTEND_URL}` (from `.env`)

Allowed methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`

---

## 📦 Request/Response Structure

### Standard Request Headers

```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

### Standard Response Headers

```
Content-Type: application/json
Access-Control-Allow-Origin: http://localhost:5173
```

---

## 🔒 Security Features

✅ Helmet.js - HTTP header security
✅ CORS - Cross-Origin Resource Sharing
✅ Environment variables - Secrets management
✅ JSON body limit - Protection against large payloads
✅ Error handling middleware - Centralized error management

---

## 🔄 Future API Endpoints

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User registration
- `GET /api/v1/services` - List all services
- `POST /api/v1/services` - Create new service
- `PUT /api/v1/services/:id` - Update service
- `DELETE /api/v1/services/:id` - Delete service
- `POST /api/v1/upload` - Upload image to Cloudinary

---

## 💡 Usage Examples

### Using cURL

```bash
# Health check
curl -X GET http://localhost:5000/api/v1/health

# Test connections
curl -X GET http://localhost:5000/api/v1/test-connection
```

### Using JavaScript/Axios

```javascript
import api from './api/axiosConfig';

// Health check
const response = await api.get('/health');
console.log(response.data);

// Test connection
const testResponse = await api.get('/test-connection');
console.log(testResponse.data);
```

### Using Python/Requests

```python
import requests

# Health check
response = requests.get('http://localhost:5000/api/v1/health')
print(response.json())

# Test connection
response = requests.get('http://localhost:5000/api/v1/test-connection')
print(response.json())
```

