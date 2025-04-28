export async function postRequest(endpoint, data, headers = {}) {
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error posting data:", error);
        throw error; // Re-throw to allow caller to handle
    }
}

export async function getRequest(endpoint, headers = {}) {
    const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw to allow caller to handle
    }
}
