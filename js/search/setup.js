$(function() {

  $container = $("#container");
  let link = window.location.pathname.split("/");
  let searched = link[link.length - 2];
  $("#search input").val(searched);

  $.ajax({
    type: "GET",
    url: "/api/search/" + searched,
    success: function(searches) {
      for(let i = 0; i < searches.length; i++){
        if (!searches[i].task){
          AddApp(searches[i]);
        }else{
          AddControl(searches[i]);
        }
      }
    },
    error: function(err) {
      alert("Not found!");
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