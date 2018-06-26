// Require the libraries
const pg = require('pg');
const SQL = require("sql-statement").Pg; // PostgreSQL version

// set all of the configuration in an object
const configs = {
  user: 'postgres', // Name of the user that is linked to the database
  host: '127.0.0.1', // Where the database is hosted
  database: 'nba_db', // Name of the database
  port: 5432, // Port number database is connected to
  password: 'edmund92chow' // Password to connect to the database
};

// create a new instance of the client
const client = new pg.Client(configs);

// start using your client
client.connect((err) => {
  if (err) {
    console.log('error', err.message);
  } else {
    console.log("Successfully connected...");
  }

  // ------------- CHOOSE ONE TO RUN AND COMMENT THE REST OF THE SQL-------------------------------
  // // All columns for all players from the New York Knicks (NYK) sql command
  // let sql = new SQL("SELECT * FROM players WHERE team = 'NYK'");
  //
  // // All columns for all players from the Indiana Packers (IND) who are under 26 years old sql command
  // let sql = new SQL("SELECT * FROM players WHERE team = 'IND' AND age < 26");
  //
  // // All columns for all players, ordered from least points scored to most points scored sql command
  // let sql = new SQL("SELECT * FROM players ORDER BY points ASC");
  //
  // // Name and Points per game (points/games), for the players with the top 20 points per game sql command
  // let sql = new SQL("SELECT name, points FROM players WHERE points/games = 20");
  //
  // // The average age for all players sql command
  // let sql = new SQL("SELECT AVG(age) FROM players");
  //
  // // The average age for all players on the Oklahoma City Thunder (OKC) sql command
  // let sql = new SQL("SELECT AVG(age) FROM players WHERE team = 'OKC'");
  //
  // // The average age for all players who played more than 40 games sql command
  // let sql = new SQL("SELECT AVG(age) FROM players WHERE games > 40");
  //
  // // The team and total points scored from all players on that team (team points), ordered from most team points to least sql command
  // let sql = new SQL("SELECT team, SUM(points) FROM players GROUP BY team ORDER BY SUM(points) DESC");
  //
  // // Age and the average points per game for that age, ordered from youngest to oldest sql command
  // let sql = new SQL("SELECT age, AVG(points) as average_points FROM players GROUP BY age ORDER BY age ASC");

  // Team and the number of players who score above 12 points per game on that team, ordered from most to least sql command
  let sql = new SQL("SELECT team, COUNT(name) as players_num FROM players WHERE points/games > 12 GROUP BY team ORDER BY players_num DESC");
  // ------------- CHOOSE ONE TO RUN AND COMMENT THE REST OF THE SQL-------------------------------

  client.query(sql + "", function(err, rows) {
    if (err) return console.warn(err);
    else {
      console.log('result', rows);
    }

    // the last query you make, close the connection.
    client.end();
  });
});
