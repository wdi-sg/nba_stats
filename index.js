
const pg = require('pg');
//this is after 'npm init' and 'npm i pg'

const configs = {
user: 'postgres',
password: 'postgres',
host: '127.0.0.1',
database: 'nba_db',
port: 5432,
};

// sudo -u postgres createdb todolist
// psql -d todolist -U postgres -f tables.sql;

const client = new pg.Client(configs);

const show = text => {
	client.query(text,(err, res) => {
		if( err ){
     	console.log( "error", err.message );
    	} else {
			// console.log("result: ", res.rows); 
			for(let i=0; i<res.rows.length; i++) {
				console.log(res.rows[i]);
			}
		};
	})
}


client.connect((err) => {

	console.log("Starting PSQL");
 
	if (process.argv[2] == "") {
		process.argv[2] = "undefined";
	}

	let command = (process.argv[2]).toUpperCase();
	let task = process.argv[3];
	let update = process.argv[4];

	let text = "";

	switch (command) {


		case 'SHOWALL':
		    text = "SELECT * FROM players";
		    console.log('All tasks as follows:');
		    break;

		case 'SHOWTEAM':
		// All columns for all players from the New York Knicks (NYK)
		    text = `SELECT * FROM players WHERE team = '${task}'`;
		    console.log('All tasks as follows:');
		    break;

		case 'UNDERAGE':
		// All columns for all players from the Indiana Packers (IND) who are under 26 years old
		    text = `SELECT * FROM players WHERE age < '${task}'`;
		    console.log('All tasks as follows:');
		    break;

		case 'ASC':
		// All columns for all players, ordered from least points scored to most points scored
		    text = `SELECT * FROM players ORDER BY ${task} ASC;`;
		    console.log('All tasks as follows:');
		    break;

		case 'TEAMMVP':
		// All columns for all players on the New York Knicks who scored over 1000 points
		    text = `SELECT * FROM players WHERE team = '${task}' AND points > ${update};`;
		    console.log('All tasks as follows:');
		    break;

		case 'TEAMLVP':
		// All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
		    text = `SELECT * FROM players WHERE team = '${task}' AND points < ${update};`;
		    console.log('All tasks as follows:');
		    break;

		case 'BADTEAM':
		// Select team column only for players that scored 2 or less points in a game.
		    text = `SELECT team FROM players WHERE points < ${task};`;
		    console.log('All tasks as follows:');
		    break;

		case 'AVERAGE':
		// The average age for all players https://www.w3schools.com/sql/sql_count_avg_sum.asp
		    text = `SELECT AVG(${task}) FROM players;`;
		    console.log('All tasks as follows:');
		    break;

		case 'ARRAY':
		// Write the node.js code that runs an array of string sql statements and console.logs the results.
			const all_queries = [
				`SELECT * FROM players WHERE team = '${task}'`,
			 	"SELECT * FROM players"
			];

			for(let i=0; i<all_queries.length; i++) {
				client.query(all_queries[i],(err, res) => {
					console.log(`<------------------------------------${all_queries[i]}`);
					if( err ){
			     	console.log( "error", err.message );
			    	} else {
						// console.log("result: ", res.rows); 
						for(let i=0; i<res.rows.length; i++) {
							console.log(res.rows[i]);
						}
					};
				})
			}

			break;

		default:
			text = "SELECT * FROM players";
		    console.log(`Please use 'showall, add, clear, or delete'`);
		}
	show(text);
});

