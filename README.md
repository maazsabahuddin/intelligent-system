# Intelligent-System: Sales & Marketing AI Assistant

A modern, full-stack AI-powered chatbot application designed specifically for sales and marketing professionals. Built with React, TypeScript, Flask, and OpenAI's GPT-4o-mini model.

## 🚀 Overview

Intelligent-System is a comprehensive sales and marketing assistant that provides expert advice on:
- Sales strategies and funnel optimization
- Marketing campaigns and ROI analysis
- Lead generation and customer acquisition
- Digital marketing and social media strategies
- Content marketing and brand building
- Market analysis and competitive research
- Pricing strategies and business growth tactics

## 🏗️ Architecture

This is a monorepo containing two main applications:

```
intelligent-system/
├── is-backend/          # Flask API server
├── is-frontend/         # React TypeScript frontend
├── README.md           # This file
└── vercel.json         # Deployment configuration
```

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons
- Vite for build tooling

**Backend:**
- Flask (Python 3.11)
- OpenAI GPT-4o-mini integration
- Flask-CORS for cross-origin requests
- Gunicorn for production deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- OpenAI API key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd intelligent-system
```

### 2. Backend Setup

```bash
cd is-backend
pip install -r requirements.txt
cp .env.example .env  # Add your OpenAI API key
python main.py
```

### 3. Frontend Setup

```bash
cd is-frontend
npm install
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🔐 Authentication

**Demo Credentials:**
- Username: `maaz`
- Password: `helloworld`

## 📁 Project Structure

### Backend (`is-backend/`)
- RESTful API built with Flask
- OpenAI integration for AI responses
- CORS enabled for frontend communication
- Production-ready with Gunicorn

### Frontend (`is-frontend/`)
- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Context-based state management
- Protected routes and authentication
- Real-time chat interface

## 🌟 Key Features

### 🤖 AI-Powered Chat
- Intelligent responses powered by GPT-4o-mini
- Sales and marketing expertise
- Context-aware conversations
- Real-time typing indicators

### 📚 Knowledge Base
- Document upload and management
- File organization and search
- Secure document storage
- Multiple format support (PDF, DOC, TXT, etc.)

### 🔒 Security
- Authentication system
- Protected routes
- Secure API endpoints
- Data persistence

### 📱 User Experience
- Responsive design for all devices
- Intuitive chat interface
- Dark sidebar with document management
- Professional UI/UX design

## 🚀 Deployment

### Backend Deployment
The backend is configured for deployment on platforms like Heroku, Railway, or any Python hosting service.

### Frontend Deployment
The frontend is optimized for deployment on Vercel, Netlify, or similar static hosting platforms.

## 🛠️ Development

### Environment Variables

**Backend (.env):**
```
OPENAI_API_KEY=your_openai_api_key_here
FLASK_ENV=development
PORT=5000
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5000
```

### Available Scripts

See individual README files in `is-backend/` and `is-frontend/` for detailed development commands.

## 📖 Documentation

- [Backend Documentation](./is-backend/README.md)
- [Frontend Documentation](./is-frontend/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**MAAZ SABAH UDDIN**
- Expert in AI/ML and Full-Stack Development
- Specialized in modern web technologies and AI integration

## 🆘 Support

For support, please open an issue in the repository or contact the development team.

---

*Built with ❤️ for sales and marketing professionals*