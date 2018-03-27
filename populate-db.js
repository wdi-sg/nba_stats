const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
	user: 'chuazhengwin',
	host: '127.0.0.1',
	database: 'nba_db',
	port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
	if (err) console.error(err);
  // console.log(obj);
  // obj is all the player records
  // what now?
  client.connect((err) => {

  	if (err) {
  		console.log('error', err.message);
  	}
  	console.log(obj.players[0].name);
	  // your queries go here
	  // let queryString = 'INSERT INTO players (name, age, team, games , points) VALUES ( $1, $2, $3, $4, $5)';

	  // your dynamic values go here
	  let mainValues = [];
	  let count = 0;

	  for(let i = 0; i < obj.players.length; i++){
	  	let queryString = 'INSERT INTO players (name, age, team, games , points) VALUES ( $1, $2, $3, $4, $5)';
	  	let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points]; //,["Arron Afflalo", 26, "DEN", 62, 943]
	  	mainValues.push(values);
	  	console.log(mainValues[i]);

	  	// console.log(mainValues[i]);

	  	client.query(queryString, mainValues[i], (err, res) => {	
	  		if (err) {
	  			console.log('query error', err.message);
	  		} else {
	  			console.log('result', res.rows[0]);
	  		}
		    // the last query you make, close the connection.
		    count++
		    if(count === obj.players.length){
		    	client.end();
		    }

		});
	  	
	  }


	});

});

// start using your client

// client.connect((err) => {

//   if (err) {
//     console.log('error', err.message);
//   }

//   // your queries go here
//   let queryString = 'INSERT INTO players (name, age, team, games , points) VALUES ( $1, $2, $3, $4, $5)';

//   // your dynamic values go here
//   let values = ["Jeff Adrien", 25, "HOU", 8, 21],["Arron Afflalo", 26, "DEN", 62, 943];

//   client.query(queryString, values, (err, res) => {
//     if (err) {
//       console.log('query error', err.message);
//     } else {
//       console.log('result', res.rows[0]);
//     }

//     // the last query you make, close the connection.
//     client.end();
//   });
// });









