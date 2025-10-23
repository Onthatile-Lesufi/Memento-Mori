const express = require("express");
const database = require("../middleware/database");
const app = express();
const router = express.Router();

router.get("/user=:user-grave=:grave", async (req, res) => {
    try {
        const _user = req.params.user;
        const _grave = req.params.grave;
        const _sql = `SELECT * FROM save WHERE user_id = ${_user} AND id_number = ${_grave}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/delete=:id", async (req, res) => {
    const index = req.params.id;
    try {
        const _sql = `DELETE FROM save WHERE save_id = ${index}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;