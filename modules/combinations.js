const getCombinations = (chars, length) => {
	let result = [];
	const f = function(prefix, chars) {
		for (let i = 0; i < chars.length; i++) {
			if((prefix + chars[i]).length == length){
				result.push(prefix + chars[i]);
			}
			f(prefix + chars[i], chars.slice(i + 1));
		}
	}
	f('', chars);
	return result;
}

module.exports = getCombinations;