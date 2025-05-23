import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<{ token: string }> => {
  try {
    const response = await fetch('https://kanban-board-droa.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data; // must contain { token }
  } catch (err) {
    console.error('Error from user login:', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };