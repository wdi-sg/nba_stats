const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432
};

const FILE = 'players.json';

//create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile(FILE, (err, obj) => {
    if (err) console.error(err);
    // start using your client

    client.connect((err) => {

        if (err) {
            console.log('error', err.message);
        }

        // your queries go here
        let data = obj.players;
        for (let i = 0; i < data.length; i++) {
            let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';

            // your dynamic values go here
            let values = [data[i].name, data[i].age, data[i].team, data[i].games, data[i].points];

            client.query(queryString, values, (err, res) => {
                if (err) {
                    console.log('query error', err.message);
                } else {
                    console.log('result', res.rows[0]);
                }

                if (data[i] === data[data.length - 1]) {
                    // the last query you make, close the connection.
                    client.end();
                }

            });
        }

    });
});