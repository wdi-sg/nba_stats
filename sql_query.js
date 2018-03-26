var pg = require('pg');
var conString = "postgres://postgres:asdzxc@localhost:5432/nba_db";

var pQuery = (title, sql) =>{
	let client = new pg.Client(conString);
	client.connect();
	client.query(sql,(err, result)=>{
		console.log("\n" + title )
		if(!err){
			for(let i = 0; i< result.rows.length;i++){
				let resultString = ""
				let k=0;
				for(j in result.rows[i]){
					k++
					resultString += result.rows[i][j] + (k == Object.keys(result.rows[i]).length ? " " : " | ")
				}
				console.log(i+1 + ". " + resultString)
			}
		}
		else{
			console.log(err)
		}
		client.end()
	});
}



pQuery("Players from the New York Knicks (NYK): ", "select * from players where team = 'NYK' order by name");
pQuery("Players from the Indiana Packers (IND) who are under 26 years old: ", "select * from players where team = 'IND' and age < 26 order by name");
pQuery("Players ordered from least points scored to most points scored: ", "select * from players order by points");
pQuery("Players on the New York Knicks who scored over 1000 points: ", "select * from players where team = 'NYK' and points > 1000 order by points desc");
pQuery("Players on the Chicago Bulls (CHI) who scored under 300 point: ", "select * from players where team = 'CHI' and points < 300 order by points desc");
pQuery("Team whose players that scored 2 or less points in a game: ", "select team from players where points < 2 group by team order by team");
pQuery("The average age for all players: ", "select avg(age)::int from players");
pQuery("The average age for all players on the Oklahoma City Thunder (OKC): ", "select avg(age)::int from players where team = 'OKC'");
