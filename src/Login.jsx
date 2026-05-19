import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleLogin = () => {

        // Simple Admin Login
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

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >

            <div
                style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "10px",
                    width: "350px",
                }}
            >

                <h2>Admin Login</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "15px",
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "20px",
                        background: "#111",
                        color: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Login
                </button>

            </div>

        </div>
    );
}