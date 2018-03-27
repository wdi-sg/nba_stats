// db library
const jsonfile = require('jsonfile');
const pg = require('pg');

const FILE = 'players.json';

// set all of the configuration in an object
const configs = {
    user: 'jerrypan',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// obj is all the player records
jsonfile.readFile('players.json', (err, obj) => {
    if (err) console.error(err);

    // start using database client
    client.connect((err) => {

        if (err) {
            console.log('error', err.message);
        }

        // access the players in players.json
        let nbaPlayer = obj.players;

        // loop through all the players
        for (let i=0; i<nbaPlayer.length; i++) {

            // the array with all the players' details
            const values = [];

            // the dynamic values go here
            values.push(nbaPlayer[i].name, nbaPlayer[i].age, nbaPlayer[i].team, nbaPlayer[i].games, nbaPlayer[i].points);

            // the queries go here
            let queryString = 'INSERT INTO players(name, age, team, games, points) VALUES($1, $2, $3, $4, $5)';

            // adding all the players' details to database
            client.query(queryString, values, (err, res) => {
                if (err) {
                    console.log('query error', err.message);
                } else {
                    console.log('added', values[0]);
                }
            });
        };
    });
});