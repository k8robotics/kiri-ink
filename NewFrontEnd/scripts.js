mouseX = 0;
mouseY = 0;

function DrawWelcome(){
    cover = document.createElement("div");
    popup = document.createElement("div");
    //create all elements
    header = document.createElement("div");
    logo = document.createElement("img");
    contents = document.createElement("div");
    title = document.createElement("h1");
    description = document.createElement("p");
    dropbox = document.createElement("div");
    button = document.createElement("button");
    indicator = document.createElement("img");
    
    cover.classList.add("cover");
    popup.classList.add("popup");
    header.classList.add("popup-header");
    logo.src = "logo.png";
    logo.classList.add("logo");
    contents.classList.add("popup-contents");
    contents.id = "contents";
    title.innerHTML = "Welcome to Kiri:Moto!";
    description.innerHTML = "To get started, drag and drop a file into the box below or browse from your computer";
    dropbox.classList.add("drop-box");
    button.classList.add("add-file");
    button.id = "addfile";
    button.innerHTML = "ADD FILES";
    indicator.src = "indicators.png";
    indicator.id = "indicator";
    indicator.classList.add("indicate");

    document.body.appendChild(cover);
    document.body.appendChild(popup);
    popup.appendChild(header);
    header.appendChild(logo);
    popup.appendChild(contents);
    contents.appendChild(title);
    contents.appendChild(description);
    contents.appendChild(dropbox);
    dropbox.appendChild(button);
    popup.appendChild(indicator);

}

function fileTransition(){
    console.log("clicked");
    $("#contents").children().animate({
        opacity:0,
        "margin-left": "-50",
        }, 100, function(){}
    );
    $("#indicator").attr('src','indicators2.png');
}

function showToolS(){
    $("#rotate").css("left", "7%");
    $("#rotate").css("opacity", "0");
    $("#rotate").css("pointer-events", "none");
    $("#view").css("left", "7%");
    $("#view").css("opacity", "0");
    $("#view").css("pointer-events", "none");
    $("#devices").css("left", "7%");
    $("#devices").css("opacity", "0");
    $("#devices").css("pointer-events", "none");
    

    if($("#scale").css("opacity") === "0"){
        $("#scale").css("opacity", "1");
        $("#scale").css("pointer-events", "initial");
        $("#scale").css("left", "8%");
        $("#scale").css("top", (mouseY - ($("#scale").height() / 2)) + "px");
    } 
    else{
        $("#scale").css("opacity", "0");
        $("#scale").css("pointer-events", "none");
        $("#scale").css("left", "7%");
        
    }  
}

function showToolR(){
    $("#scale").css("left", "7%");
    $("#scale").css("opacity", "0");
    $("#scale").css("pointer-events", "none");
    $("#view").css("left", "7%");
    $("#view").css("opacity", "0");
    $("#view").css("pointer-events", "none");
    $("#devices").css("left", "7%");
    $("#devices").css("opacity", "0");
    $("#devices").css("pointer-events", "none");
    

    if($("#rotate").css("opacity") === "0"){
        $("#rotate").css("opacity", "1");
        $("#rotate").css("pointer-events", "initial");
        $("#rotate").css("left", "8%");
        $("#rotate").css("top", (mouseY - ($("#rotate").height() / 2)) + "px");
    } 
    else{
        $("#rotate").css("opacity", "0");
        $("#rotate").css("pointer-events", "none");
        $("#rotate").css("left", "7%");
    }   
}


function showView(){
    $("#scale").css("left", "7%");
    $("#scale").css("opacity", "0");
    $("#scale").css("pointer-events", "none");
    $("#rotate").css("left", "7%");
    $("#rotate").css("opacity", "0");
    $("#rotate").css("pointer-events", "none");
    $("#devices").css("left", "7%");
    $("#devices").css("opacity", "0");
    $("#devices").css("pointer-events", "none");
    

    if($("#view").css("opacity") === "0"){
        $("#view").css("opacity", "1");
        $("#view").css("pointer-events", "initial");
        $("#view").css("left", "8%");
        $("#view").css("top", (mouseY - ($("#view").height() / 2)) + "px");
    } 
    else{
        $("#view").css("opacity", "0");
        $("#view").css("pointer-events", "none");
        $("#view").css("left", "7%");
        
    }   
}

function showDevices(){
    $("#scale").css("opacity", "0");
    $("#scale").css("pointer-events", "none");
    $("#scale").css("left", "7%");
    $("#rotate").css("opacity", "0");
    $("#rotate").css("pointer-events", "none");
    $("#rotate").css("left", "7%");
    $("#view").css("opacity", "0");
    $("#view").css("pointer-events", "none");
    $("#view").css("left", "7%");

    if($("#devices").css("opacity") === "0"){
        $("#devices").css("opacity", "1");
        $("#devices").css("pointer-events", "initial");
        $("#devices").css("left", "8%");
        $("#devices").css("top", (mouseY - ($("#devices").height() / 2)) + "px");
    } 
    else{
        $("#devices").css("opacity", "0");
        $("#devices").css("pointer-events", "none");
        $("#devices").css("left", "7%");
    }   
}

function showAdvanced(){
    $("#advanced").css("right", "0px");
    $("#advanced").css("opacity", "1");
    $("#sidebarR").css("right", "-14%");

}

function showBasic(){
    $("#advanced").css("right", "-14%");
    $("#advanced").css("opacity", "1");
    $("#sidebarR").css("right", "1%");

}

$(document).ready(function(){
    
    console.log("begin");
    $("#advanced").css("right", "-14%");
    $("#advanced").css("opacity", "0");

    $("#addfile").click(fileTransition);
    $("#scaleB").click(showToolS);
    $("#rotateB").click(showToolR);
    $("#scaleB2").click(showToolS);
    $("#rotateB2").click(showToolR);
    $("#advancedB").click(showAdvanced);
    $("#basicS").click(showBasic);
    $("#viewB").click(showView);
    $("#viewB2").click(showView);
    $("#devicesB").click(showDevices);
    $("#devicesB2").click(showDevices);
    $("#backB").click(showBasic);

    $(window).resize(function(){
        $("#sbl").css("top", (($(document).height() - $("#sbl").height()) / 2).toString());
        $("#sidebarR").css("top", (($(document).height() - $("#sidebarR").height()) / 2).toString());
    });

    $("#sbl").css("top", (($(document).height() - $("#sbl").height()) / 2).toString());
    $("#sidebarR").css("top", (($(document).height() - $("#sidebarR").height()) / 2).toString());

    $( document ).on( "mousemove", function( event ) {
        mouseX = event.pageX 
        mouseY = event.pageY
    });
});
