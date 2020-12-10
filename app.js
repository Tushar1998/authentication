const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js')
const protectRoute = require('./middlewares/protectRoute.js')

const app = express();

dotenv.config({ path: './config.env' });

app.use(express.static(path.join(__dirname, "public")));
app.get('/dashboard', protectRoute, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"))
});


app.use(express.json());
app.use('/users', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server start at http://localhost:${process.env.PORT}`);
});