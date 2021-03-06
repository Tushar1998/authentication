// Inbuilt Modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Routes Controllers
const userRoutes = require("./routes/userRoutes.js");
const userMongoRoutes = require("./routes/userMongoRoutes");

// Custom Modules
const protectRoute = require("./middlewares/protectRoute.js");

const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.static(path.join(__dirname, "public")));

// app.get("*", (req, res) => {
// 	res.json({
// 		status: "SucessFull",
// 		message: "404 Please specific correct route",
// 	});
// });

app.get("/dashboard", protectRoute, (req, res) => {
	res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.use(express.json());
app.use(cors());

if (process.env.DATABASE === "MONGODB") {
	app.use("/users", userMongoRoutes);
	mongoose.connect(
		process.env.DB_CONNECTION,
		{
			useNewUrlParser: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
		() => {
			app.listen(process.env.PORT, () => {
				console.log(`Server start at http://localhost:${process.env.PORT}`);
			});
			console.log("Connected to DB!");
		}
	);
} else if (process.env.DATABASE === "FS") {
	app.use("/users", userRoutes);
	app.listen(process.env.PORT, () => {
		console.log(`Server start at http://localhost:${process.env.PORT}`);
	});
}
