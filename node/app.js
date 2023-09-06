const Joi = require('joi');
const express = require('express');
const app = express();
const h2p = require('html2plaintext')
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const screenshot = require('desktop-screenshot');
const archiver = require('archiver');
const wait = require('wait-p');
const organizor = require('../jsons/node/app.js');
let apps = organizor.apps;
let games = organizor.games;
let controls = [];

const hostname = "127.0.0.1";
const port = process.env.PORT || "2759";

app.use(express.json());
app.use(bodyParser.json());

fs.readFile("../jsons/conts.json", (err, json) => {
  if (err) throw err;

  controls = JSON.parse(json);
});

fs.readFile("../main/index.html", (err, html) => {
  if (err) throw err;

  app.use("/", express.static("../"));
  app.use("/", express.static("../imgs"));
  app.use("/", express.static("../main"));
  app.use("/", express.static("../libs"));
  app.use("/", express.static("../js/main"));
  app.get("/", (req, res) => {
    res.set("Content-Type", "text/html");
    res.send(html);
  });

  app.use("/apps", express.static("../"));
  app.use("/apps", express.static("../imgs"));
  app.use("/apps", express.static("../main"));
  app.use("/apps", express.static("../libs"));
  app.use("/apps", express.static("../js/apps"));
  app.get("/apps", (req, res) => {
    res.header("Content-Type", "text/html");
    res.send(html);
  });

  app.use("/games", express.static("../"));
  app.use("/games", express.static("../imgs"));
  app.use("/games", express.static("../main"));
  app.use("/games", express.static("../libs"));
  app.use("/games", express.static("../js/games"));
  app.get("/games", (req, res) => {
    res.header("Content-Type", "text/html");
    res.send(html);
  });

  app.use("/controls", express.static("../"));
  app.use("/controls", express.static("../imgs"));
  app.use("/controls", express.static("../main"));
  app.use("/controls", express.static("../libs"));
  app.use("/controls", express.static("../js/conts"));
  app.get("/controls", (req, res) => {
    res.header("Content-Type", "text/html");
    res.send(html);
  });

  app.use("/search/apps/:name", express.static("../"));
  app.use("/search/apps/:name", express.static("../imgs"));
  app.use("/search/apps/:name", express.static("../main"));
  app.use("/search/apps/:name", express.static("../libs"));
  app.use("/search/apps/:name", express.static("../js/search"));
  app.get("/search/apps/:name", (req, res) => {
    res.header("Content-Type", "text/html");
    res.send(html);
  });  
});

fs.readFile("../filesearch/index.html", (err, html) => {

  app.use("/filesearch", express.static("../imgs"));
  app.use("/filesearch", express.static("../libs"));
  app.use("/filesearch", express.static("../fileSearch"));
  app.get("/filesearch", (req, res) => {
    res.header("Content-Type", "text/html");
    res.send(html);
  });  

});

app.get("/api/apps", (req, res) => {
  res.send(apps);
});

app.get("/api/games", (req, res) => {
  res.send(games);
});

app.get("/api/controls", (req, res) => {
  res.send(controls);
});

app.get("/api/search/:name", (req, res) => {
  const apps_ = apps.filter(a => a.name.toUpperCase() === req.params.name.toUpperCase() || a.name.toUpperCase().startsWith(req.params.name.toUpperCase()));
  const games_ = games.filter(a => a.name.toUpperCase() === req.params.name.toUpperCase() || a.name.toUpperCase().startsWith(req.params.name.toUpperCase()));
  const controls_ = controls.filter(c => c.name.toUpperCase() === req.params.name.toUpperCase()|| c.name.toUpperCase().startsWith(req.params.name.toUpperCase()));
  if (!apps_ && !controls_ && !games_) return res.status(404).send("Not found!");
  
  let searches = apps_.concat(games_).concat(controls_);

  res.send(searches);
});

app.get("/api/apps/:id", (req, res) => {
  const app = apps.find(a => a.id === parseInt(req.params.id));
  if (!app) return res.status(404).send("App not found!");

  if (!app.process){
    exec(`start "" "${app.path}"`, (err, stdout, stderr) => {
      if (err) return console.error(err);
      res.send(stdout);
    });
  }else{
    exec(`start "" "${app.path}" ${app.process}` , (err, stdout, stderr) => {
      if (err) return console.error(err);
      res.send(stdout);
    });
  }
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(a => a.id === parseInt(req.params.id));
  console.log(game);
  if (!game) return res.status(404).send("App not found!");

  if (!game.process){
    exec(`start "" "${game.path}"`, (err, stdout, stderr) => {
      if (err) return console.error(err);
      res.send(stdout);
    });
  }else{
    exec(`start "" "${game.path}" ${game.process}` , (err, stdout, stderr) => {
      if (err) return console.error(err);
      res.send(stdout);
    });
  }
});

app.get("/api/controls/:task", (req, res) => {
  if (!req.params.task) return res.status(400).send("Control not given!");

  if (req.params.task === "scrsht"){
    let name = `../screenshots/screenshot${Math.random() * Math.floor(1000000)}.png`;
    screenshot(name, function(err, complete) {
      if(err){
        console.log("Screenshot failed", err);
        res.status(409).send("Error occurred!, Screenshot failed!");
      }else{
        console.log("Screenshot succeeded!");
        console.log(name);
        
        res.send(name);
      }
    });
    return;
  }else if (req.params.task === "sd") {
    exec(`shutdown /s`, (err, stdout, stderr) => {
      if (err) return console.error(err);
      res.send(stdout);
    });
    return;
  }
});

app.get("/api/filesearch/:cd", (req, res) => {
  if (!req.params.cd) return res.status(400).send("Directory not given!");
  if (req.params.cd == "Drivers") return res.send([]);

  req.params.cd = req.params.cd.replace(/\&/g, "/");
  if (!fs.statSync(req.params.cd).isFile()){
    fs.readdir(req.params.cd, function(err, files) {
      if(err){
          console.log("File Search failed, Directory not found!", err);
          return res.status(409).send("Error occurred!, File Search failed!, Directory not found!");
        }else{
          console.log("File Search succeeded!");
          
          res.send(files);
        }
    });
  }else{
    res.send("File");
  }
})

app.get("/api/download/:cd", (req, res) => {
  if (!req.params.cd) return res.status(400).send("Directory not given!");

  req.params.cd = req.params.cd.replace(/\&/g, "/");

  if (fs.statSync(req.params.cd).isFile()){
    res.download(req.params.cd);
  }else{
    name = (req.params.cd).split("/");
    name = name[name.length - 2];
    ZipFile(req.params.cd, `cache/${name}.zip`);

    wait(1000).then(() => {
      res.download(`cache/${name}.zip`);
    });
  }
});

app.listen(port, () => {
  console.log("Connected!");
});

//freedns.afraid.org

function ZipFile(fromPath, pathTo, callback){
  var output = fs.createWriteStream(pathTo);
  var archive = archiver("zip");

  archive.pipe(output);
  archive.directory(fromPath, false);
  archive.finalize();

  output.on('close', function() {
    callback();
  });
}
