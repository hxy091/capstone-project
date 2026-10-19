// In production, set VITE_API_URL to your deployed backend URL (e.g. https://your-api.onrender.com)
// In development, leave it empty so Vite proxies /api to localhost:5000
export const API_URL = import.meta.env.VITE_API_URL || '';
