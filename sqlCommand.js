/**
 * ===================================
 * Connecting to DB
 * ===================================
 */
const pg = require('pg');
const configs = {
  user: 'wenhao',
  host: 'localhost',
  database: 'nba_db',
  port: 5432,
};
const client = new pg.Client(configs)

/**
 * ===================================
 * Using the client in app
 * ===================================
 */
client.connect((err) => {

  if( err ){
    console.log( "error", err.message );
  }

let text = process.argv[2];

  client.query(text, (err, res) => {
    if (err) {
      console.log("query error", err.message);
    } else {
      for(let i =0; i<res.rows.length;i++){
      	console.log(res.rows[i]);
      }
    }
  });

});