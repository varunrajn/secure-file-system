const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../config/db");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {

    const filename = req.file.filename;
    const filepath = req.file.path;
    const uploaded_by = 1;

    const sql = "INSERT INTO files (filename,filepath,uploaded_by) VALUES (?,?,?)";

    db.query(sql, [filename, filepath, uploaded_by], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json("File uploaded successfully");

    });

});

module.exports = router;
// Download file
router.get("/download/:filename", (req, res) => {
    const file = "uploads/" + req.params.filename;

    res.download(file);

});