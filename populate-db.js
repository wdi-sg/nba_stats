const pg = require('pg');
const jsonfile = require('jsonfile');

const FILE = 'players.json';

// set all of the configuration in an object
const configs = {
  user: 'angtingsoon',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);


jsonfile.readFile(FILE, (err, obj) => {
	if (err) console.error(err);
	// obj is all the player records
	// what now?

	// start using your client

	client.connect((err) => {

	if (err) {
	console.log('error', err.message);
	}

	let player = obj.players;

	console.log(player.length);

	for(let i=0; i<player.length; i++) {

		let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';

		// your dynamic values go here
		let values = [player[i].name, player[i].age, player[i].team, player[i].games, player[i].points];

		client.query(queryString, values, (err, res) => {
			if (err) {
			  console.log('query error', err.message);
			} else {
			  console.log('result', res.rows);
			}

		return values = [];

		// the last query you make, close the connection.
			client.end();
		});
	}



	});

});


// // For further

// jsonfile.readFile(FILE, (err, obj) => {

// 	client.connect((err) => {
//     if (err) {
//         console.log('connect error', err.message);
//         return;
//     }
//     let queryStrings = [
//         "SELECT * FROM players WHERE team = 'NYK'",
//         "SELECT * FROM players WHERE team = 'IND' AND age < 26",
//         "SELECT * FROM players ORDER BY points ASC",
//         "SELECT * FROM players WHERE team = 'NYK' AND points > 1000",
//         "SELECT * FROM players WHERE team = 'CHI' AND points < 300",
//         "SELECT team FROM players WHERE points <= 2",
//         "SELECT AVG(age) FROM players"
//     ];

//     queryStrings.forEach( query => {
//         client.query(query, (err, res) => {
//             if (err) {
//                 console.log('query error', err.message);
//             } else {
//                 console.log(res);
//             }
//         });
//     })
// });


// });	
