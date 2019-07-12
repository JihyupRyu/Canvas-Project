let editOuter = true;

$('#draw-rectangle').click(()=>{
    currentFunction = new DrawingRectangle(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-color-square').show();
    $('#brush-sliders').show();
    $('#color-square').show();

});
$('#draw-pen').click(()=>{
    currentFunction = new DrawingLine(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-color-dot').show();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#round-or-square').show();
    editOuter = true;
});
$('#draw-circle').click(()=>{
    currentFunction = new DrawingCircle(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-color-circle').show();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#big-circle').css({'background-color':styleGuide.drawColor});
});
$('#draw-line').click(()=>{
    currentFunction = new DrawingStraightLine(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-color-line').show();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#round-or-square').show();
    editOuter = true;
});
$('#curve-button').click(()=>{
    currentFunction = new DrawingCurve(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-curve').show();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#round-or-square').show();
    editOuter = true;
});
$('#draw-polygon').click(()=>{
    currentFunction = new DrawingPolygon(contextReal,contextDraft);
    turnEverythingOff();
    $('#current-color-polygon').show();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#round-or-square').show();
});


$('.emoji-image').click(function() {
    $('#this-emoji-picture').attr('src', $(this).attr('src'));
    styleGuide.emojiSource = $(this)[0];
});

$('#draw-emoji').click(()=>{
    $('#draw-rectangle').trigger('click');
    turnEverythingOff();
    $('#current-emoji').show();
    $('#emoji-square').show();
    $('#emoji-range-sliders').show();
    currentFunction = new DrawingEmoji(contextReal,contextDraft);
    $('#emoji-square-mini-1').trigger('click');
});

$('#fill-bucket').click(()=>{
    currentFunction = new ColorBucket(contextReal,contextDraft);
    turnEverythingOff();
    $('#color-square').show();
    $('#brush-sliders').show();
    $('#current-paint-bucket').show();
    $('#fill-bucket-icon').css({'color':styleGuide.fillColor}); 
    editOuter = false;
});

$('#text-button').click(()=>{
    currentFunction = new Text(contextReal,contextDraft);
    turnEverythingOff();
    $('#color-square').show();
    $('#font-range-sliders').show();
    $('#current-font').show();
    $('#font-icon').css({'color':styleGuide.fillColor}); 
    editOuter = false;
});


$('#filter-button').click(()=>{
    turnEverythingOff();
    $('#filter-sliders').show();
    $('#this-filter').show();
    
    $('#range-container').css({'border':'0px'});
});

$('#selector-button').click(()=>{
    turnEverythingOff();
   
    $('#this-selector').show();
});

$('#zoom-in').click(()=>{
    $('#canvas-container').css({ "cursor": "zoom-in" });
    if (currentFunction instanceof Zoom) {
    } 
    else {
        currentFunction = new Zoom(contextReal,contextDraft);
        turnEverythingOff();
        $('#zoom-counter').show();
    }
    zooming = true;
});


$('#zoom-out').click(()=>{
    $('#canvas-container').css({ "cursor": "zoom-out" });
    if (currentFunction instanceof Zoom) {
    } 
    else {
        currentFunction = new Zoom(contextReal,contextDraft);
        turnEverythingOff();
        $('#zoom-counter').show();
    }
    zooming = false;
});

function turnEverythingOff() {
    $('#zoom-counter').hide();
    $('#current-color-circle').hide();
    $('#current-color-square').hide();
    $('#current-color-line').hide();
    $('#current-color-dot').hide();
    $('#current-color-polygon').hide();
    $('#current-emoji').hide();
    $('#emoji-square').hide();
    $('#color-square').hide();
    $('#brush-width-pallete').hide();
    $('#emoji-range-sliders').hide();
    $('#font-range-sliders').hide();
    $('#brush-sliders').hide();
    $('#round-or-square').hide();
    $('#current-paint-bucket').hide();
    $('#current-font').hide();
    $('#current-curve').hide();
    $('#filter-sliders').hide();
    $('#range-container').css({'border':'0px dotted gray'});
    $('#this-selector').hide();
    $('#this-filter').hide();
}




$('#clear-button').click(()=>{
    deleteBoard();
    beforeDraw();
});



/* Start-up Functions */

currentFunction = new DrawingRectangle(contextReal,contextDraft); 
$('#draw-rectangle').trigger('click');
$('#pic1').trigger('click');
deleteBoard();



/* style buttons */

$('.color-square-mini').click(function() {
    changeColors($(this).css('background-color'));
});

$('.sp-choose').click(function() {
    changeColors($('.sp-preview-inner').css('background-color'));
});

function changeColors(newColor) {
    let hereWeFill = newColor;
    if(newColor == 'rgba(0, 0, 0, 0)') {hereWeFill = "white";}
    
    if (editOuter) {
        styleGuide.drawColor = newColor;
        $('#big-circle').css({'background-color':hereWeFill});
        $('#big-square').css({'background-color':hereWeFill});
        $('#big-line').css({'background-color':hereWeFill});
        $('#big-dot').css({'background-color':hereWeFill});
        $('#current-curve').css({'stroke':hereWeFill}); 
        $('#current-color-polygon').css({'stroke':hereWeFill});
              
    } else {
        styleGuide.fillColor = newColor;
        $('#small-circle').css({'background-color':hereWeFill});
        $('#small-square').css({'background-color':hereWeFill});
        $('#small-polygon').css({'background-color':hereWeFill});
        $('#fill-bucket-icon').css({'color':hereWeFill}); 
        $('#font-icon').css({'color':hereWeFill});
        $('#current-color-polygon').css({'fill':hereWeFill}); 
    }
}


$('#small-circle').click(function() {
    editOuter = false;
});


$('#small-circle').click(function() {
    editOuter = false;
});

$('#fill-bucket-icon').click(function(){
    editOuter = false;
});

$('#big-circle').click(function() {
    editOuter = true;
});

$('#small-square').click(function() {
    editOuter = false;
});

$('#big-square').click(function() {
    editOuter = true;
});

$('#small-polygon').click(function() {
    editOuter = false;
});

$('#big-polygon').click(function() {
    editOuter = true;
});

$('#big-line').click(function() {
    editOuter = true;
});

$('#big-dot').click(function() {
    editOuter = true;
});

$('#fill-bucket-icon').click(function() {
    editOuter = true;
});

$('#font-icon').click(function() {
    editOuter = false;
});

$('#current-curve').click(function() {
    editOuter = true;
});

$('#current-color-polygon').click(function() {
    if (editOuter == false) {editOuter = true;} else {editOuter = false;}
});


$('#emoji-range').change( function() {
    styleGuide.emojiLength = $('#emoji-range').val();
    $('#emoji-size-number').html(styleGuide.emojiLength);
});

$('#font-range').change( function() {
    styleGuide.textSize = $('#font-range').val();
    $('#font-size-number').html(styleGuide.textSize);
});

$('#brush-range').change( function() {
    styleGuide.penWidth = $('#brush-range').val();
    if (styleGuide.dashed != []) { 
        styleGuide.dashed = [0, 2 * styleGuide.penWidth];
    }
    console.log(styleGuide);
    $('#brush-size-number').html(styleGuide.penWidth);
});


$('#dashed-toggle').change( function() {
   if(($('#dashed-toggle')[0].checked) == true) {
       styleGuide.dashed = [0, 2 * styleGuide.penWidth];
       setCanvasToStyleGuide();
   } else {
        styleGuide.dashed = [];
        setCanvasToStyleGuide();
   }
});

$('#rounded-toggle').change( function() {
    if(($('#rounded-toggle')[0].checked) == true) {
        styleGuide.lineCap = 'square';
        $('#big-line').css({'borderRadius':0});
        $('#big-dot').css({'borderRadius':0});
        setCanvasToStyleGuide();
    } else {
        styleGuide.lineCap = 'round';
        $('#big-line').css({'borderRadius':12});
        $('#big-dot').css({'borderRadius':12});
        setCanvasToStyleGuide();
    }
 });

 $('#rounded-toggle').bootstrapToggle('off');
 



 


