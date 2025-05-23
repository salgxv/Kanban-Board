const login = async (userInfo) => {
    // TODO: make a POST request to the login route
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }
        return data;
    }
    catch (err) {
        console.error('Error from user login:', err);
        return Promise.reject('Could not fetch user info');
    }
};
export { login };
