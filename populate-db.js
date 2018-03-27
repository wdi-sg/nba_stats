const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'tanenkai',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
  if (err) console.error(err);
  // obj is all the player records
  // what now?
  var object = players[i];
  for (var i = 0; i < players.length; 1++) {
  	console.log(object.players);
  }
});

// start using your client

client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }

  // your queries go here
  let queryString = 'select * from players';

  // your dynamic values go here
  let values = [];

  client.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      console.log('result', res.rows[0]);
    }
    
    // the last query you make, close the connection.
    client.end();
  });
});