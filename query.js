const pg = require("pg");
const jsonfile = require("jsonfile");

// set all of the configuration in an object
const configs = {
  user: "mervyn",
  host: "127.0.0.1",
  database: "nba_db",
  port: 5432
};

const client = new pg.Client(configs);
client.connect(pgErr => {
  if (pgErr) {
    console.log("error", err.message);
} else if ((process.argv[2] = 1)) {
    var queryString = "SELECT * FROM players WHERE TEAM = 'NYK'";
} else if ((process.argv[2] = 2)) {
    var queryString = "SELECT * FROM players WHERE TEAM='IND' AND AGE < 26";
} else if ((process.argv[2] = 3)) {
    var queryString = "SELECT * FROM players ORDER BY points ASC";
} else if ((process.argv[2] = 4)) {
    var queryString =
      "SELECT * FROM players WHERE TEAM='NYK' AND POINTS > 1000";
  } else if ((argv[2] = 5)) {
    var queryString = "SELECT * FROM players WHERE TEAM='CHI' AND POINTS < 300";
} else if ((argv[2] = 6)) {
    var queryString = "SELECT name, team, points FROM players WHERE points <= 2 ORDER BY POINTS DESC";
} else if ((argv[2] = 7)) {
    var queryString = "SELECT AVG(age) FROM players";
  }

  client.query(queryString, (queryErr, res) => {
    if (queryErr) {
      console.log("query error", queryErr.message);
    } else {
      console.log("result", res.rows);
    }
  });
});
