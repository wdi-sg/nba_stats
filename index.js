const pg = require('pg');
const jsonfile = require('jsonfile');
const fs = require('fs');

// set all of the configuration in an object
const configs = {
    user: 'drillaxholic',
    host: '127.0.0.1',
    database: 'homeWork13',
    port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================
// jsonfile.readFile('players.json', (err, obj) => {
//     if (err) console.error(err);
//     // start using your client
//     client.connect((err) => {
//         if (err) {
//             console.log('error', err.message);
//         } else {
//             const players = obj.players;
//             players.forEach((player) => {
//                 // your queries go here
//                 let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5)';
//                 // your dynamic values go here
//                 let values = [player.name, player.age, player.team, player.games, player.points];
//                 client.query(queryString, values, (err, res) => {
//                     if (err) {
//                         console.log('query error', err.message);
//                     } else {
//                         if (player === players.length - 1) {
//                             client.end();
//                         }
//                     }
//                 });
//             });
//         };
//     });
// });
// =============================================================
// COMMENTED OUT AFTER LOADING THE DATABASE
// =============================================================

start using your client

client.connect((err) => {

    if (err) {
        console.log('error', err.message);
    }
    let queryString = "SELECT * FROM players WHERE team='NYK'";
    client.query(queryString, (err, res) => {
        if (err) {
            console.log('query error', err.message);
        } else {
        	var obj = [];
        	res.rows.forEach((player) => {
        		obj.push(player.name);
        	})
        	fs.writeFile("sql_commands.txt", 'Players who are in NYK team: ' + obj, (err)=>{console.log('err')});
            client.end();
        }
    })
})

client.connect((err) => {

    if (err) {
        console.log('error', err.message);
    }
    let queryString = "SELECT * FROM players WHERE age < 26 AND team = 'IND'";
    client.query(queryString, (err, res) => {
        if (err) {
            console.log('query error', err.message);
        } else {
        	var obj = [];
        	res.rows.forEach((player) => {
        		obj.push(player.name);
        	})
        	fs.writeFile("sql_commands.txt", 'Players whom are from IND team and below 26 years old:  ' + obj, (err)=>{console.log('err')});
            client.end();
        }
    })
})

client.connect((err) => {

    if (err) {
        console.log('error', err.message);
    }
    let queryString = "SELECT points FROM players ORDER BY points ASC";
    client.query(queryString, (err, res) => {
        if (err) {
            console.log('query error', err.message);
        } else {
        	var obj = [];
        	res.rows.forEach((num) => {
        		obj.push(res.rows.name);
        		console.log(res.rows);
        	})
        	fs.writeFile("sql_commands.txt", 'Players rating points by ascending order: ' + obj, (err)=>{console.log('err')});
            client.end();
        }
    })
})