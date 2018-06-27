const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'jemimalim',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

jsonfile.readFile('players.json', (err, obj) => {
  if (err) console.error(err);
  // console.log(obj);
  // obj is all the player records
  // what now?
  client.connect((err) => {

    if (err) {
      console.log('error', err.message);
    }
    console.log(obj.players[0].name);
    // your queries go here
    // let queryString = 'INSERT INTO players (name, age, team, games , points) VALUES ( $1, $2, $3, $4, $5)';

    // your dynamic values go here
    let allValues = [];
    // let count = 0;

    for (let i = 0; i < obj.players.length; i++) {
      let queryString = 'INSERT INTO players (name, age, team, games , points) VALUES ( $1, $2, $3, $4, $5)';
      let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];
      allValues.push(values);
      console.log(allValues[i]);


      client.query(queryString, allValues[i], (err, res) => {  
        if (err) {
          console.log('query error', err.message);
        } else {
          console.log('result', res.rows[0]);
        }
        // the last query you make, close the connection.
        // count++
        if (i === obj.players.length - 1) {
          client.end();
        }

    });
      
    }


  });

});


// further

    // client.connect((err) => {
    //     if (err) {
    //         console.log('error', err.message);
    //     }

    //     let q1 = "SELECT * FROM players WHERE team = 'NYK'";
        
    //     client.query(q1, (err, res) => {
    //         if (err) {
    //             console.log('query error', err.message);
    //         } else {
    //             for (let i = 0; i < res.rows.length; i++) {
    //                 console.log('OIAUOFINSDOJFBNKE', res.rows[i]);
    //             }
    //         }     
    //     });

    //     // console.log("WEEEEEEEEEEEEEEEE");

    //     let q2 = "SELECT * FROM players WHERE team = 'IND' AND age < 26";

    //     client.query(q2, (err, res) => {
    //         if (err) {
    //             console.log('query error', err.message);
    //         } else {
    //             for (let i = 0; i < res.rows.length; i++) {
    //                 console.log('result', res.rows[i]);
    //             }
    //         }     
    //     });

    //     let q3 = "SELECT * FROM players ORDER BY points ASC";

    //     client.query(q3, (err, res) => {
    //         if (err) {
    //             console.log('query error', err.message);
    //         } else {
    //             for (let i = 0; i < res.rows.length; i++) {
    //                 console.log('result', res.rows[i]);
                       
                    
    //             }
    //         }     
    //     });

    //     //
    //     let lastOne = [
    //       "SELECT * FROM players WHERE team = 'NYK'", 
    //       "SELECT * FROM players WHERE team = 'IND' AND age < 26", 
    //       "SELECT * FROM players ORDER BY points ASC"
    //     ];
        
    //     for (let i = 0; i < lastOne.length; i++) {
    //         client.query(lastOne[i], (err, res) => {
    //             if (err) {
    //                 console.log('query error', err.message);
    //             } else {
    //                 for (let j=0; j < res.rows.length; j++) {
    //                     console.log('the value of j =', j, res.rows[j]);
    
    //                     if(j == res.rows.length - 1 && i == lastOne.length - 1) {
    //                         client.end();
    //                     }
    //                 }
    //             }     
    //         });
    //     }
    // })


       

