$(function() {

  $container = $("#container");

  $.ajax({
    type: "GET",
    url: "/api/apps",
    success: function(apps) {
      $.each(apps, (i, app) => {
        AddApp(app);
      });
    }
  });

  $.ajax({
    type: "GET",
    url: "/api/games",
    success: function(games) {
      $.each(games, (i, game) => {
        AddGame(game);
      });
    }
  });

  $.ajax({
    type: "GET",
    url: "/api/controls",
    success: function(controls) {
      $.each(controls, (i, control) => {
        AddControl(control);
      });
    }
  });

  function AddApp(app){
  const color = GetRandomColor();
  let appTemplate =
  `<div class="app" data-id="{{id}}" style="background-color: ${color}">` +
    `<span>` +
      `{{name}}` +
    `</span>` +
  `</div>`;

  $container.append(Mustache.render(appTemplate, app));
  }

  function AddGame(game){
    const color = GetRandomColor();
    let appTemplate =
    `<div class="game" data-id="{{id}}" style="background-color: ${color}">` +
      `<span>` +
        `{{name}}` +
      `</span>` +
    `</div>`;
  
    $container.append(Mustache.render(appTemplate, game));
  }

  function AddControl(control){
  const color = GetRandomColor();
  let appTemplate =
  `<div class="control" data-task="{{task}}" style="background-color: ${color}">` +
    `<span>` +
      `{{name}}` +
    `</span>` +
  `</div>`;

  $container.append(Mustache.render(appTemplate, control));
  }
  
});

function GetRandomColor() {
  let letters = "3456789ABC";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}