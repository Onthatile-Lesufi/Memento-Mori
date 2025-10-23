const express = require("express");
const database = require("../middleware/database");
const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const _sql = `SELECT * FROM graveyard`
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/id=:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const _sql = `SELECT * FROM graveyard WHERE graveyard_id = ${_id}`
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/name=:name", async (req, res) => {
    const _name = req.params.name;
    try {
        const _sql = `SELECT * FROM graveyard WHERE graveyard_name LIKE '%${_name}%'`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

router.get("/restricted", async (req, res) => {
    try {
        const _sql = `SELECT * FROM graveyard WHERE graveyard_visibility = false`;
        database.query(_sql, (err,data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        console.error("error:",error);
    }
}) 

router.post("/register", async (req, res) => {
    const {name, address, province} = req.body;
    try {
        const _sql = `INSERT INTO graveyard(graveyard_name, graveyard_address, graveyard_province, graveyard_visibility) VALUES ('${name}','${address}','${province}',false)`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json({message: data});
            }
        })
    } catch (error) {
        console.error("error:",error);
    }
})

router.patch("/clear", async (req, res) => {
    const {index} = req.body;
    try {
        const _sql = `UPDATE graveyard SET graveyard_visibility = true WHERE graveyard_id = ${index}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.patch("/restrict", async (req, res) => {
    const {index} = req.body;
    try {
        const _sql = `UPDATE graveyard SET graveyard_visibility = false WHERE graveyard_id = ${index}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.delete("/delete=:id", async (req, res) => {
    const index = req.params.id;
    try {
        const _sql = `DELETE FROM graveyard WHERE graveyard_id = ${index}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;