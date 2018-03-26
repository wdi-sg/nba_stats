const pg = require('pg');
const jsonfile = require('jsonfile');
const FILE = 'players.json';

const config = {
    user: 'ck',
    host: '127.0.0.1',
    database: 'nba_db',
    port: 5432
}

const dbClient = new pg.Client(config);

const insertPlayer = {
    name: 'insert-player',
    text: 'INSERT INTO players(name, age, team, games, points) VALUES($1, $2, $3, $4, $5) RETURNING *',
    values: []
}

// async-ify the classic jsonfile.readFile method because I don't like callbacks :x
async function readJSON(f) {
    return new Promise((resolve, reject) => {
        jsonfile.readFile(f, (err, obj) => {
            (err) ? reject(err) : resolve(obj);
        })
    })
}

async function savePlayerInDB(player) {
    insertPlayer.values = [player.name, player.age, player.team, player.games, player.points];
    return dbClient.query(insertPlayer);
}

async function populateDB() {
    let fileData = readJSON(FILE);
    await fileData + await dbClient.connect();
    let players = fileData.players;
    let l = players.length;
    let dbTasks = [];
    while (l--) {
        dbTasks.push(savePlayerInDB(players[l]));
    };
    Promise.all(dbTasks).then((val) => {
        dbClient.end(); // No async/await declaration here since it's not like the server has anything else to do... 
    })  
}

populateDB();

const queries = ["SELECT * FROM players WHERE team = 'NYK';", 
"SELECT * FROM players WHERE team = 'IND' AND age < 26;", 
"SELECT * FROM players ORDER BY points;", 
"SELECT name, points FROM players ORDER BY points DESC LIMIT 20;", "SELECT AVG(age) FROM players;", 
"SELECT AVG(age) FROM players WHERE team = 'OKC';", 
"SELECT AVG(age) FROM players WHERE games > 40;", 
"SELECT team, SUM(points) AS 'Team Points' FROM players GROUP BY team ORDER BY 'Team Points' DESC;",
"SELECT age, AVG(points / games * 1.0) FROM players GROUP BY age ORDER BY age;", 
"SELECT team, COUNT(points / games * 1.0 > 12) AS 'Star Count' FROM players GROUP BY team ORDER BY 'Star Count' DESC;"]

async function runQuery(i) {
    await dbClient.connect();
    dbClient.query(queries[i]).then(async (result) => {
        console.log(result.rows);
        await dbClient.end()
    });
}

runQuery(1);
