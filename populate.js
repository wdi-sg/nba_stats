const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'fupuchu',
  host: '127.0.0.1',
  database: 'nbastats',
  port: 5432
};

// create a new instance of the client
const client = new pg.Client(configs);

// ONLY RUN THIS ONCE TO POPULATE DATABASE

client.connect((err) => {
  //error message
  if (err){
    console.log("Can't Connect to Database!");
  }

  jsonfile.readFile('players.json', (err, obj) => {
    //error message
    if (err) {
      console.log(err);
    }

    let players = obj.players

    players.forEach((x) => {
      let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1,$2,$3,$4,$5)'
      let values = [x.name, x.age, x.team, x.games, x.points]
      client.query(queryString, values, (err, result) => {
        if (err){
          console.log("ERROR!!");
        }else {
          console.log(result);
        }
      })
    })
  })
})
