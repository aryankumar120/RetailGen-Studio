# RetailGen Studio

**AI-Adaptive Creative Builder for Retail Media**

## Overview

RetailGen Studio is an AI-powered creative builder that enables advertisers to generate professional, guideline-compliant creative assets for retail media campaigns across multiple channels (Facebook, Instagram, in-store displays).

## Features

- 🎨 **Visual Canvas Editor**: Drag-and-drop interface powered by Fabric.js
- 🤖 **AI Background Removal**: Automatic background removal using U2Net
- 🎯 **Layout Intelligence**: AI-generated layout suggestions
- ✅ **Compliance Validation**: Automated retailer & brand guideline checking
- 📐 **Multi-Format Export**: One-click export for FB Feed, IG Post, IG Story
- 🎨 **Brand Kit Manager**: Store and apply brand colors, fonts, logos
- 🖼️ **Image Optimization**: Auto-compress to <500KB

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Fabric.js (canvas editor)
- React Query (data fetching)

### Backend
- Node.js + Express
- PostgreSQL + Prisma
- AWS S3 / Cloudinary (file storage)
- JWT authentication

### AI Services
- Python + Flask
- rembg (background removal)
- OpenAI GPT-4 Vision (layout suggestions)
- Anthropic Claude (compliance validation)
- Sharp.js (image processing)

## Project Structure

```
RetailGenStudio/
├── frontend/          # React application
├── backend/           # Node.js API
├── ai-service/        # Python ML service
├── shared/            # Shared types
└── docs/              # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repo-url>
cd RetailGenStudio
```

2. Install all dependencies
```bash
npm run install:all
```

3. Set up environment variables (see `.env.example` in each service)

4. Start development servers
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- AI Service: http://localhost:5000

## Environment Variables

Single `.env` file at the root:
```
PORT=3000
AI_SERVICE_PORT=5000
OPENAI_API_KEY=your-key-here
GROQ_API_KEY=your-key-here
VITE_API_URL=http://localhost:3000
VITE_AI_SERVICE_URL=http://localhost:5000
```

## Usage

1. **Upload Assets**: Upload packshots and backgrounds
2. **Design Creative**: Use drag-and-drop editor to compose layout
3. **Apply Brand Kit**: Add colors, logos, text with brand identity
4. **AI Suggestions**: Get AI-generated layout alternatives
5. **Validate Compliance**: Check against retailer/brand guidelines
6. **Export**: Download in multiple formats (<500KB)

## API Documentation

See `/docs/api.md` for detailed API documentation.

## Contributing

This is a hackathon project. Contributions welcome!

## License

MIT
