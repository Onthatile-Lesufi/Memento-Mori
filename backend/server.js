const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;