const pg = require('pg');
const jsonfile = require('jsonfile');
const FILE = 'players.json';

const configs = {
  user: 'jodich',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

const client = new pg.Client(configs);

// // reads the jsonfile
// jsonfile.readFile(FILE, (err, obj) => {
	
// 	let players = obj.players
	
// 	if (err) {
// 		console.log('error', err.message);
// 	}

// 	// what to do when connected
// 	var connectCallback = (err) => {
// 		if (err) {
// 			console.log('error', err.message);
// 		}

// 		// going through each player in the players array
// 		players.forEach((player) => {

// 			// setting the variables to put in the values
// 			// probably can use for..in method
// 			let name = player.name;
// 			let age = player.age;
// 			let team = player.team;
// 			let games = player.games;
// 			let points = player.points;

// 			// queries goes here
// 			let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';

// 			// values go here, the value will keep changing as it goes through the players array
// 			let values = [name, age, team, games, points];

// 			// sends the query
// 			client.query(queryString, values, (err, res) => {

// 				if (err) {
// 					console.log('query error', err.message);
// 				} else {
// 					console.log('result', res.rows[0]);
// 				}

// 			});		 
// 		});
// 	};

// 	client.connect(connectCallback);
// });



// ============================ FURTHER ============================

let queriesArr = [
"SELECT * FROM players WHERE team = 'NYK'",
"SELECT * FROM players WHERE team = 'IND' AND age < 26",
"SELECT * FROM players ORDER BY points ASC"
];

var displayQueries = () => {

	queriesArr.forEach((query) => {

		// queries goes here
		let queryString = query;

		// sends the query
		client.query(queryString, (err, res) => {

			if (err) {
				console.log('query error', err.message);
			} else {
				console.log('result', res.rows);
			}

		});	
	});
};

client.connect(displayQueries);





