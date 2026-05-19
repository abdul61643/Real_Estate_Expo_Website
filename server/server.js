import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* =========================
   REGISTER VISITOR
========================= */

app.post("/register", (req, res) => {

    console.log(req.body);
    const {
        first_name,
        last_name,
        email,
        phone
    } = req.body;

    /* Validation */

    if (
        !first_name ||
        !last_name ||
        !email ||
        !phone
    ) {

        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const sql = `
        INSERT INTO visitors
        (first_name, last_name, email, phone)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [first_name, last_name, email, phone],

        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Registration Failed"
                });
            }

            res.json({
                message: "Registration Successful"
            });
        }
    );
});

/* =========================
   GET ALL VISITORS
========================= */

app.get("/visitors", (req, res) => {

    const sql = "SELECT * FROM visitors";

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json(err);
        }

        res.json(result);
    });
});

/* =========================
   SERVER
========================= */

app.listen(5000, () => {

    console.log("Server running on port 5000");
});