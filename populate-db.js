const jsonfile = require('jsonfile');
const FILE = 'players.json';

const pg = require('pg');
const configs = {
	user: 'scottlee',
	host: '127.0.0.1',
	database: 'nba_db',
	port: '5432'
};

const client = new pg.Client(configs);

jsonfile.readFile(FILE, (err,obj)=>{
	client.connect((err) => {
	if (err) {
		console.log('Connection error', err.message);
	}
	var counter=0;
	console.log('Connected to dB');

	let text = 'INSERT INTO players (name, age, team, games, points) ' + ' VALUES($1, $2, $3, $4, $5)';

	for (let i=0; i<obj.players.length; i++){
		let values = [obj.players[i].name, obj.players[i].age, obj.players[i].team, obj.players[i].games, obj.players[i].points];

		client.query(text, values, (err, res) => {
			if (err) {
				console.log("Query error", err.message);
			} else {
				console.log("Entry added " + counter);
				counter++;
			}
			if (counter === obj.players.length) {client.end();}
		});
	}	
});
});