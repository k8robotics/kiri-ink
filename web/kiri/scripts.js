jQuery.noConflict()

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
    description.innerHTML = "You seem to be using an outdated browser we don't support. Please use Firefox, Chrome or Edge.";
    /*
    dropbox.classList.add("drop-box");
    button.classList.add("add-file");
    button.id = "addfile";
    button.innerHTML = "ADD FILES";
    indicator.src = "indicators.png";
    indicator.id = "indicator";
    indicator.classList.add("indicate");
    */
    document.body.appendChild(cover);
    document.body.appendChild(popup);
    popup.appendChild(header);
    header.appendChild(logo);
    popup.appendChild(contents);
    contents.appendChild(title);
    contents.appendChild(description);
    //contents.appendChild(dropbox);
    //dropbox.appendChild(button);
    //popup.appendChild(indicator);

}

function fileTransition(){
    console.log("clicked");
    jQuery("#contents").children().animate({
        opacity:0,
        "margin-left": "-50",
        }, 100, function(){}
    );
    jQuery("#indicator").attr('src','indicators2.png');
}

function showToolS(){
    jQuery("#rotate").css("left", "7%");
    jQuery("#rotate").css("opacity", "0");
    jQuery("#rotate").css("pointer-events", "none");
    jQuery("#view").css("left", "7%");
    jQuery("#view").css("opacity", "0");
    jQuery("#view").css("pointer-events", "none");
    jQuery("#devices").css("left", "7%");
    jQuery("#devices").css("opacity", "0");
    jQuery("#devices").css("pointer-events", "none");
    

    if(jQuery("#scale").css("opacity") === "0"){
        jQuery("#scale").css("opacity", "1");
        jQuery("#scale").css("pointer-events", "initial");
        jQuery("#scale").css("left", "8%");
        jQuery("#scale").css("top", (mouseY - (jQuery("#scale").height() / 2)) + "px");
    } 
    else{
        jQuery("#scale").css("opacity", "0");
        jQuery("#scale").css("pointer-events", "none");
        jQuery("#scale").css("left", "7%");
        
    }  
}

function showToolR(){
    jQuery("#scale").css("left", "7%");
    jQuery("#scale").css("opacity", "0");
    jQuery("#scale").css("pointer-events", "none");
    jQuery("#view").css("left", "7%");
    jQuery("#view").css("opacity", "0");
    jQuery("#view").css("pointer-events", "none");
    jQuery("#devices").css("left", "7%");
    jQuery("#devices").css("opacity", "0");
    jQuery("#devices").css("pointer-events", "none");
    

    if(jQuery("#rotate").css("opacity") === "0"){
        jQuery("#rotate").css("opacity", "1");
        jQuery("#rotate").css("pointer-events", "initial");
        jQuery("#rotate").css("left", "8%");
        jQuery("#rotate").css("top", (mouseY - (jQuery("#rotate").height() / 2)) + "px");
    } 
    else{
        jQuery("#rotate").css("opacity", "0");
        jQuery("#rotate").css("pointer-events", "none");
        jQuery("#rotate").css("left", "7%");
    }   
}


function showView(){
    jQuery("#scale").css("left", "7%");
    jQuery("#scale").css("opacity", "0");
    jQuery("#scale").css("pointer-events", "none");
    jQuery("#rotate").css("left", "7%");
    jQuery("#rotate").css("opacity", "0");
    jQuery("#rotate").css("pointer-events", "none");
    jQuery("#devices").css("left", "7%");
    jQuery("#devices").css("opacity", "0");
    jQuery("#devices").css("pointer-events", "none");
    

    if(jQuery("#view").css("opacity") === "0"){
        jQuery("#view").css("opacity", "1");
        jQuery("#view").css("pointer-events", "initial");
        jQuery("#view").css("left", "8%");
        jQuery("#view").css("top", (mouseY - (jQuery("#view").height() / 2)) + "px");
    } 
    else{
        jQuery("#view").css("opacity", "0");
        jQuery("#view").css("pointer-events", "none");
        jQuery("#view").css("left", "7%");
        
    }   
}

function showDevices(){
    jQuery("#scale").css("opacity", "0");
    jQuery("#scale").css("pointer-events", "none");
    jQuery("#scale").css("left", "7%");
    jQuery("#rotate").css("opacity", "0");
    jQuery("#rotate").css("pointer-events", "none");
    jQuery("#rotate").css("left", "7%");
    jQuery("#view").css("opacity", "0");
    jQuery("#view").css("pointer-events", "none");
    jQuery("#view").css("left", "7%");

    if(jQuery("#devices").css("opacity") === "0"){
        jQuery("#devices").css("opacity", "1");
        jQuery("#devices").css("pointer-events", "initial");
        jQuery("#devices").css("left", "8%");
        jQuery("#devices").css("top", (mouseY - (jQuery("#devices").height() / 2)) + "px");
    } 
    else{
        jQuery("#devices").css("opacity", "0");
        jQuery("#devices").css("pointer-events", "none");
        jQuery("#devices").css("left", "7%");
    }   
}

function showAdvanced(){
    jQuery("#advanced").css("right", "0px");
    jQuery("#advanced").css("opacity", "1");
    jQuery("#sidebarR").css("right", "-14%");

}

function showBasic(){
    jQuery("#advanced").css("right", "-14%");
    jQuery("#advanced").css("opacity", "1");
    jQuery("#sidebarR").css("right", "1%");

} 


// Function curtosy of SpiderCode on Stack overflow

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        DrawWelcome();
    }
}

jQuery(document).ready(function(){
    
    msieversion()
    
    console.log("begin");
    jQuery("#advanced").css("right", "-14%");
    jQuery("#advanced").css("opacity", "0");

    jQuery("#addfile").click(fileTransition);
    jQuery("#scaleB").click(showToolS);
    jQuery("#rotateB").click(showToolR);
    jQuery("#scaleB2").click(showToolS);
    jQuery("#rotateB2").click(showToolR);
    jQuery("#advancedB").click(showAdvanced);
    jQuery("#basicS").click(showBasic);
    jQuery("#viewB").click(showView);
    jQuery("#viewB2").click(showView);
    jQuery("#devicesB").click(showDevices);
    jQuery("#devicesB2").click(showDevices);
    jQuery("#backB").click(showBasic);

    jQuery(window).resize(function(){
        jQuery("#control-left").css("top", ((jQuery(document).height() - jQuery("#control-left").height()) / 2).toString());
        jQuery("#sidebarR").css("top", ((jQuery(document).height() - jQuery("#sidebarR").height()) / 2).toString());
    });

    jQuery("#control-left").css("top", ((jQuery(document).height() - jQuery("#control-left").height()) / 2).toString());
    jQuery("#sidebarR").css("top", ((jQuery(document).height() - jQuery("#sidebarR").height()) / 2).toString());

    jQuery( document ).on( "mousemove", function( event ) {
        mouseX = event.pageX 
        mouseY = event.pageY
    });
});
