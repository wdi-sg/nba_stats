const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'alethea',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};


// create a new instance of the client
const client = new pg.Client(configs);

// start using your client
client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }

  jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);
    // obj is all the player records
    // what now?
    console.log("reading players.json");

    // INSERT INTO players (name, age, team, games, points) VALUES('Cars', 'a movie', 9);
    for (var i=0;i<obj.players.length;i++) {
      var player = obj.players[i];
      // your queries go here
      let queryString = "INSERT INTO players (name, age, team, games, points) VALUES($1, $2, $3, $4, $5);"
      // your dynamic values go here
      let values = [player.name, player.age, player.team, player.games, player.points];

      client.query(queryString, values, (err, res) => {
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log('result', res.rows[0]);
        }
        // the last query you make, close the connection.
        // client.end();
      });
    }
  });

});

// client.end();
