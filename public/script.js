mixpanel.track("Page load");

let currentQuery = { letters: "", length: 0 };
const spinner = document.querySelector('.spinner');

const submitForm = () => {
	event.preventDefault();
	
	const query = {
		letters: document.form.letters.value,
		length: document.form.length.value
	}
	if(currentQuery.letters == query.letters && currentQuery.length == query.length) return;
	setSpinner(true);
	currentQuery = query;
	
	mixpanel.track("Solving", query);
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

const setSpinner = status => spinner.style.display = status ? "block" : "";
const fillWithAnswers = (answers) => {
	setSpinner(false);
	let ans = '';
	answers.forEach(answer => ans += `<li>${answer}</li>`); 
	document.querySelector('.content').innerHTML = ans;
}