const pg = require('pg');
const jsonfile = require ('jsonfile');

const configs = {
user: 'postgres',
host: '127.0.0.1',
database: 'nba_db',
port: 5432,
};

const client = new pg.Client(configs);

client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  } 
    else {

      jsonfile.readFile('players.json', (err, obj) => {
        if (err) {console.error(err);
        }   
        else {  
            for (var i = 0; i < obj.players.length; i++) {
            
             // your queries go here
            let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';

            // your dynamic values go here
            let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];
          
            client.query(queryString, values, (err, res) => {
                if (err) {
                  console.log('query error', err.message);
                } else {
                  console.log('result', res.rows);
                }
                
            });

          }
          
      }  
    })  
  } 
});