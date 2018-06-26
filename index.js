const pg = require('pg');

// set all of the configuration in an object
const configs = {
  user: 'elvera',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

client.connect((err) => {
    if (err) {
        console.log('connect error', err.message);
        return;
    }
    let queryStrings = [
        "SELECT * FROM players WHERE team = 'NYK'",
        "SELECT * FROM players WHERE team = 'IND' AND age < 26",
        "SELECT * FROM players ORDER BY points ASC",
        "SELECT * FROM players WHERE team = 'NYK' AND points > 1000",
        "SELECT * FROM players WHERE team = 'CHI' AND points < 300",
        "SELECT team FROM players WHERE points <= 2",
        "SELECT AVG(age) FROM players"
    ];

    queryStrings.forEach( query => {
        client.query(query, (err, res) => {
            if (err) {
                console.log('query error', err.message);
            } else {
                console.log(res);
            }
        });
    })
});