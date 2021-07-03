const pg = require('pg');

const jsonfile = require('jsonfile');

//set all configuration into an OBJECT

const configs = {
	user: 'delontoh89',
	host: '127.0.0.1',
	database: 'nba_db',
	port: 5432,
};

// create a new instance of the client

const client = new pg.Client(configs);

// use jsonfile to retrieve player records in players.json

jsonfile.readFile('players.json', (err, obj) => {
	if(err) {
		console.error(err)
	}
	else {

		// start using client
		client.connect((err) => {
			if(err){
				console.log('error', err.message);	// error message if CONNECTION failed.
			}

			else {
				let playerList = obj['players']; // accessing array

				for(i=0; i<playerList.length; i++) {

					let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';
					
					let values = ['playerList[i].name, playerList[i].age, playerList[i].team, playerList[i].games, playerList[i].points'];

					client.query(queryString, values, (err, response) => {
						if(err) {
							console.log('query error', err.message);	// error message if QUERY failed.
						}

						else {
							console.log('result', response.rows[0]);
						};
					});	
				};
			};
		});
	};
});

