# BioLearn

A Biology learning companion for SHS learner materials (Year 2 and Year 3).

## Requirements
- Node.js 20+

## Local setup
1. Clone this repository.
2. Run `npm install`.
3. Start the frontend with `npm run dev`.
4. In another terminal, run `npm run server` to start the Node tutor API on port 3001.
5. Copy `.env.example` to `.env` and add your Gemini API key for tutor functionality.

The Vite dev server proxies `/api` requests to the local Node server.

## Vercel
The static frontend builds with `npm run build`. The `api/tutor.js` serverless function uses `GEMINI_API_KEY` and optional `GEMINI_MODEL` environment variables. Set these in Vercel's project settings; never commit secrets.

## Current scope
- Topic navigation based on Year 2 and Year 3 textbook section titles.
- Study progress saved in the browser.
- AI tutor API (Gemini) endpoint.
- Responsive frontend.

Textbook lessons and assessments still need page-level extraction and review before being added as PDF-grounded content.
