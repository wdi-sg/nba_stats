const pg = require('pg');
const jsonfile = require('jsonfile');

const config = {
  user: 'cj',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(config);

client.connect((err) => {
  if (err) {
    console.log("connection error", err.message);
  }

  jsonfile.readFile("players.json", (err, obj) => {
    if (err) {
      console.error(err);
    }

    obj.players.forEach((player) => {
      let values = [];
      values.push(player.name, player.age, player.team, player.games, player.points);

      let query = "insert into players (name, age, team, games, points) values ($1, $2, $3, $4, $5);";

      client.query(query, values, (err, res) => {
        if (err) {
          console.log("query error", err.message);
        } else {
          console.log(values[1], "added");
        }
      });
    });
  });
// client.end();
});
