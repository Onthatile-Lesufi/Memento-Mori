const express = require("express");
const database = require("../middleware/database");
const app = express();
const router = express.Router();

router.get("/grave=:grave", async (req, res) => {
    const _grave = req.params.grave;
    try {
        const _sql = `SELECT grave_comment.message_text, user.username FROM grave_comment INNER JOIN user ON grave_comment.user_id = user.user_id WHERE grave_comment.id_number = ${_grave}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.post("/", async (req, res) => {
    const {user, grave, comment} = req.body;
    try {
        const _sql = `INSERT INTO grave_comment (id_number, user_id, message_text) VALUES ("${grave}", ${user}, "${comment}")`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(401).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = router;