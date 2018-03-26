# SQL
![https://media.giphy.com/media/3o6wrCyusA67uiLHYA/giphy.gif](https://media.giphy.com/media/3o6wrCyusA67uiLHYA/giphy.gif)

### Part 1

Create a database called `nba_db`.
```
createdb nba_db -U USERNAME
```

I've created the schema for a table called `players` in the file `tables.sql`. The schema includes an id, name, age, team, games, and points.

Run the `tables.sql` file for your `nba_db` by typing`psql -d nba_db -f tables.sql` into your terminal (not in psql). This will create the players table in your nba_db.

### Part 2
Create a node script (perhaps called `populate-db.js`) to load your data from the `players.json` file into your database.

Load the pg library:
```
yarn init
yarn add pg
```

Load your jsonfile library
```
yarn add jsonfile
```

Require the libraries
```js
const pg = require('pg');
const jsonfile = require('jsonfile');

// set all of the configuration in an object
const configs = {
  user: 'akira',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

// create a new instance of the client
const client = new pg.Client(configs);
```

Use jsonfile to get the player records
```js
jsonfile.readFile('players.json', (err, obj) => {
  if (err) console.error(err);
  // obj is all the player records
  // what now?
});

```

Hint: does this need to be nested somewhere? Or not? What is the true order of operations?


```js
// start using your client

client.connect((err) => {

  if (err) {
    console.log('error', err.message);
  }

  // your queries go here
  let queryString = '';

  // your dynamic values go here
  let values = [];

  client.query(queryString, values, (err, res) => {
    if (err) {
      console.log('query error', err.message);
    } else {
      console.log('result', res.rows[0]);
    }
    
    // the last query you make, close the connection.
    client.end();
  });
});
```

Run the `populate-db.js` program __ONCE__ to populate the database. It should read in the information from the `players.json` textfile and populates your database.

The data is structured with the following keys:`name,age,team,games,points`

** `games` is games played during the season and `points` is total points scored over the course of the season.

### Part 3

Figure out the appropriate SQL commands to find out the following, and keep track of them in the file called `sql_commands.txt`

1. All columns for all players from the New York Knicks (NYK)
1. All columns for all players from the Indiana Packers (IND) who are under 26 years old
1. All columns for all players, ordered from least points scored to most points scored
1. All columns for all players on the New York Knicks who scored over 1000 points
1. All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
1. Select team column only for players that scored 2 or less points in a game.
1. The average age for all players [https://www.w3schools.com/sql/sql_count_avg_sum.asp](https://www.w3schools.com/sql/sql_count_avg_sum.asp)
1. The average age for all players on the Oklahoma City Thunder (OKC)


### Further
Write the node.js code that executes each SQL statement.
