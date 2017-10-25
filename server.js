const express = require('express');
const app = express();
/* Database connection */
const { Client } = require('pg');
// const DATABASE_URL=$(heroku config:get DATABASE_URL -a jinhonodeex2) windows ;
// console.log(DATABASE_URL);
// const client = new Client({
//   connectionString: "postgres://fovkilwnqthorq:30a7ab797aaf574bc678303db7ce94d67d46fa8e8cc8f13d67ad75ddee38d0dd@ec2-79-125-125-97.eu-west-1.compute.amazonaws.com:5432/d7pc1qoteg913d",
//   ssl: true,
// });
// client.connect();
/* Using public folder */
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));
/* Example of use */
app.get('/', function (req, res) {
	const DATABASE_URL=$(heroku config:get DATABASE_URL -a jinhonodeex2);
	// console.log(DATABASE_URL);
});
app.post('/another', function (req, res) {
	res.redirect('another.html');
});
/*  "/api/user"
 *   GET : find all users
 *   POST : create a new user 
 */
app.get('/api/user', function (req, res) {
	client.query('SELECT idA FROM account;', (err, res) => {
		if (err) throw err;
		for (let row of res.rows) {
			console.log(JSON.stringify(row));
		}
		client.end();
	});
});
app.post('/api/user', function (req, res) {});
/*  "/api/user/:id"
 *   GET : find a single user by ID
 *   PUT : update the user
 *   DELETE : delete a user by ID
 */
app.get('/api/user/:id', function (req, res) {});
app.put('/api/user/:id', function (req, res) {});
app.delete('/api/user/:id', function (req, res) {});
/*  "/api/presentation/:id"
 *   GET : find a single presentation by ID
 *   PUT : update the presentation
 *   DELETE : delete a presentation by ID
 */
app.get('/api/presentation/:id', function (req, res) {});
app.put('/api/presentation/:id', function (req, res) {});
app.delete('/api/presentation/:id', function (req, res) {});
/* Default adress */
/* Listening PORT */
app.listen(app.get('port'), function () {
	console.log('My app listening on port 8080!');
});