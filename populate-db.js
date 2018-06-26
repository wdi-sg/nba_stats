const pg = require('pg');
const jsonfile = require('jsonfile');

const configs = {
    user: 'sabrinachow',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432,
};


function addingData () {
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
    });
}





function SQLQueries () {
    const client1 = new pg.Client(configs);

    client1.connect((err) => {
        if (err) {
            console.log('error', err.message);
        }
    
        // your queries go here
        //first section of part 3
        let queryString = "SELECT * FROM players WHERE team = 'NYK'";
        
        client1.query(queryString, (err, res) => {
            if (err) {
                console.log('query error', err.message);
            } else {
                for(let i=0; i<res.rows.length; i++) {
                    console.log('result', res.rows[i]);
                }
            }     
        });

        //second section of part 3
        queryString = "SELECT * FROM players WHERE team = 'IND' AND age < 26";

        client1.query(queryString, (err, res) => {
            if (err) {
                console.log('query error', err.message);
            } else {
                for(let i=0; i<res.rows.length; i++) {
                    console.log('result', res.rows[i]);
                }
            }     
        });

        //third section of part 3
        queryString = "SELECT * FROM players ORDER BY points ASC";

        client1.query(queryString, (err, res) => {
            if (err) {
                console.log('query error', err.message);
            } else {
                for(let i=0; i<res.rows.length; i++) {
                    console.log('result', res.rows[i]);

                    if(i == res.rows.length - 1) {
                        client1.end();
                    }
                }
            }     
        });
    })
}

SQLQueries();





