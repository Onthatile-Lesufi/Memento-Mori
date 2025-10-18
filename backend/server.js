const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
//Middleware to parse JSON bodies
app.use(express.json({limit: '1mb'}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.MAX_COOKIE_AGE),
        sameSite: 'lax',
        secure: false
    }
}))

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database: "memento-mori"
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const graveRoutes = require('./routes/graveRoutes');
app.use('/api/graves', graveRoutes);

const graveyardRoutes = require('./routes/graveyardRoutes');
app.use('/api/graveyards', graveyardRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);