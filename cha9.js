const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials('C:/Users/Smokey/Desktop/web2520/lab9/views')

app.set('view engine', 'hbs');
app.use(express.static('C:/Users/Smokey/Desktop/web2520/lab9'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('getPic', () => {
	request({
		url: 'https://jsonplaceholder.typicode.com/photos',
		json: true
	}, (error, response, body) => {
		console.log(2)
		return body[0].url

	});
	console.log(1)
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

app.use((request, response, next) => {
	var time = new Date().toString();
	//console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + "\n", (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
},(request, response, next) => {
	response.render("index.html");
});

hbs.registerHelper('challenge', (text) => {
	return text.toLowerCase();
})

// app.get('/', (request, response) => {
// 	response.send({
// 		name: 'Your name',
// 		school: [
// 			'BCIT',
// 			'SFU',
// 			'UBC'
// 		]
// 	});
// });

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello!',
		challenge_sentence: "THIS IS CHALLENGE 9'S ABOUT PAGE!!!!",
	});
});

app.get('/detail', (request, response) => {
	response.render('detail.hbs', {
		title: 'Detail page',
		year: new Date().getFullYear(),
		welcome: 'Hello again',
		challenge_sentence: "THIS IS CHALLENGE 9'S DETAIL PAGE!!!!",
	})
})

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})





app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});