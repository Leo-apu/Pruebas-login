const fs = require('fs');
const path = require('path');

const userFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));


const controller = {
	index: (req, res) => {
		res.render('index', { users });
	},
};

module.exports = controller;