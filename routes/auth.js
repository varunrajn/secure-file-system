const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Register user
router.post("/register", (req, res) => {

    const { name, email, password, role } = req.body;

    const sql = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

    db.query(sql, [name, email, password, role], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json("User registered successfully");

    });

});


// Login user
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            res.json("Login successful");
        } else {
            res.json("Invalid email or password");
        }

    });

});

module.exports = router;