let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

let styleGuide = {  drawColor: "rgb(0,0,0)", fillColor: "rgb(0,0,255)", penWidth: 10, 
                    dashed: [], lineCap: "round", // for dashes, put in the distance, for none make array empty
                    emojiSource: '', emojiLength: 72, backgroundColor: 'white',
                    textSize: 15, font: 'Arial'
                };

let keyListeners = {shift: false, escape: false} //, escape: false, delete: false, type: true} 




$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseDown([mouseX,mouseY], styleGuide, e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    if(dragging){
        currentFunction.onDragging([mouseX,mouseY], styleGuide, e);
    }
    currentFunction.onMouseMove([mouseX,mouseY], styleGuide, e);
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY], styleGuide, e);
});

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX,mouseY], styleGuide, e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX,mouseY], styleGuide, e);
});

class PaintFunction{
    constructor(){}
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}    

function setCanvasToStyleGuide (multiplier) {
    contextReal.restore();
    contextDraft.restore();
    contextReal.strokeStyle = contextDraft.strokeStyle = styleGuide.drawColor;
    if (styleGuide.fillColor != 'rgba(0, 0, 0, 0)') {
        contextReal.lineWidth = contextDraft.lineWidth = styleGuide.penWidth * multiplier;
    } else {contextReal.lineWidth = contextDraft.lineWidth = styleGuide.penWidth;}
    contextReal.fillStyle = contextDraft.fillStyle = styleGuide.fillColor;
    contextReal.setLineDash(styleGuide.dashed);
    contextDraft.setLineDash(styleGuide.dashed);
    contextReal.lineCap = contextDraft.lineCap = styleGuide.lineCap;
}

function deleteBoard () {
    contextReal.fillStyle = '#FFFFFF';
    contextReal.fillRect(0,0,canvasDraft.width,canvasDraft.height);
    contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
}

/* Key Listeners */


$(document).keydown((e) => {
    if(e.key == 'Shift') {
        keyListeners.shift = true;
    }
    if(e.key == 'Escape') {
        keyListeners.escape = true;
    }
});

$(document).keyup((e) => {
    if(e.key == 'x' || e.key == 'X') {
        let holder = styleGuide.fillColor;
        styleGuide.fillColor = styleGuide.drawColor;
        styleGuide.drawColor = holder;
        if(editOuter) {
            changeColors(styleGuide.drawColor);
            editOuter = false;
            changeColors(styleGuide.fillColor);
        } else {
            changeColors(styleGuide.fillColor);
            editOuter = true;
            changeColors(styleGuide.drawColor);
        }
        // $('#big-circle').css({'background-color':styleGuide.drawColor});
        // $('#small-circle').css({'background-color':styleGuide.fillColor});
        // $('#big-square').css({'background-color':styleGuide.drawColor});
        // $('#small-square').css({'background-color':styleGuide.fillColor});
        // $('#big-line').css({'background-color':styleGuide.drawColor});
        // $('#big-dot').css({'background-color':styleGuide.drawColor});
        // $('.brush-holder').css({'background-color':styleGuide.drawColor});
        // $('#big-polygon').css({'background-color':styleGuide.drawColor});
        // $('#small-polygon').css({'background-color':styleGuide.fillColor});
        // $('#big-polygon').css({'background-color':styleGuide.drawColor});
        // $('#small-polygon').css({'background-color':styleGuide.fillColor});
        // $('#fill-bucket-icon').css({'color':styleGuide.fillColor}); 
        // $('#font-icon').css({'color':styleGuide.drawColor});

    } 
    if(e.key == 'Shift') {
        keyListeners.shift = false;
    }
    if(e.key == 'Escape') {
        keyListeners.escape = false;
    }
});



