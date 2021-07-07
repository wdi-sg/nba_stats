const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'elvera',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
    if (err) {
        console.error(err);
        return;
    }

    client.connect((err) => {
        if (err) {
            console.log('connect error', err.message);
            return;
        }
        let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';
        let values;
        obj.players.forEach( player => {
            values = [player.name, player.age, player.team, player.games, player.points];
            client.query(queryString, values, (err, res) => {
                if (err) {
                    console.log('query error', err.message);
                } else {
                    console.log('successfully added player');
                }
            });
        })
    });
});