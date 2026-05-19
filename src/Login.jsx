import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleLogin = () => {

        if (
            form.username === "dgate" &&
            form.password === "dgate123"
        ) {

            localStorage.setItem("admin", "true");

            navigate("/admin");

        } else {

            alert("Invalid Credentials");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <div className="logo-circle">
                        D
                    </div>

                    <h1>Admin Login</h1>

                    <p>
                        Sign in to continue to dashboard
                    </p>

                </div>

                <div className="input-group">

                    <label>
                        Username
                    </label>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={form.username}
                        onChange={handleChange}
                    />

                </div>

                <div className="input-group">

                    <label>
                        Password
                    </label>

                    <div className="password-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                        />

                        <span
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>

                    </div>

                </div>

                <button
                    className="login-btn"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>

    );
}