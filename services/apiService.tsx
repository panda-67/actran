// export const API_BASE_URL = "https://sweeping-seahorse-usefully.ngrok-free.app"; // Replace with your local IP
export const API_BASE_URL = 'http://127.0.0.1:9090';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};
