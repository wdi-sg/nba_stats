const pg = require('pg');
const jsonfile = require('jsonfile');

const FILE = 'players.json';
const pgClient = new pg.Client({
	user:'seliyansilvarajoo',
	host: '127.0.0.1',
	database:'nba_db',
	port: 5432
});



// function valueBuilder(valuesArray){
// 	let valueBuilder="$1";
// 	for(let i=2;i<valuesArray.length;i++){
// 		valueBuilder=valueBuilder+",$"+i;
// 	}
// 	valueBuilder="values("+valueBuilder+")";
// 	return valueBuilder;
// };

function valueStatement(valuesArray,a){
	let valueBuilder =[];
	valueBuilder.push(valuesArray[a].name)
	valueBuilder.push(valuesArray[a].age)
	valueBuilder.push(valuesArray[a].team)
	valueBuilder.push(valuesArray[a].games)
	valueBuilder.push(valuesArray[a].points)
	return valueBuilder;
};



pgClient.connect();
jsonfile.readFile(FILE,(err,obj)=>{
	let valuesArray=obj["players"];
	var pgQueryText = "insert into players (name,age,team,games,points) values($1,$2,$3,$4,$5)";
	for(a=0;a<2;a++){
		// console.log(a);

		let values = valueStatement(valuesArray,a);
		// console.log(values);
		pgClient.query(pgQueryText,values,(err,resp)=>{
			if(err){
				console.log("haha",err.message);
			}else{
				// console.log("it worked",a);
				console.log(a);
			}
		});
	};
});



