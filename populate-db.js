const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
      user: 'postgres',
      host: '127.0.0.1',
      database: 'nba_db',
      port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

//populate nba_db with information from players.json

//connect to the database. reading jsonfile then establishing connections later would mean that multiple connections must be established
client.connect((err) => {
      //if error log message
      if (err) {
            console.log('error', err.message);
      }
      //read the json file
      jsonfile.readFile("players.json", (err2, obj) => {
            if (err2) console.error(err2)
            for (let i = 0; i < obj.players.length; i++) {

                  // your queries go here
                  let queryString = "INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)";

                  // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
                  let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];
                  //send the query to the database
                  client.query(queryString, values, (err3, res) => {
                        if (err3) {
                              //if error, send msg
                              console.log('query error', err3.message);
                        } else {
                              //else show the result of the first row
                              console.log('result', res.rows[0]);
                        }


                  });
                  //add a counter, if all values of i has been iterated through, disconnect.
                  counter++;
                  if (counter == obj.players.length) {
                        client.end();
                  };
            };
      });
});