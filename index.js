// Modules
const read = require('read-file')
const getCombinations = require('./modules/combinations.js')

// Language
let icelandic = read.sync('icelandic.txt').toString().split("\n");

// Helpers
const uniq = a => [...new Set(a)];
const remove = (array, element) => array.splice(array.indexOf(element), 1);

// Solver
const solver = (letters, length) => {
	letters = Array.from(letters.toLowerCase());
	const combinations = getCombinations(letters, length);

	let results = [];
	for(word of icelandic){
		if(word.length != length) continue;
		word = word.toLowerCase();
		for(comb of combinations){
			let valid = true, tempWord = Array.from(word);
			for(let i = 0; i < length; i++)
				(tempWord.includes(comb[i])) ? remove(tempWord, comb[i]) : valid = false;

			console.log(valid);
			valid && results.push(word);
		}
	}
	return uniq(results);
}

// **************************************************************
	// SERVER
// **************************************************************

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/solve', function (req, res) {
	console.log(req.body);
	res.send(solver(req.body.letters, req.body.length));
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port 3000'));