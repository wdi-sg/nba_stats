const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'saywan',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// obj is all the player records
jsonfile.readFile('players.json', (err, obj) => {

  	console.log(obj.players[0]);

  	// start using your client
	client.connect((err) => {

  		if (err) {
    	console.log('error', err.message);
  		} else {

  			let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';
  			let array = [];
  			let player = obj.players;
  			var values = array.map( player => {
  				return [player.name, player.age, player.team, player.games, player.points];
  			});
  			console.log(values);
  
  			client.query(queryString, values, (err, res) => {
    			if (err) {
      				console.log('query error', err.message);
    			} else {
      				console.log('added');
    			}
    
    		// the last query you make, close the connection.
    		client.end();
  			});
  		}
	});

});