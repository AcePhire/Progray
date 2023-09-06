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
});
  
function GetRandomColor() {
  let letters = "3456789ABC";
  let color = "#";
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}