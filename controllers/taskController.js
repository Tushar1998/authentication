// Inbuilt Modules
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, "..", "data", "tasks.json");
const tasks = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

const getAllTask = (req, res) => {
    res.status(200).send(tasks);
}

module.exports = getAllTask;