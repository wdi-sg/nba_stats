const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'root',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);


//Use jsonfile to get the player records

jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);
    // console.log(obj);
    // obj is all the player records
    // what now?
    client.connect((err) => {
        if (err) {
            console.log('error',err.message);
        }
        console.log(obj.players[0].name);

        let allVals = [];

        for (let i = 0; i < obj.players.length; i++) {
            let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4 ,$5)';
            let allVals = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];
            console.log(allVals[i])

                
        
            client.query(queryString, allVals[i], (err, res) => {
            if (err) {
            console.log('query error', err.message);
            } else {
            console.log('result', res.rows[0]);
            }
            
            // the last query you make, close the connection.
            if (i === obj.players.length - 1) {
                client.end();
            }
            })
        }
    }
})