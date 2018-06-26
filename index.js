const pg=require('pg')
const jsonfile=require('jsonfile')

//set all the configurations in an object
const configs={
	user:'martinhilary',
	host:'127.0.0.1',
	database:'nba_db',
	port:5432
};
//create a new instance of the client
const client= new pg.Client(configs);
jsonfile.readFile('players.json',(err,obj)=>{
	if(err) console.log('error');

	client.connect((err)=>{
		
		if (err) {
	    	console.log('error', err.message);
	 	}

	  // your queries go here
	  let queryString = 'INSERT INTO players (name, age, team,games,points) VALUES ($1, $2, $3, $4, $5)';
	  // your dynamic values go here
	  //console.log(obj.players)
	  for(var i=0;i< obj.players.length;i++){
	  let values = [obj.players[i].name,obj.players[i].age,obj.players[i].team,obj.players[i].games,obj.players[i].points];
	  //Need to use a loop to sorta plug in each of these values into the selector
	  // for(var i=0;i<obj.players.length;i++){

		  client.query(queryString, values, (err, res) => {
		    if (err) {
		      console.log('query error!!!!!!!', err.message);
		    } 

		    	// console.log('hi');
		      // console.log('result', res.rows[i])	

		    // the last query you make, close the connection.
		    if(i == obj.players.length-1){
		    	 client.end();
		    }
		  });

  		}
  	});
});
