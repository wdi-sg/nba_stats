// include postgres library
const pg = require('pg');
const jsonfile = require('jsonfile');


// include configs
const configs = {
  user: 'acechua',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};


// create client
const client = new pg.Client(configs);


// start using your client
client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }

  // your queries go here

  // 1. All columns for all players from the New York Knicks (NYK)
  let qs1 = "SELECT * FROM players WHERE team = 'NYK'";

  // 2. All columns for all players from the Indiana Packers (IND) who are under 26 years old
  let qs2 = "SELECT * FROM players WHERE team = 'IND' AND age < 26";

  // 3. All columns for all players, ordered from least points scored to most points scored
  let qs3 = "SELECT * FROM players ORDER BY points ASC";

  // 4. All columns for all players on the New York Knicks who scored over 1000 points
  let qs4 = "SELECT * FROM players WHERE team = 'NYK' AND points > 1000";

  // 5. All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
  let qs5 = "SELECT * FROM players WHERE team = 'CHI' AND points < 300";

  // 6. Select team column only for players that scored 2 or less points in a game.
  let qs6 = "SELECT team FROM players WHERE points <= 2";

  // 7. The average age for all players
  let qs7 = "SELECT AVG(age) FROM players";

  let qs = [qs1, qs2, qs3, qs4, qs5, qs6, qs7];

  let callBack = (err, res) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      console.log('result', res.rows);
    }
  }

  // client.query(qs1, callBack);
  // client.query(qs2, callBack);
  // client.query(qs3, callBack);
  // client.query(qs4, callBack);
  // client.query(qs5, callBack);
  // client.query(qs6, callBack);
  // client.query(qs7, callBack);

  qs.forEach(el => client.query(el, callBack));

});