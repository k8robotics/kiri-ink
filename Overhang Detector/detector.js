var canvas;
var draw;
var slicenum = 0;

function drawRectangel(x, y, width, height){
    draw.fillStyle = "#ffffff";
    draw.fillRect(x,w,width,height);
}

function addDocument(){

}

function start(){
    canvas = document.getElementById("canvas");
    draw = canvas.getContext("2d");
}

function dropHandler(ev){
    var file;
    ev.preventDefault();
    if(ev.dataTransfer.items){
        file = ev.dataTransfer.items[0].getAsFile();
    }
    parsegCode(file);
}

function parsegCode(file){
    console.log(file);
    var fr = new FileReader();
    fr.onload = function(e) {
        lines = e.target.result.split("\n");
        lines.array.forEach(element => {
            parseLine(element);
        });
    }
    fr.readAsText(file);
}

function parseLine(line){
    if(line.substring(0,4) === "G0 Z"){
        console.log("slice #" + slicenum);
        slicenum ++;
    }
}

function parseSlice(line){

}
function dragOverHandler(ev){
    ev.preventDefault();
}