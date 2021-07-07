const pg = require("pg");
const jsonfile = require("jsonfile");

// set all of the configuration in an object
const configs = {
  user: "mervyn",
  host: "127.0.0.1",
  database: "nba_db",
  port: 5432
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile("players.json", (err, obj) => {
  if (err) console.error(err);
  // obj is all the player records
  // what now?
  client.connect(pgErr => {
    if (pgErr) {
      console.log("error", err.message);
    }
    let data = obj.players;
    // your queries go here
    for (i in data) {
      let queryString =
        "INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      // your dynamic values go here
      let values = [
        data[i].name,
        data[i].age,
        data[i].team,
        data[i].games,
        data[i].points
      ];
      console.log(values);
      client.query(queryString, values, (queryErr, res) => {
        if (queryErr) {
          console.log("query error", queryErr.message);
        } else {
          console.log("result", res.rows[0]);
        }
      });
    }
    client.end();
  });
});
