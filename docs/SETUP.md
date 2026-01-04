# RetailGen Studio - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd RetailGenStudio
```

### 2. Install Dependencies

Install all dependencies for frontend, backend, and AI service:

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..

# Install backend dependencies
cd backend
npm install
cd ..

# Install Python dependencies for AI service
cd ai-service
pip install -r requirements.txt
cd ..
```

### 3. Environment Setup

#### Backend (.env)

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
AI_SERVICE_URL=http://localhost:5000
```

#### AI Service (.env)

Create `ai-service/.env`:

```env
FLASK_ENV=development
PORT=5000
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
MAX_IMAGE_SIZE=10485760
TEMP_DIR=./temp
```

#### Frontend (.env)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_AI_SERVICE_URL=http://localhost:5000
```

### 4. Get API Keys

#### OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy and paste into `ai-service/.env`

#### Anthropic API Key
1. Go to https://console.anthropic.com/
2. Create a new API key
3. Copy and paste into `ai-service/.env`

## Running the Application

### Option 1: Run All Services Together (Recommended)

From the root directory:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- AI Service: http://localhost:5000

### Option 2: Run Services Separately

#### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```

#### Terminal 2 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 3 - AI Service
```bash
cd ai-service
python app.py
```

## Verify Installation

1. Open http://localhost:5173 in your browser
2. You should see the RetailGen Studio landing page
3. Click "Launch Editor" to access the creative builder
4. Try uploading an image to verify backend connection
5. Try removing background to verify AI service connection

## Troubleshooting

### Frontend won't start
- Check if port 5173 is available
- Run `npm install` in frontend directory
- Clear node_modules and reinstall

### Backend won't start
- Check if port 3000 is available
- Ensure Node.js 18+ is installed
- Check backend/.env file exists

### AI Service won't start
- Check if port 5000 is available
- Ensure Python 3.9+ is installed
- Install pip dependencies: `pip install -r requirements.txt`
- Verify API keys are set in .env file

### Background removal fails
- Check OPENAI_API_KEY in ai-service/.env
- Ensure rembg is installed correctly
- Try reinstalling: `pip install --upgrade rembg`

### Compliance check fails
- Check ANTHROPIC_API_KEY in ai-service/.env
- Ensure you have API credits

## Development Tips

- Hot reload is enabled for all services
- Frontend changes reflect immediately
- Backend requires restart for route changes
- AI service auto-reloads on file changes (Flask debug mode)

## Production Deployment

See `docs/DEPLOYMENT.md` for production deployment instructions.

## Need Help?

Create an issue on GitHub or contact the development team.
