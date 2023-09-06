$(function() {

  $container = $("#container");

  $.ajax({
    type: "GET",
    url: "/api/games",
    success: function(games) {
      $.each(games, (i, game) => {
        AddGame(game);
      });
    }
  });

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
});
  
function GetRandomColor() {
  let letters = "3456789ABC";
  let color = "#";
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}