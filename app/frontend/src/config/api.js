// Base API configuration for Rails backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// API client configuration
const api = {
    // GET request
    get: async (endpoint) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add CSRF token if needed
                // 'X-CSRF-Token': document.querySelector('[name="csrf-token"]')?.content,
            },
            credentials: 'include', // Needed for cookies/session
        });
        return response.json();
    },

    // POST request
    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add CSRF token if needed
                // 'X-CSRF-Token': document.querySelector('[name="csrf-token"]')?.content,
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        return response.json();
    }
};

export default api;