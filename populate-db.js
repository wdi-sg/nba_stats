// include postgres library
const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'samywamy',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);



// jsonfile.readFile('players.json', (err, obj) => {
// 	if (err) {
// 		console.error(err);
// 	}

// 	client.connect((err) => {
// 		if (err) {
// 			console.log("An error occured", err.message);

// 		} else {
// 			let players = obj.players;
			
// 			for (var i = 0; i < players.length; i++) {
// 				let indivPlayer = players[i];
// 				let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';
// 				let values = [indivPlayer.name, indivPlayer.age, indivPlayer.team, indivPlayer.games, indivPlayer.points];

// 				client.query(queryString, values, (err, result) => {
// 					if (err) {
// 					  console.log('query error', err.message);
// 					} else {
// 					  console.log(result);
// 					}
// 				});
// 			}
// 		}	
// 	});
// });


client.connect((err) => {
	if (err) {
		console.log("An error occured", err.message);

	} else {
		let queryStrings = [
			"SELECT * FROM players WHERE team = 'NYK'", 
			"SELECT * FROM players WHERE team = 'IND' AND age < 26",
			"SELECT * FROM players ORDER BY points ASC",
			"SELECT * FROM players WHERE team = 'NYK' AND points > 1000",
			"SELECT * FROM players WHERE team = 'CHI' AND points < 300",
			"SELECT team WHERE points <= 2",
			"SELECT AVG(age) FROM players"
		];

		queryStrings.forEach(query => {
			client.query(query, (err, result) => {
				if (err) {
					console.log('query error', err.message);
				} else {
					console.log(result);
				}
			});
		});
	}
});

