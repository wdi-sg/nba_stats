const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = "postgres://postgres:asdzxc@localhost:5432/nba_db"

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
  if (err) console.error(err);
  // obj is all the player records
  // what now?
// start using your client

client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }
  let players = obj.players 
for(let i=0; i< players.length; i++){
  // your queries go here

  let queryString = "insert into players (name ,age ,team ,games ,points) values ('"+ players[i].name.replace(/'/g,"\'\'") +"','"+ players[i].age +"','"+ players[i].team +"','"+ players[i].games +"','"+ players[i].points +"');";
console.log(queryString)
  client.query(queryString,  (err, res) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      console.log('result', res.command);
    }
        if(i == players.length -1) {client.end();}

 });
}
    // the last query you make, close the connection.
  });
});

