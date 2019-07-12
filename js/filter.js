  
var blur = document.getElementById('blur-range');
var brightness = document.getElementById('brightness-range');
var grayscale = document.getElementById('grayscale-range');
var invert = document.getElementById('invert-range');
var opacity = document.getElementById('opacity-range');
var saturate = document.getElementById('saturate-range');




$('#filter-sliders').on('click', function(e) {     

    if($('#blur-box').prop("checked")){
        console.log('blur');
        $('#blur-range').change(() => {
            drawCanvas();
        }) 
    }

    if($('#grayscale-box').prop("checked")){
        $('#grayscale-range').change(() => {
            drawCanvas();
        }) 
    }

    if($('#brightness-box').prop("checked")){
        $('#brightness-range').change(() => {
            drawCanvas();
        }) 
    }

    if($('#invert-box').prop("checked")){
        $('#invert-range').change(() => {
            drawCanvas();
        }) 
    }

    if($('#opacity-box').prop("checked")){
        $('#opacity-range   ').change(() => {
            drawCanvas();
        }) 
    }

    $('#remove-all').click(() => {
        contextReal.canvas.style.filter = null;
        $('.filter-boxes input').prop('checked', false)
    }) 

    function drawCanvas() {
        contextReal.canvas.style.filter = `blur(${this.blur.value}px) grayscale(${this.grayscale.value}%) brightness(${this.brightness.value}%) invert(${this.invert.value}%) opacity(${this.opacity.value}%)`
    }

});

