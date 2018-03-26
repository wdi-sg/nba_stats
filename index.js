const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
	user: 'smu',
	host: '127.0.0.1',
	database: 'nba_db',
	port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

client.connect((err) => {
	if (err) {
		console.log('error', err.message);
	}

	jsonfile.readFile('players.json', (err, obj) => {
		if (err) console.error(err);
		// console.log( obj.players.length);
		for (var i=0; i<obj.players.length; i++){

			let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5);';

			let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];

			console.log(values);

			client.query(queryString, values, (err, res) => {
				if (err) {
					console.log('query error', err.message);
				} 
				else {
					console.log('result', res.rows[0]);
				}
			})
		};
	});
});


