# Resume Parser

An AI-powered resume analysis and resume builder app. Upload a resume to extract structured insights like ATS score, strengths, weaknesses, missing sections, skill gaps, suggested roles, and keyword recommendations. You can also build a resume from scratch with multiple templates and print-ready output.

## Features

- Resume upload and AI analysis for PDF, DOCX, TXT, PNG, JPG, JPEG, and WEBP files.
- Structured resume extraction with summary, skills, experience, education, projects, certifications, and recommendations.
- ATS-focused feedback including score, weaknesses, missing sections, and keyword suggestions.
- Auth flow with signup, login, logout, and protected dashboard routes.
- Resume builder with Modern, Creative, and Professional templates.
- Print/download workflow for the generated resume preview.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Hook Form
- Backend: Node.js, Express, MongoDB, Mongoose
- AI and parsing: Groq, LangChain, pdf-parse, Mammoth, Tesseract.js

## Project Structure

- `backend/` - Express API, authentication, upload handling, MongoDB connection, and AI resume parsing
- `frontend/` - Vite app with the dashboard, upload flow, and resume builder UI

## Prerequisites

- Node.js 18 or newer
- MongoDB connection string
- Groq API key

## Environment Variables

Create a `.env` file inside `backend/` with the following values:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
URL=http://localhost:5173
GROQ_API_KEY=your_groq_api_key
PORT=3000
```

`URL` should match the frontend origin so CORS and cookie-based auth work correctly.

## Installation

Install dependencies for each app separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Running Locally

Start the backend API:

```bash
cd backend
node server.js
```

Start the frontend development server in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on the Vite dev server, and the backend listens on port `3000` by default.

## Available Scripts

From `frontend/`:

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run lint` - run ESLint
- `npm run preview` - preview the production build locally
- `npm run typecheck` - run TypeScript type checking

The backend currently uses `node server.js` directly.

## API Overview

Backend routes are mounted under the Express app:

- `POST /auth/signup` - create an account
- `POST /auth/login` - log in
- `POST /auth/logout` - log out
- `GET /auth/me` - fetch the current authenticated user
- `POST /resumes/upload` - upload and analyze a resume file

## How It Works

1. A user signs up or logs in.
2. The dashboard lets the user upload a resume or switch to the resume builder.
3. Uploaded files are extracted from text or OCR depending on file type.
4. The backend sends the extracted content to Groq-powered structured analysis.
5. The UI renders the parsed data, ATS feedback, and resume-building tools.

## Notes

- Uploaded files are stored in `backend/uploads/`.
- The backend expects MongoDB to be available before starting.
- If the frontend and backend run on different origins, update `URL` in the backend `.env` file accordingly.
