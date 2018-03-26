const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
      user: 'postgres',
      host: '127.0.0.1',
      database: 'nba_db',
      port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);

function selectByTeam(team) {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT * FROM players WHERE team = " + "'" + team + "';";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function INDunder26() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT * FROM players WHERE team = 'IND' AND age < 26;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function leastToMost() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT * FROM players ORDER BY points ASC;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function NYKover1000() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT * FROM players WHERE team = 'NYK' AND points > 1000;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function CHIunder300() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT * FROM players WHERE team = 'CHI' AND points < 300;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function badPlayerTeams() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT team FROM players WHERE points <= 2;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function averageAge() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT AVG(age) FROM players;";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

function averageAgeOKC() {
      //connect to the client
      client.connect((err) => {
            //error logs
            if (err) console.error(err)
            // your queries go here
            let queryString = "SELECT AVG(age) FROM players WHERE team = 'OKC';";
            // your dynamic values go here (i.e what does $1 $2 $3 represent. use the obj returned from readFile)
            let values = [];
            //send the query to the database
            client.query(queryString, values, (err2, res) => {
                  if (err2) {
                        //if error, send msg
                        console.log('query error', err2.message);
                  } else {
                        //else show the result of the first row
                        console.log('result', res.rows[0]);
                  };
            });
      });
};

selectByTeam("NYK");
INDunder26();
leastToMost();
NYKover1000();
CHIunder300();
badPlayerTeams();
averageAge();
averageAgeOKC();