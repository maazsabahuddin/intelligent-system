# Intelligent-System Frontend

A modern React TypeScript application that provides an intuitive chat interface for the Intelligent-System sales and marketing AI assistant. Built with React 18, TypeScript, Tailwind CSS, and Vite.

## 🚀 Overview

The frontend delivers a professional, responsive chat experience featuring:
- Real-time AI conversations with sales and marketing expertise
- Document upload and knowledge base management
- Secure authentication system
- Modern, responsive UI design
- Professional chat interface with typing indicators

## 🏗️ Architecture

### Technology Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1
- **Routing**: React Router DOM 6.22.1
- **Icons**: Lucide React 0.344.0
- **State Management**: React Context API
- **HTTP Client**: Fetch API

### Project Structure

```
is-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ErrorModal.tsx
│   │   ├── KnowledgeBaseModal.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── WelcomeScreen.tsx
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ChatContext.tsx
│   ├── pages/              # Page components
│   │   ├── ChatPage.tsx
│   │   └── LoginPage.tsx
│   ├── services/           # API services
│   │   └── chatbotService.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx           # App entry point
│   ├── index.css          # Global styles
│   └── vite-env.d.ts      # Vite type definitions
├── public/                 # Static assets
├── dist/                  # Build output
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd intelligent-system/is-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `is-frontend` directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# Optional: Other environment variables
VITE_APP_NAME=Intelligent-System
VITE_APP_VERSION=1.0.0
```

### 4. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint
```

### Build & Deployment

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

## 🎨 UI Components

### Core Components

#### 1. **ChatInput** (`src/components/ChatInput.tsx`)
- Auto-resizing textarea
- Send button with loading states
- File attachment support
- Voice input placeholder
- Keyboard shortcuts (Enter to send)

#### 2. **ChatMessage** (`src/components/ChatMessage.tsx`)
- User and bot message differentiation
- Avatar system with icons
- Markdown-style content rendering
- Timestamp display
- Professional message styling

#### 3. **Sidebar** (`src/components/Sidebar.tsx`)
- Knowledge base document management
- Quick file upload functionality
- Document preview and deletion
- Industry best practices section
- Responsive mobile design

#### 4. **KnowledgeBaseModal** (`src/components/KnowledgeBaseModal.tsx`)
- Full-featured document upload interface
- Drag-and-drop file support
- Upload progress indicators
- Document management (view, download, delete)
- Multiple file format support

#### 5. **WelcomeScreen** (`src/components/WelcomeScreen.tsx`)
- Professional landing interface
- Quick-start conversation suggestions
- Brand identity display
- Call-to-action buttons

### Authentication Components

#### **LoginPage** (`src/pages/LoginPage.tsx`)
- Secure login form
- Input validation
- Loading states
- Error handling
- Professional branding

#### **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
- Route protection logic
- Authentication state checking
- Automatic redirects

## 🔧 State Management

### Context Providers

#### 1. **AuthContext** (`src/contexts/AuthContext.tsx`)

Manages user authentication state:

```typescript
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}
```

**Features:**
- Persistent login state
- Secure credential validation
- Error handling
- Automatic session management

#### 2. **ChatContext** (`src/contexts/ChatContext.tsx`)

Manages chat functionality:

```typescript
interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}
```

**Features:**
- Message history persistence
- Real-time chat updates
- Loading states
- Error handling
- Local storage integration

## 🎨 Styling & Design

### Tailwind CSS Configuration

Custom design system with:

#### Color Palette
```javascript
colors: {
  primary: {
    50: '#EFF6FF',
    500: '#0970E6',  // Main brand color
    600: '#0957CB',
    // ... full scale
  },
  neutral: {
    // Professional gray scale
  },
  error: {
    // Error states
  },
  success: {
    // Success states
  }
}
```

#### Design Principles
- **Professional**: Clean, business-focused design
- **Responsive**: Mobile-first approach
- **Accessible**: High contrast ratios and keyboard navigation
- **Modern**: Contemporary UI patterns and animations

### Custom CSS Classes

#### Component Classes
```css
.btn {
  /* Standardized button styling */
}

.input {
  /* Consistent input field styling */
}

.prose {
  /* Typography for message content */
}
```

#### Animation Classes
```css
.message-enter {
  /* Smooth message animations */
}

.animate-bounce {
  /* Loading indicators */
}
```

## 🔐 Authentication System

### Login Credentials

**Demo Account:**
- Username: `maaz`
- Password: `helloworld`

### Security Features

1. **Protected Routes**: Automatic redirection for unauthenticated users
2. **Session Persistence**: Login state maintained across browser sessions
3. **Secure Logout**: Complete session cleanup
4. **Error Handling**: User-friendly error messages

### Authentication Flow

```typescript
// Login process
const success = await login(username, password);
if (success) {
  navigate('/chat');
}

// Route protection
<ProtectedRoute isAuthenticated={isAuthenticated}>
  <ChatPage />
</ProtectedRoute>
```

## 📡 API Integration

### Chat Service (`src/services/chatbotService.ts`)

Handles communication with the backend:

```typescript
export const fetchChatbotResponse = async (userMessage: string): Promise<string> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
  });
  
  // Error handling and response processing
};
```

**Features:**
- Comprehensive error handling
- Network failure detection
- HTTP status code management
- Type-safe responses

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations

1. **Collapsible Sidebar**: Overlay on mobile, static on desktop
2. **Touch-Friendly**: Large tap targets and gestures
3. **Optimized Typography**: Readable text sizes across devices
4. **Adaptive Layouts**: Flexible grid systems

## 🚀 Production Build

### Build Optimization

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

### Performance Features

1. **Code Splitting**: Vendor and app bundles separated
2. **Tree Shaking**: Unused code elimination
3. **Asset Optimization**: Compressed images and fonts
4. **Lazy Loading**: Components loaded on demand

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**: Link your GitHub repository
2. **Configure Build**: Vite automatically detected
3. **Environment Variables**: Add `VITE_API_URL`
4. **Deploy**: Automatic deployment on push

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy the dist/ folder to your hosting provider
```

### Environment Variables for Production

```env
VITE_API_URL=https://your-backend-api.com
VITE_APP_NAME=Intelligent-System
```

## 🧪 Testing & Quality

### Code Quality Tools

- **ESLint**: Code linting and style enforcement
- **TypeScript**: Type safety and error prevention
- **Prettier**: Code formatting (via ESLint integration)

### Testing Strategy

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

## 🔧 Development Guidelines

### Code Organization

1. **Components**: Single responsibility principle
2. **Contexts**: Centralized state management
3. **Services**: API interaction layer
4. **Types**: TypeScript interfaces and types

### Best Practices

1. **TypeScript**: Full type coverage
2. **Error Boundaries**: Graceful error handling
3. **Accessibility**: ARIA labels and keyboard navigation
4. **Performance**: Optimized re-renders and lazy loading

### File Naming Conventions

- **Components**: PascalCase (e.g., `ChatInput.tsx`)
- **Contexts**: PascalCase with Context suffix
- **Services**: camelCase (e.g., `chatbotService.ts`)
- **Types**: PascalCase interfaces

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   ```
   Error: Unable to connect to chat service
   Solution: Verify VITE_API_URL in .env file
   ```

2. **Build Failures**
   ```
   Error: TypeScript compilation errors
   Solution: Run `npm run lint` and fix type issues
   ```

3. **Authentication Issues**
   ```
   Error: Login not working
   Solution: Check credentials (maaz/helloworld)
   ```

### Debug Mode

Enable development mode for detailed error messages:

```bash
npm run dev
```

## 📊 Performance Monitoring

### Metrics to Monitor

1. **Bundle Size**: Keep vendor chunk under 500KB
2. **Load Time**: Target < 3 seconds initial load
3. **Core Web Vitals**: Monitor LCP, FID, CLS
4. **API Response Times**: Chat responses < 5 seconds

### Optimization Techniques

1. **Lazy Loading**: Route-based code splitting
2. **Memoization**: React.memo for expensive components
3. **Virtual Scrolling**: For large message lists
4. **Image Optimization**: WebP format and compression

## 🤝 Contributing

### Development Workflow

1. **Fork Repository**: Create your own fork
2. **Feature Branch**: Create feature-specific branches
3. **Code Quality**: Follow ESLint rules and TypeScript standards
4. **Testing**: Verify functionality across devices
5. **Pull Request**: Submit with detailed description

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: All rules must pass
- **Formatting**: Consistent code style
- **Comments**: Document complex logic

## 📄 Dependencies

### Core Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.1",
  "lucide-react": "^0.344.0",
  "jspdf": "^2.5.1"
}
```

### Development Dependencies

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "typescript": "^5.5.3",
  "tailwindcss": "^3.4.1",
  "eslint": "^9.9.1",
  "vite": "^5.4.2"
}
```

## 📞 Support

For frontend-specific issues:

1. **Check Console**: Browser developer tools for errors
2. **Network Tab**: Verify API calls and responses
3. **Local Storage**: Check authentication and chat data
4. **Responsive Design**: Test across different screen sizes

### Debug Information

Access debug info at: `http://localhost:5173`
- React DevTools for component inspection
- Network tab for API monitoring
- Console for error tracking

---

**Built by MAAZ SABAH UDDIN** - Expert in React, TypeScript, and Modern Frontend Development

*Professional AI-powered sales and marketing assistant interface*