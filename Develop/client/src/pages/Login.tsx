import { useState, FormEvent, ChangeEvent } from "react";
import { login } from "../api/authAPI";
import Auth from "../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const data = await login(formState);
      Auth.login(data.token); // ✅ Save token and redirect
    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label>Username</label>
        <input
          type='text'
          name='username'
          value={formState.username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type='password'
          name='password'
          value={formState.password}
          onChange={handleChange}
        />

        <button type='submit'>Submit Form</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;