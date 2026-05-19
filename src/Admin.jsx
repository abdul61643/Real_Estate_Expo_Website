import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {

    const [visitors, setVisitors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        // Check Admin Login
        const admin = localStorage.getItem("admin");

        if (!admin) {

            navigate("/login");

            return;
        }

        // Fetch Visitors
        axios
            .get("http://localhost:5000/visitors")
            .then((res) => {

                setVisitors(res.data);

            })
            .catch((err) => {

                console.log(err);

            });

    }, []);

    return (

        <div
            style={{
                padding: "40px",
                fontFamily: "Arial",
                background: "#f5f5f5",
                minHeight: "100vh",
            }}
        >

            {/* Top Bar */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >

                <h1>Visitor Registrations</h1>

                <button
                    onClick={() => {

                        localStorage.removeItem("admin");

                        navigate("/login");

                    }}
                    style={{
                        padding: "10px 20px",
                        background: "red",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                >
                    Logout
                </button>

            </div>

            {/* Table */}
            <table
                border="1"
                cellPadding="12"
                style={{
                    width: "100%",
                    marginTop: "20px",
                    borderCollapse: "collapse",
                    background: "#fff",
                }}
            >

                <thead
                    style={{
                        background: "#222",
                        color: "#fff",
                    }}
                >

                    <tr>
                        <th>ID</th>

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Email</th>

                        <th>Phone Number</th>

                    </tr>

                </thead>

                <tbody>

                    {visitors.map((item, index) => (

                        <tr key={index}>

                            <td>{item.id}</td>

                            <td>{item.first_name}</td>

                            <td>{item.last_name}</td>

                            <td>{item.email}</td>

                            <td>{item.phone}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}