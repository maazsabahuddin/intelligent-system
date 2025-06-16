# Intelligent-System Backend

A Flask-based REST API server that powers the Intelligent-System sales and marketing AI assistant. Built with Python 3.11, Flask, and OpenAI's GPT-4o-mini model.

## 🚀 Overview

The backend serves as the core API for the Intelligent-System application, providing:
- AI-powered chat responses using OpenAI GPT-4o-mini
- Sales and marketing expertise context
- RESTful API endpoints
- CORS support for frontend integration
- Production-ready deployment configuration

## 🏗️ Architecture

### Technology Stack

- **Framework**: Flask 3.1.0
- **AI Model**: OpenAI GPT-4o-mini
- **CORS**: Flask-CORS 5.0.1
- **Production Server**: Gunicorn 23.0.0
- **Environment Management**: python-dotenv 1.1.0
- **Python Version**: 3.11+

### Project Structure

```
is-backend/
├── main.py              # Main Flask application
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
├── Procfile            # Heroku deployment config
├── .env.example        # Environment variables template
└── README.md           # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)
- OpenAI API key

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd intelligent-system/is-backend
```

### 2. Create Virtual Environment (Recommended)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the `is-backend` directory:

```bash
cp .env.example .env
```

Add your configuration to `.env`:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Flask Configuration
FLASK_ENV=development
PORT=5000

# Optional: Debug mode
DEBUG=True
```

### 5. Run the Development Server

```bash
python main.py
```

The server will start at `http://localhost:5000`

## 📡 API Endpoints

### 1. Health Check

```http
GET /server-configuration
```

**Response:**
```json
{
  "debug": true,
  "port": 5000,
  "env": "development"
}
```

### 2. Chat Endpoint

```http
POST /chat
```

**Request Body:**
```json
{
  "message": "How can I improve my sales conversion rate?"
}
```

**Response:**
```json
{
  "response": "To improve your sales conversion rate, consider implementing these proven strategies: 1. Optimize your sales funnel by identifying and addressing drop-off points..."
}
```

**Error Responses:**
- `400`: Missing message in request
- `500`: Internal server error

## 🤖 AI Configuration

### Model Details

- **Model**: `gpt-4o-mini`
- **Provider**: OpenAI
- **Context**: Sales & Marketing Expert

### System Prompt

The AI is configured with a comprehensive sales and marketing context that includes:

- Sales strategies and funnel optimization
- Marketing campaigns and ROI analysis
- Lead generation and customer acquisition
- Digital marketing and social media strategies
- Content marketing and brand building
- Market analysis and competitive research
- Pricing strategies and business growth tactics

### Response Characteristics

- **Actionable**: Provides practical, implementable advice
- **Data-driven**: Focuses on measurable results and ROI
- **Expert-level**: Delivers professional sales and marketing insights
- **Business-focused**: Tailored for revenue growth and scaling

## 🚀 Production Deployment

### Using Gunicorn (Recommended)

```bash
gunicorn main:app --bind 0.0.0.0:5000 --workers 2 --timeout 120
```

### Environment Variables for Production

```env
OPENAI_API_KEY=your_production_openai_api_key
FLASK_ENV=production
PORT=5000
DEBUG=False
```

### Docker Deployment

Build the Docker image:

```bash
docker build -t intelligent-system-backend .
```

Run the container:

```bash
docker run -p 5000:5000 --env-file .env intelligent-system-backend
```

### Heroku Deployment

1. Install Heroku CLI
2. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
3. Set environment variables:
   ```bash
   heroku config:set OPENAI_API_KEY=your_api_key
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

## 🔧 Development

### Available Scripts

```bash
# Run development server
python main.py

# Run with specific port
PORT=8000 python main.py

# Run in production mode
FLASK_ENV=production python main.py
```

### Code Structure

#### `main.py`

The main application file containing:

- **Flask app initialization**
- **CORS configuration**
- **OpenAI client setup**
- **Route definitions**
- **Error handling**

#### Key Components

1. **OpenAI Integration**
   ```python
   client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
   ```

2. **Chat Endpoint Logic**
   ```python
   @app.route('/chat', methods=['POST'])
   def chat():
       # Process user message
       # Generate AI response
       # Return formatted response
   ```

3. **Error Handling**
   ```python
   @app.errorhandler(404)
   def not_found(e):
       return jsonify({'error': 'Not found'}), 404
   ```

## 🧪 Testing

### Manual Testing

Test the chat endpoint:

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the best lead generation strategies?"}'
```

### Health Check

```bash
curl http://localhost:5000/server-configuration
```

## 📊 Monitoring & Logging

### Production Logging

The application includes basic logging for:
- Request processing
- Error tracking
- OpenAI API interactions

### Performance Considerations

- **Timeout**: 120 seconds for long AI responses
- **Workers**: 2 Gunicorn workers for production
- **Memory**: Optimized for minimal memory usage

## 🔒 Security

### API Key Management

- Store OpenAI API key in environment variables
- Never commit API keys to version control
- Use different keys for development and production

### CORS Configuration

- Configured to allow frontend access
- Adjust CORS settings for production domains

## 🐛 Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   ```
   Error: OpenAI API key not found
   Solution: Check .env file and ensure OPENAI_API_KEY is set
   ```

2. **Port Already in Use**
   ```
   Error: Port 5000 is already in use
   Solution: Change PORT in .env or kill existing process
   ```

3. **CORS Errors**
   ```
   Error: CORS policy blocking requests
   Solution: Verify Flask-CORS configuration
   ```

### Debug Mode

Enable debug mode for detailed error messages:

```env
FLASK_ENV=development
DEBUG=True
```

## 📈 Performance Optimization

### Production Optimizations

1. **Gunicorn Workers**: Adjust based on CPU cores
2. **Timeout Settings**: Configure for AI response times
3. **Memory Management**: Monitor memory usage
4. **Caching**: Consider implementing response caching

## 🤝 Contributing

1. Follow PEP 8 style guidelines
2. Add docstrings to functions
3. Include error handling
4. Test API endpoints thoroughly

## 📄 Dependencies

### Core Dependencies

- `flask==3.1.0` - Web framework
- `flask-cors==5.0.1` - CORS support
- `openai==1.77.0` - OpenAI API client
- `python-dotenv==1.1.0` - Environment variables
- `gunicorn==23.0.0` - Production server

### Development Dependencies

All dependencies are production-ready and minimal for optimal performance.

## 📞 Support

For backend-specific issues:
1. Check the logs for error messages
2. Verify environment variables
3. Test API endpoints individually
4. Review OpenAI API usage and limits

---

**Built by MAAZ SABAH UDDIN** - Expert in AI/ML and Backend Development