const pg = require('pg');
const jsonfile = require('jsonfile');
const async = require('async');

// set all of the configuration in an object
const configs = {
  user: 'fupuchu',
  host: '127.0.0.1',
  database: 'nbastats',
  port: 5432
};

const client = new pg.Client(configs);

client.connect((err) =>{
  if(err){
    console.log("Unable to Connect!");
  }
  let queryObj = {
    firstQuery : 'SELECT * FROM players WHERE team = \'NYK\';',
    secondQuery : 'SELECT * FROM players WHERE team = \'IND\' AND AGE <= 26;',
    thirdQuery : 'SELECT * FROM players ORDER BY points ASC;'
  }
  //https://caolan.github.io/async/docs.html#eachOf
  // works like forEach?? see link above for async info
  async.forEachOf(queryObj, (value, key, callback) => {
    client.query(value, (err, result) => {
      if (err) {
        console.log("Cannot Display Data");
      } else {
        //i don't have a screen big enough to show all data, just remove .length to see
        console.log(key + " Total: " +result.rows.length);
      }
    })
    callback();
  })
})
