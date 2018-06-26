const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
    user: 'sabrinachow',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
};

const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
    if(err) {
        console.log(err);
    } else {
        
        client.connect((err) => {

            if (err) {
                console.log('error', err.message);
            }
            
            let object = obj.players;
            for(let i=0; i<object.length; i++) {
                let array = Object.values(object[i]);
                console.log(array);

                // your queries go here
                let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            
                // your dynamic values go here
                let values = array;
                
                client.query(queryString, values, (err, res) => {
                    if (err) {
                        console.log('query error', err.message);
                    } else {
                        console.log('result', res.rows);
                    }
                    
                    if( i == object.length - 1){
                        client.end();
                    }
                  
                });
            }

            // the last query you make, close the connection.
        });
    }
})


