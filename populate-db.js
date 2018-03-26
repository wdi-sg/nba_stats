// Require the libraries
const pg = require('pg');
const jsonfile = require('jsonfile');
const FILE = 'players.json';

// set all of the configuration in an object
const configs = {
  user: 'postgres',           // Name of the user that is linked to the database
  host: '127.0.0.1',          // Where the database is hosted
  database: 'nba_db',         // Name of the database
  port: 5432,                 // Port number database is connected to
  password: 'edmund92chow'    // Password to connect to the database
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile(FILE, (err, obj) => {
  if (err) console.error(err);

  // Iterate through each player object
  obj.players.forEach((player) => {
    // start using your client
    client.connect((err) => {

      if (err) {
        console.log('error => ', err.message);
      }
      else{
        console.log("Successful connection...");
      }

      // INSERT query string to populate players table with name, age, team, games and points
      let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';

      // Create a new values array for each object in players to be inserted
      let values = [];

      // Push the attribute values of each player object into the values array
      values.push(player.name);
      values.push(player.age);
      values.push(player.team);
      values.push(player.games);
      values.push(player.points);

      // Populating the data into the players table
      client.query(queryString, values, (err, res) => {
        if (err) {
          console.log('query error =>', err.message);
        } else {
          console.log("Successful populating of result...");
        }
      });
    });
  });
  // the last query you make, close the connection.
  // client.end();
});
