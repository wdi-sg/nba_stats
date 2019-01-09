# SQL
![https://media.giphy.com/media/3o6wrCyusA67uiLHYA/giphy.gif](https://media.giphy.com/media/3o6wrCyusA67uiLHYA/giphy.gif)

### Part 1: DB Setup 

Create a database called `nba_db`.
```
createdb nba_db -U USERNAME
```

I've created the schema for a table called `players` in the file `tables.sql`. The schema includes an id, name, age, team, games, and points.

Run the `tables.sql` file for your `nba_db` by typing`psql -d nba_db -f tables.sql` into your terminal (not in psql). This will create the players table in your nba_db.

### Part 2: Fill the DB from a File
psql -d nba_db -U akira -f seed.sql

### Part 3: Query your Filled DB

Figure out the appropriate SQL commands to find out the following, and keep track of them in the file called `sql_commands.txt`

1. All columns for all players from the New York Knicks (NYK)
1. All columns for all players from the Indiana Packers (IND) who are under 26 years old
1. All columns for all players, ordered from least points scored to most points scored

### Further - do these in any order:

#### Further (use some SQL functions in queries)

1. All columns for all players on the New York Knicks who scored over 1000 points
1. All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
1. Select team column only for players that scored 2 or less points in a game.
1. The average age for all players [https://www.w3schools.com/sql/sql_count_avg_sum.asp](https://www.w3schools.com/sql/sql_count_avg_sum.asp)


#### Further
Write the node.js `client.query` code that **executes** each SQL statement from part 3 and `console.log`s the results.

#### Further
Write the node.js code that runs an array of string sql statements and `console.log`s the results.
