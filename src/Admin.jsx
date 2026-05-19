import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function Admin() {

    const [visitors, setVisitors] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");

    const fetchVisitors = async (date = "") => {

        try {

            let url = "http://localhost:5000/visitors";

            // If date selected
            if (date) {
                url += `?date=${date}`;
            }

            const response = await fetch(url);

            const data = await response.json();

            setVisitors(data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        // Initial fetch
        fetchVisitors(selectedDate);

        // Auto refresh every 2 seconds
        const interval = setInterval(() => {

            fetchVisitors(selectedDate);

        }, 2000);

        // Cleanup
        return () => clearInterval(interval);

    }, [selectedDate]);

    const downloadExcel = () => {

        // Format data
        const formattedData = visitors.map((visitor) => ({

            First_Name: visitor.first_name,

            Last_Name: visitor.last_name,

            Email: visitor.email,

            Phone: visitor.phone,

            Registered_Date: new Date(
                visitor.created_at
            ).toLocaleDateString(),

            Registered_Time: new Date(
                visitor.created_at
            ).toLocaleTimeString()
        }));


        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(
            formattedData
        );

        // Create workbook
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Visitors"
        );

        // Generate Excel file
        const excelBuffer = XLSX.write(
            workbook,
            {
                bookType: "xlsx",
                type: "array"
            }
        );

        const data = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
            }
        );

        saveAs(
            data,
            `Visitors_${selectedDate || "All"}.xlsx`
        );
    };

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

            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center"
                }}
            >

                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {

                        const date = e.target.value;

                        setSelectedDate(date);

                        fetchVisitors(date);
                    }}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc"
                    }}
                />

                <button
                    onClick={() => {

                        setSelectedDate("");

                        fetchVisitors();
                    }}
                    style={{
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#111",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    Clear
                </button>

                <button
                    onClick={downloadExcel}
                    style={{
                        padding: "10px 16px",
                        border: "none",
                        borderRadius: "8px",
                        background: "green",
                        color: "#fff",
                        cursor: "pointer"
                    }}
                >
                    Download Excel Sheet
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