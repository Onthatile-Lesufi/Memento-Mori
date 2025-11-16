const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const router = express.Router();
const database = require("../middleware/database");

app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        path: "/",
        secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
        httpOnly: true,
        sameSite: "Lax", // Use 'None' if working cross-origin with credentials
        maxAge: process.env.MAX_COOKIE_AGE,
    },
  })
);

router.get("/", async (req, res) => {
    try {
        const _sql = `SELECT * FROM user`
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
        const _sql = `SELECT * FROM user WHERE user_id = ${_id}`
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

router.post("/register", async (req, res) => {
    const {username, email, password} = req.body;
    try {
        let _password = await bcrypt.hash(password,13);
        const _sql = `INSERT INTO user(username, user_email, password, user_role) VALUES ('${username}','${email}','${_password}','user')`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    try {
        const _sql = `SELECT * FROM user WHERE user_email = '${email}'`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                if (data[0] === undefined || data[0] === null) {
                    return res.status(400).json({ error: "User not found" });
                }
                if (!PasswordTest(password)) {
                    return res.status(401).json({ error: "Incorrect password" });
                }
                
                req.session.user = {
                    username: data[0].username,
                    email: data[0].user_email,
                    role: data[0].user_role,
                    id: data[0].user_id
                };
                req.session.authenticated = true;
                
                res.status(200).json(data);
            }
        });
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Error logging out');
        }
      
        res.clearCookie('connect.sid', {path:"/"}); 
        res.status(200).json({ message: "Login successful"});
        res.session = null;
        res.end();
    });
});

router.get("/current", async (req, res) => {
    const user = req.session.user;
    const authentication = req.session.authenticated;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (user) res.status(200).json({ message: "Login successful", user, authentication });
})

router.get("/email=:email", async (req, res) => {
    const email = req.params.email;
    try {
        const _sql = `SELECT * FROM user WHERE user_email = '${email}'`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                if (data[0] === undefined || data[0] === null) {
                    return res.status(400).json({ error: "User not found" });
                }
                
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

router.patch("/update/all", async (req, res) => {
    const {id, username, email, password} = req.body;
    try {
        const _sql = `INSERT INTO user( username, user_email, password ) VALUES ('${username}','${email}','${password}') WHERE user_id = ${id}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

router.patch("/update/password", async (req, res) => {
    const {id, password} = req.body;
    console.log(req.body);
    try {
        const _sql = `UPDATE user SET password ='${password}' WHERE user_id = ${id}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

router.patch("/update/username", async (req, res) => {
    const {id, username} = req.body;
    try {
        const _sql = `UPDATE user SET username ='${username}' WHERE user_id = ${id}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

router.patch("/update/email", async (req, res) => {
    const {id, email} = req.body;
    try {
        const _sql = `UPDATE user SET user_email = '${email}' WHERE user_id = ${id}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

router.patch("/update/role", async (req, res) => {
    const {id, role} = req.body;
    try {
        const _sql = `UPDATE user SET user_role = '${role}' WHERE user_id = ${id}`;
        database.query(_sql, (err, data) => {
            if (err) {
                res.status(400).json({ error: err.message });
            } {
                res.status(200).json(data);
            }
        });
    } catch (error) {
        console.log("error: ", error);
    }
})

async function PasswordTest(password) {
    let _result = await bcrypt.compare(password, password);
    return _result;
}


module.exports = router;