const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
    user: 'drillaxholic',
    host: '127.0.0.1',
    database: 'homeWork13',
    port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================
jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);
    // start using your client
    client.connect((err) => {
        if (err) {
            console.log('error', err.message);
        } else {
            const players = obj.players;
            players.forEach((player) => {
                // your queries go here
                let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';
                // your dynamic values go here
                let values = [player.name, player.age, player.team, player.games, player.points];
                client.query(queryString, values, (err, res) => {
                    if (err) {
                        console.log('query error', err.message);
                    } else {
                        if (player === players.length - 1) {
                            client.end();
                        }
                    }
                });
            });
        };
    });
});
// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================

// start using your client

client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }

  // your queries go here
  let queryString = '';

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
