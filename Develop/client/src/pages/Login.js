import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { login } from "../api/authAPI";
import Auth from "../utils/auth";
const Login = () => {
    const [formState, setFormState] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const data = await login(formState);
            Auth.login(data.token); // ✅ Save token and redirect
        }
        catch (err) {
            console.error(err);
            setError("Invalid username or password");
        }
    };
    return (_jsx("div", { className: 'container', children: _jsxs("form", { className: 'form', onSubmit: handleSubmit, children: [_jsx("h1", { children: "Login" }), _jsx("label", { children: "Username" }), _jsx("input", { type: 'text', name: 'username', value: formState.username, onChange: handleChange }), _jsx("label", { children: "Password" }), _jsx("input", { type: 'password', name: 'password', value: formState.password, onChange: handleChange }), _jsx("button", { type: 'submit', children: "Submit Form" }), error && _jsx("p", { style: { color: "red" }, children: error })] }) }));
};
export default Login;
