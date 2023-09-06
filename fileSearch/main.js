$(function(){
  $theMenu = $("#menu");
  $nav = $("#nav");
  $dir = $("#dir");
  $cdir = $dir.find("nav .cd");
  $backb = $dir.find("nav .backb");
  $downloadb = $dir.find("nav .downloadb");
  $files = $dir.find(".files");

  $("#nav #menu-button").on("click", function(){
    $theMenu.animate({width: "toggle"}, 340, function(){
        $dir.css("display", "none");
        $nav.css("width", "0");
    });
});

$("#menu #menu-button").on("click", function(){
    $dir.css("display", "block");
    $nav.css({width: "100vw"});
    $theMenu.animate({width: "toggle"}, 340);
});

  $files.delegate("li" , "click", function(){
    $file = $(this).find("span").text();
    if (false){
      
    }else{
      if ($cdir.text() == "Drivers"){
        cd = $(this).find("span").text();
      }else{
        cd = $cdir.text() + $(this).find("span").text() + "/";
      }

      let cdir = cd.replace(/\//g, "&");

      $cdir.text(cd);
      $files.children().remove();
      
      refreshSearch(cdir);
    }
  });

  $backb.delegate(this, "click", function(){
    //add `|| $cdir.text() === "[letter]:/"` and `AddFile("[letter]:/")` to add a new drive
    if($cdir.text() === "C:/"){
      $files.children().remove();
      AddFile("C:/");
      $cdir.text("Drivers");
    }else{
      let cd = $cdir.text();
      cd = cd.split("/");
      cd = cd.slice(0, cd.length - 2);
      cd = cd.join("/");
      cd = cd + "/";

      $cdir.text(cd);
      $files.children().remove();

      cdir = cd.replace(/\//g, "&");

      refreshSearch(cdir);
    }
  });

  $downloadb.delegate(this, "click", function(){
    Download($cdir.text());
  });

  function refreshSearch(cdir){
    $.ajax({
      type: "GET",
      url: `/api/filesearch/` + cdir,
      success: function(files){
        if (files === "File"){
          cd = cdir.replace(/\&/g, "/");
          Download(cd);
        }else{
          $.each(files, (i, file) =>{
              AddFile(file)
          });
        }
      },
      error: () => {
        alert("Error Finding File!")}
    });
  }

  function AddFile(file){
    let fileTemplate =
    `<li>` +
      `<span>` + 
          `${file}` +
      `</span>` +
    `</li>`

    $files.append(Mustache.render(fileTemplate));
  }

  function Download(file){
    file = file.replace(/\//g, "&");

    window.open(`/api/download/${file}`);
  }
});
