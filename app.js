const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js')

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.static())
app.use(express.json());
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server start at http://localhost:${process.env.PORT}`);
});