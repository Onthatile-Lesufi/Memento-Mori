const express = require("express");
const database = require("../middleware/database");
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
        cd(null, Date.now() +"-"+ file.originalname.slice(0, file.originalname.indexOf('.')) +path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

router.get("/", async (req, res) => {
    try {
        const _sql = `SELECT * FROM grave WHERE grave_visibility = true`
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
        const _sql = `SELECT * FROM grave WHERE grave_name LIKE "%${_name}%" AND grave_visibility = true`;
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

router.get("/graveyard=:graveyard", async (req, res) => {
    try {
        const _graveyard = req.params.graveyard;
        const _sql = `SELECT * FROM grave WHERE graveyard_id LIKE "%${_graveyard}%" AND grave_visibility = true`;
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

router.get("/user=:user", async (req, res) => {
    try {
        const _user = req.params.user;
        const _sql = `SELECT * FROM save WHERE user_id = ${_user}`;
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
    let _path;
    let _cloudinaryResult;
    try {
        const _sql = `INSERT INTO grave(id_number, grave_name, death_date, burial_date, graveyard_id, grave_visibility) VALUES ('${formData.id}','${formData.name}','${formData.dod}','${formData.dob}','${formData.graveyard}',false)`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
                if (req.file) {
                    cloudinary.uploader.upload(req.file.path, (err,result) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).json({
                                message: "Cloudinary Error",
                                error: err
                            })
                        }
                    
                        _cloudinaryResult = result;
                        const _sql = `UPDATE grave SET grave_image = '${_cloudinaryResult.secure_url}' WHERE grave.id_number = '${formData.id}'`;
                        database.query(_sql, (err, data) => {
                            if (err) {
                                res.status(400).json({ error: err.message });
                            } {
                                res.status(200).json(data);
                            }
                        })
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.post("/save", async (req, res) => {
    const {user, grave} = req.body;
    console.log(req.body);
    try {
        const _sql = `INSERT INTO save(user_id, id_number) VALUES (${user},${grave})`;
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

router.patch("/clear", async (req, res) => {
    const {index} = req.body;
    try {
        const _sql = `UPDATE grave SET grave_visibility = true WHERE id_number = ${index}`;
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
    console.log(index);
    try {
        const _sql = `UPDATE grave SET grave_visibility = false WHERE id_number = ${index}`;
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
        const _sql = `DELETE FROM grave WHERE id_number = ${index}`;
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