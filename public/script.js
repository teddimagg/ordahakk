let currentQuery = { letters: "", length: 0 };

const submitForm = () => {
	event.preventDefault();
	currentQuery
	
	const query = {
		letters: document.form.letters.value,
		length: document.form.length.value
	}
	if(currentQuery.letters == query.letters && currentQuery.length == query.length) return;
	currentQuery = query;
	
	fetch('/solve', {
		method: 'post',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(query)
	})
	.then( res => res.json() )
	.then( res => fillWithAnswers(res) );

}

const fillWithAnswers = (answers) => {
	let ans = `<ul>`; 
	answers.forEach(answer => ans += `<li>${answer}</li>`); 
	ans += `</ul>`;
	document.querySelector('.answers').innerHTML = ans;
}