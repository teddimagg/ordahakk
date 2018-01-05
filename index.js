// Modules
const read = require('read-file')
const getCombinations = require('./modules/combinations.js')

// Language
let icelandic = read.sync('icelandic.txt').toString().split("\n");

// Helpers
const uniq = a => [...new Set(a)];
const remove = (array, element) => array.splice(array.indexOf(element), 1);

let history = {};
history['smegma'] = 'smegma';
// Solver
const solver = (letters, length) => {
	// Fetch from history if existing
	letters = letters.split('').sort().join('');
	if(history[letters] != null && history[letters][length.toString()]) return history[letters][length.toString()];
	console.log('not in history');

	const combinations = getCombinations(Array.from(letters.toLowerCase()), length);
	let results = [];

	for(word of icelandic){
		if(word.length != length) continue;
		word = word.toLowerCase();
		for(comb of combinations){
			let valid = true, tempWord = Array.from(word);
			for(let i = 0; i < length; i++)
				(tempWord.includes(comb[i])) ? remove(tempWord, comb[i]) : valid = false;

			valid && results.push(word);
		}
	}

	// Adding to history
	if(!history[letters]) history[letters] = {};
	history[letters][length.toString()] = uniq(results);

	return uniq(results);
}

console.log( solver("skjár", 3) || "Engin niðurstaða" );
console.log( solver("sjárk", 3) || "Engin niðurstaða" );

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

app.listen(3000, () => console.log('Listening on port 3000'));