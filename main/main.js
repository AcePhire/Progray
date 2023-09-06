$(function(){
    $container = $("#container");
    $theMenu = $("#menu");
    $nav = $("#nav");
    let loggedIn = false;
    let password = "assphire27";

    $container.delegate(".app", "click", function() {
        let id = $(this).attr("data-id");

        if (!loggedIn){
            let passInput = window.prompt("Enter the password to continue");        
            passInput = passInput.toLowerCase(); 
            if (passInput === password) loggedIn = true;
        }

        if (loggedIn){
            $.ajax({
            type: "GET",
            url: `/api/apps/${id}`
            });
        }
    });

    $container.delegate(".game", "click", function() {
        let id = $(this).attr("data-id");

        if (!loggedIn){
            let passInput = window.prompt("Enter the password to continue");        
            passInput = passInput.toLowerCase(); 
            if (passInput === password) loggedIn = true;
        }

        if (loggedIn){
            $.ajax({
            type: "GET",
            url: `/api/games/${id}`
            });
        }
    });

    $container.delegate(".control", "click", function() {
        let task = $(this).attr("data-task");

        if (!loggedIn){
            let passInput = window.prompt("Enter the password to continue");        
            passInput = passInput.toLowerCase(); 
            if (passInput === password) loggedIn = true;
        }

        if (loggedIn){
            $.ajax({
                type: "GET",
                url: `/api/controls/${task}`,
                success: function(data) {
                    if (task === "scrsht") window.open(window.location.hostname + "/" + data);
                }
            });   
        }

    });

    $theMenu.find(".categories li").last().on("click", function(){
        if (!loggedIn){
            let passInput = window.prompt("Enter the password to continue");        
            passInput = passInput.toLowerCase(); 
            if (passInput === password) loggedIn = true;
        }

        if (loggedIn){
            window.location.href='/filesearch';
        }
    });

    $("#nav #menu-button").on("click", function(){
        $theMenu.animate({width: "toggle"}, 340, function(){
            $container.css("display", "none");
            $nav.css("width", "0");
        });
    });

    $("#menu #menu-button").on("click", function(){
        $container.css("display", "flex");
        $nav.css({width: "100vw"});
        $container.css({width: "100vw"});
        $theMenu.animate({width: "toggle"}, 340);
    });

    $("#menu #search img").on("click", function(){
        let searched = $("#menu #search input").val();
        window.open("/search/apps/" + searched, "_self");
    }); 
});