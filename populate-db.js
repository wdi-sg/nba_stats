const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'jianhaotan',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);
const pool = new pg.Pool(configs);

const playerFile = 'players.json';

jsonfile.readFile(playerFile, (err, obj) => {
  if (err) {
    console.log(err);
  }

  // let values = [];
  let playersArr = obj.players;
  let numOfPlayers = playersArr.length;
  // playersArr.forEach(player => {
  //   let playerStats = [];
  //   for (let props in player) {
  //     playerStats.push(player[props]);
  //   }
  //   values.push(playerStats);
  // });


  // console.log(values);
  client.connect(err => {
    if (err) {
      console.log("error", err.message);
    }

    // your queries go here
    let queryString = "INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)";

    // your dynamic values go here
    let values = [];
    let count = 1;

    playersArr.forEach(player => {
      count++;
      let playerStats = [];
      for (let props in player) {
        playerStats.push(player[props]);
      }
      values.push(playerStats);
      client.query(queryString, playerStats, (err, res) => {
        if (err) {
          console.log(`query error ${err.message}`);
          // client.end();
        } else {
          console.log(`result is ${res.rows[0]}`);
          if (count > numOfPlayers) {
            client.end();
          }
        }
      });
      // let playerStats = [];
      // for (let props in player) {
      //   playerStats.push(player[props]);
      // }
      // values.push(playerStats);
      // client.query(queryString, playerStats, (err, res) => {
      //   if (err) {
      //     console.log(`query error ${err.message}`);
      //     // client.end();
      //   }
      //   else {
      //     console.log(`result is ${res.rows[0]}`);
      //   }
      // });
    });
  });
})