const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
    user: 'julian',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
};

const client = new pg.Client(configs);

client.connect((err, result) => {
  if( err ){
    console.log( "error", err.message );
  }
  client.query(text, values, (err, result) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      console.log("result", res.rows[0]);
    }
  });
});

jsonfile.readFile('players.json', (err, obj) => {
    if (err), console.error(err);
    
})