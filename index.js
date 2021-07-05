//boilerplate code to get all the npms working
const pg = require('pg');
const jsonfile = require('jsonfile');
const configs = {
  user: 'meraj',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};
const client = new pg.Client(configs);


// readFile code that goes through the json file and pushes things to a database after it's executed
jsonfile.readFile('players.json', (err, obj) => {
  if (err) console.error(err);
	
	// var jeff=	(obj.players[0].name.toString());
	console.log([obj.players[10].name.toString(), obj.players[10].age.toString(), obj.players[10].team.toString(), obj.players[10].games.toString(), obj.players[10].points.toString()]);

//connects to the database and enters things
	client.connect((err) => {

	  if (err) {
	    console.log('error', err.message);
	  }

		let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *'

		//loop that goes through each of the players and saves them in the db
		for (let i=0; i<obj.players.length; i++) {
		
		  let values = [obj.players[i].name.toString(), obj.players[i].age.toString(), obj.players[i].team.toString(), obj.players[i].games.toString(), obj.players[i].points.toString()];

		  client.query(queryString, values, (err, res) => {
		    if (err) {
		      console.log('query error', err.message);
		    } else {
		      console.log('result', res.rows[i]);
		    }
		  }); 
		}
	});
});