const fs = require('fs');

let appsDir = [], gameDir = [];

let appsDirName = 'path\\to\\apps_directory';
let gamesDirName = 'path\\to\\games_directory';

// appsDir = fs.readdirSync(appsDirName);
// gameDir = fs.readdirSync(gamesDirName);

let apps = [], games = [];

for (let i = 0; i < appsDir.length; i++){
  app = {
    id: i + 1,
    name: appsDir[i].slice(0, -4),
    path: `${appsDirName}\\${appsDir[i]}`
  }
  apps.push(app);
}

for (let i = 0; i < gameDir.length; i++){
  if (!gameDir[i].includes("nativelog")){
    game = {
      id: i + 1,
      name: gameDir[i].slice(0, -4),
      path: `${gamesDirName}\\${gameDir[i]}`
    }
    games.push(game);
  }
}

module.exports.apps = apps;
module.exports.games = games;