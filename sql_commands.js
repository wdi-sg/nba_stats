const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432
};

const client = new pg.Client(configs);


client.connect((err) => {
  if (err) {
    console.log('error', err.message);
  }

  jsonfile.readFile('sql_commands.json', (err, obj) => {
    if (err) console.error(err);
    counter = 0;
    obj.commands.forEach((command) => {
      let queryString = command.command

      client.query(queryString, (err, res) => {
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log("Question " + command.question + " first row result: ");
          console.log(res.rows[0]);
          counter++;
          if (counter == obj.commands.length) {
            client.end();
          }
        }
      })
    })
  })
})