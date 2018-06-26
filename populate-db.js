const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432
};

const client = new pg.Client(configs);


client.connect((err) => {
  if (err) {
    console.log('error', err.message);
  }

  jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);
    counter = 0;

    obj.players.forEach((player) => {
      let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5);';
      let values = [player.name, player.age, player.team, player.games, player.points];

      client.query(queryString, values, (err, res) => {
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log('result', res.rows[0]);
          counter++;
          if (counter == obj.players.length) {
            client.end();
          }
        }
      })
    })
  })
})