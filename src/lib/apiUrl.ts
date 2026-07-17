// import.meta.env.VITE_API_URL is intentionally set to "" in production
// (same-origin relative fetches — the backend serves the built frontend
// from this same origin/container, see server/index.ts + Dockerfile).
// `VITE_API_URL || 'http://localhost:3001'` would treat that empty string
// as "unset" (falsy) and silently fall back to localhost, which is exactly
// the bug that broke the deployed site (CORS errors fetching localhost:3001
// from the real domain). Only fall back when the var is truly unset.
export const API_URL: string = typeof import.meta.env.VITE_API_URL === 'string'
  ? import.meta.env.VITE_API_URL
  : 'http://localhost:3001';
