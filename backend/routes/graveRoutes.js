const express = require("express");
const mysql = require("mysql");
const app = express();
const router = express.Router();
const path = require('path');
const fs = require("fs");

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        const uploadPath = `../backend/assets/graves/`;
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cd(null, uploadPath);
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "memento-mori"
})

router.get("/", async (req, res) => {
    try {
        const _sql = `SELECT * FROM grave`
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
        const _sql = `SELECT * FROM grave WHERE id_number = ${_id}`
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
    try {
        const _name = req.params.name;
        const _sql = `SELECT * FROM grave WHERE grave_name LIKE "%${_name}%"`;
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

router.get("/graveyard=:graveyard", async (req, res) => {
    try {
        const _graveyard = req.params.graveyard;
        const _sql = `SELECT * FROM grave WHERE graveyard_id LIKE "%${_graveyard}%"`;
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
        const _sql = `SELECT * FROM grave WHERE grave_visibility = false`;
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

router.post("/register", upload.single('image'), async (req, res) => {
    // const {id_number,name,deathDate,burialDate,yardId,image} = req.body;
    const formData = req.body;
    // return res.json({formData: formData, image: req.file});
    try {
        const _sql = `INSERT INTO grave(id_number, grave_name, death_date, burial_date, graveyard_id, grave_image, grave_visibility) VALUES ('${formData.id}','${formData.name}','${formData.dod}','${formData.dob}','${formData.graveyard}','${req.file}',false)`;
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

router.post("/save", async (req, res) => {
    const {user, grave} = req.body;
    try {
        const _sql = `INSERT INTO save(user_id, id_number) VALUES (${user},'${grave}')`;
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

module.exports = router;