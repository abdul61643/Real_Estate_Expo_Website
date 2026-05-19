import mysql from "mysql2";

const db = mysql.createConnection({

    host: "localhost",

    user: "root",

    password: "root",

    database: "expo_registration"
});

db.connect((err) => {

    if (err) {

        console.log("Database Connection Failed");

    } else {

        console.log("MySQL Connected");
    }
});

export default db;