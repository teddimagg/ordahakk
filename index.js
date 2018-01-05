const read = require('read-file');
const getCombinations = require('./modules/combinations.js');
let buffer = read.sync('icelandic.txt').toString().split("\n");

const letters = Array.from("skjár");
const length = 4;
const combinations = getCombinations(letters, length);

let history = [];

let uniq = a => [...new Set(a)];
let remove = (array, element) => array.splice(array.indexOf(element), 1);

let results = [];

for(word of buffer){
	if(word.length == length){
		const w = word.toLowerCase();
		for(comb of combinations){
			let valid = true;
			
			let tempWord = Array.from(w);
			
			for(let i = 0; i < length; i++){
				(tempWord.includes(comb[i])) ? remove(tempWord, comb[i]) : valid = false;
			}

			if(valid) results.push(w);
		}
	}
}
console.log(uniq(results));

console.log('it has been read');