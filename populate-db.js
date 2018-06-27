const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'Jay',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);


jsonfile.readFile('players.json', (JSONerr, obj) => {
	if (JSONerr) console.error(JSONerr);

	client.connect((PGerr) => {
		if (PGerr) {
			console.log('error', PGerr.message);
		}

	let data = obj.players;
	// your dynamic values go here


	for (let i = 0; i < data.length; i++) {
	  	// your queries go here
	  	let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';
	  	let values = [data[i].name, data[i].age, data[i].team, data[i].games, data[i].points];
	  	console.log(values);

	  	client.query(queryString, values, (err, res) => {
	  		if (err) {
	  			console.log('query error', err.message);
	  		} else {
	  			console.log('Inserted!' + i);
	  		}


	  	});
	  };
	  		    // the last query you make, close the connection.
	  		    // client.end();
	  });
});