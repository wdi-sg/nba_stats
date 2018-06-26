const pg = require('pg');
const jsonfile = require('jsonfile');

const config = {
  user: 'cj',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(config);

// trying out promises

client.connect((err) => {
  if (err) {
    console.log("connection error", err.message);
  }
  client.query("select * from players where team='NYK';")
  .then((res) => {
    console.log("1", res.rows);
    client.query("select * from players where team='LAL';")
  }).then((res) => {
    console.log("2", res.rows);
  });
});
