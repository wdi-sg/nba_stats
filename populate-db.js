const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'stonefruit',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// start using your client


  jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);
    // obj is all the player records
    // what now?

    client.connect((err) => {
    if (err) {
      console.log('error', err.message);
    }
    let players = obj.players;
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      let playerName = player.name;
      let playerAge = player.age;
      let playerTeam = player.team;
      let playerGames = player.games;
      let playerPoints = player.points;
      // your queries go here
      let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES( $1, $2, $3, $4, $5)';

      // your dynamic values go here
      let values = [playerName, playerAge, 
      playerTeam, playerGames, playerPoints];
      //console.log(values);
      //console.log("before query");
      client.query(queryString, values, (err, res) => {
        console.log("after query");
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log('result', res.rows[0]);
        }

        // the last query you make, close the connection.
        //client.end();
      });
      //console.log("enq");
    }
  });
});
