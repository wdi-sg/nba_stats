const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'angkiki',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================
// jsonfile.readFile('players.json', (err, obj) => {
//   if (err) console.error(err);
//
//   client.connect((err) => {
//
//     if (err) {
//         console.log('error', err.message);
//     } else {
//         const PLAYER_ARRAY = obj.players;
//
//         for (let i = 0; i < PLAYER_ARRAY.length; i++) {
//           let playerRecords = PLAYER_ARRAY[i];
//           let queryString = "INSERT INTO players (name, age, team, games, points) VALUES($1, $2, $3, $4, $5)";
//           let value = [playerRecords.name, playerRecords.age, playerRecords.team, playerRecords.games, playerRecords.points];
//
//           client.query(queryString, value, (err, res) => {
//
//             if (err) {
//                 console.log("Query Error: ", err.message);
//             } else {
//                 if (i === PLAYER_ARRAY.length - 1) {
//                     client.end();
//                 }
//             }
//
//           })
//         }
//     }
//   });
//
// });
// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================

client.connect( (err) => {

  if (err) {
      console.log('error', err.message);
  } else {

      // All columns for all players from the New York Knicks (NYK)
      let q1 = "SELECT * FROM players WHERE team='NYK'";
      client.query(q1, (err, res) => {
        if (err) {
            console.log("Query Error: ", err.message);
        } else {
            res.rows.forEach( (player) => {
              console.log(player);
            })
        }
      })

      // All columns for all players from the Indiana Packers (IND) who are under 26 years old
      let q2 = "SELECT * FROM players WHERE team='IND' AND age < '26'";
      client.query(q2, (err, res) => {
        if (err) {
            console.log("Query Error: ", err.message);
        } else {
            res.rows.forEach( (player) => {
              console.log(player);
            })
        }
      })

      // All columns for all players, ordered from least points scored to most points scored
      let q3 = "SELECT * FROM players ORDER BY points"
      client.query(q3, (err, res) => {
        if (err) {
            console.log("Query Error: ", err.message);
        } else {
            res.rows.forEach( (player) => {
              console.log(player);
            })
        }
      })

      // All columns for all players on the New York Knicks who scored over 1000 points
      // All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
      // Select team column only for players that scored 2 or less points in a game.
      // The average age for all players https://www.w3schools.com/sql/sql_count_avg_sum.asp
      const SQL_QUERY_ARRAY = [
        "SELECT * FROM players WHERE team='NYK' AND points > 1000",
        "SELECT * FROM players WHERE team = 'CHI' AND points < 300",
        "SELECT team FROM players WHERE points < 3",
        "SELECT AVG(age) FROM players"
      ]

      for (let i = 0; i < SQL_QUERY_ARRAY.length; i++) {
        let query = SQL_QUERY_ARRAY[i];

        client.query(query, (err, res) => {
          if (err) {
              console.log("Query Error: ", err.message);
          } else {
              res.rows.forEach( (player) => {
                console.log(player);
              })

              if (i === SQL_QUERY_ARRAY.length - 1) {
                client.end();
              }
          }
        })
      }
  }

});
