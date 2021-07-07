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


  // read players.json
  jsonfile.readFile('players.json', (err, obj) => {
    if (err) {
    console.error(err);
  }

  const players = obj.players;

  players.forEach(el => {


    // your queries go here
      let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';


    // your dynamic values go here
    let values = [el.name, el.age, el.team, el.games, el.points];

    client.query(queryString, values, (err, res) => {
      if (err) {
        console.log('query error', err.message);
      } else {
        console.log('result', res.rows[0]);
      }
        
    });

  })

  });

});