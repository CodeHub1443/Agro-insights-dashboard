/**
 * Centralized configuration for the Agro Insights Dashboard
 */

// Use environment variable if available, otherwise fallback to local backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Helper to construct output URLs
export const getOutputUrl = (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    // If the path is already a full URL, return it
    if (path.startsWith('http')) return path;
    // Otherwise, construct it from the base URL
    return `${API_BASE_URL}/outputs/${path}`;
};

// Helper for static assets from backend
export const getStaticUrl = (path: string | undefined): string | undefined => {
    if (!path) return undefined;
    if (path.startsWith('http')) return path;
    return `${API_BASE_URL}/static/${path}`;
};
