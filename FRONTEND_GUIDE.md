# Frontend Development Guide

## 📋 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── axiosConfig.ts    # Axios instance with interceptors
│   │   └── healthAPI.ts      # API service for health endpoints
│   ├── pages/
│   │   └── APITest.tsx       # API testing component
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── index.html                # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── .env
```

## 🚀 Getting Started

### Installation

```bash
cd frontend
fnm use 18
npm install
```

### Development Server

```bash
npm run dev
```

Starts Vite dev server at `http://localhost:5173`

### Build for Production

```bash
npm build
```

Outputs optimized build to `dist/`

---

## 🎨 Architecture & Patterns

### API Integration

#### Axios Configuration (`src/api/axiosConfig.ts`)

- Base URL from environment variable
- Request/response interceptors
- Auto-attaches auth token if available
- Handles 401 errors globally

#### API Service (`src/api/healthAPI.ts`)

```typescript
export const healthCheckAPI = {
  getHealth: async (): Promise<HealthCheckResponse> => { ... },
  testConnection: async (): Promise<ConnectionTestResponse> => { ... },
};
```

Usage in components:

```typescript
import { healthCheckAPI } from '../api/healthAPI';

const response = await healthCheckAPI.getHealth();
```

### Component Structure

#### App.tsx

- Landing/home page
- Navigation to other pages
- Welcome section

#### Pages/APITest.tsx

- API endpoint testing interface
- Response display
- Error handling
- Loading states

---

## 🧩 Component Examples

### Basic Hook Component

```typescript
import React, { useState } from 'react';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const [count, setCount] = useState<number>(0);

  const handleClick = (): void => {
    setCount(count + 1);
  };

  return (
    <div className="p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-bold">{title}</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Click me ({count})
      </button>
    </div>
  );
};

export default MyComponent;
```

### API Call Component

```typescript
import React, { useEffect, useState } from 'react';
import { healthCheckAPI } from '../api/healthAPI';

const HealthCheck: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<HealthCheckResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await healthCheckAPI.getHealth();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default HealthCheck;
```

---

## 🎯 Adding New Features

### Step 1: Create API Service

Create `src/api/userAPI.ts`:

```typescript
import api from './axiosConfig';

export const userAPI = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData: UserData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};
```

### Step 2: Create Component

Create `src/components/UserList.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { userAPI } from '../api/userAPI';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await userAPI.getUsers();
        setUsers(data.users);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;
```

### Step 3: Add Route

Edit `src/main.tsx`:

```typescript
import UserList from './pages/UserList';

// ... in Routes
<Route path="/users" element={<UserList />} />
```

---

## 🎨 Tailwind CSS Usage

### Common Classes

```html
<!-- Padding -->
<div className="p-4">Padding</div>
<div className="px-4 py-2">Padding X & Y</div>

<!-- Margin -->
<div className="m-4">Margin</div>
<div className="mb-2">Margin Bottom</div>

<!-- Display -->
<div className="flex gap-4">Flex</div>
<div className="grid grid-cols-2">Grid</div>

<!-- Colors -->
<div className="bg-blue-600 text-white">Blue</div>
<div className="bg-red-50 text-red-600">Light red</div>

<!-- Typography -->
<h1 className="text-4xl font-bold">Heading</h1>
<p className="text-sm text-gray-600">Text</p>

<!-- Responsive -->
<div className="text-sm md:text-lg lg:text-xl">Responsive text</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>

<!-- Hover Effects -->
<button className="bg-blue-600 hover:bg-blue-700 transition">
  Hover me
</button>
```

---

## 📦 State Management (for future)

For larger projects, consider:

1. **React Context API** - Built-in state sharing
2. **Redux** - For complex state
3. **Zustand** - Lightweight alternative

Example with Context:

```typescript
// src/context/AuthContext.tsx
import React, { createContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('authToken')
  );

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Usage in component
const MyComponent = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('Auth context not found');
  return <div>{auth.token ? 'Logged in' : 'Not logged in'}</div>;
};
```

---

## 🧪 Testing (Optional)

### Setup Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

### Example Test

```typescript
// src/__tests__/App.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders welcome message', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Campus Service Marketplace/i)).toBeInTheDocument();
});
```

---

## 🔍 Debugging

### React DevTools

Install the React DevTools browser extension to inspect components and state.

### Vite DevTools

Built into dev server. Check the console in DevTools.

### Network Tab

Monitor API calls:
1. Open DevTools
2. Go to Network tab
3. Make API calls
4. See requests/responses

---

## 📝 TypeScript Best Practices

```typescript
// ✅ Good: Explicit types
interface User {
  id: string;
  name: string;
  email: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>;
};

// ❌ Bad: Using any
const UserCard = ({ user }: any) => {
  return <div>{user.name}</div>;
};
```

---

## 🚀 Production Deployment

### Build

```bash
npm build
```

### Preview Locally

```bash
npm preview
```

### Deploy to Vercel/Netlify

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variables
4. Deploy!

---

## 📚 Useful Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Axios Documentation](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
