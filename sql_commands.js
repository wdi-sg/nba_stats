// 1. All columns for all players from the New York Knicks (NYK)
SELECT * FROM players WHERE TEAM = 'NYK';

// 2. All columns for all players from the Indiana Packers (IND) who are under 26 years old
SELECT * FROM players WHERE TEAM='IND' AND AGE < 26;

// 3. All columns for all players, ordered from least points scored to most points scored
SELECT * FROM players ORDER BY points ASC;

// 4. All columns for all players on the New York Knicks who scored over 1000 points
SELECT * FROM players WHERE TEAM='NYK' AND POINTS > 1000;

// 5. All columns for all players on the Chicago Bulls (CHI) who scored under 300 points
SELECT * FROM players WHERE TEAM='CHI' AND POINTS < 300;

// 6. Select team column only for players that scored 2 or less points in a game.
SELECT name, team, points FROM players WHERE points <= 2 ORDER BY POINTS DESC;

// 7. The average age for all players
SELECT AVG(age) FROM players;
