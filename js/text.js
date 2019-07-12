let fontBoxCounter = false;  

$('#font-picker-selector').change( function() {
    styleGuide.font = ($('#font-picker-selector option:selected').text());
});

class Text extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.origX = null;
        this.origY = null;
    }

    onMouseDown(coord, styleGuide, event){  
        
        if (fontBoxCounter == false) {
            
            this.origX = coord[0];
            this.origY = coord[1];
            this.contextReal.font = `${styleGuide.textSize}px ${styleGuide.font}`;
            this.contextReal.fillStyle = styleGuide.fillColor;
            var input = document.createElement('input');
            input.type = 'text';
            input.style.position = 'fixed';
            input.style.border = "2px red solid";
            input.style.placeholder = 'Type please!';
            input.style.height = 40;
            input.style.width = 350;
            input.style.font = styleGuide.font;
            input.placeholder = "To add text, click here, type, and push 'Enter'";
            input.style.left = (this.origX - 5) + 'px'; //the position of input when you click mouse//
            input.style.top = (this.origY - 5) + 'px';
            input.id= 'textBox' 
            document.body.appendChild(input);
            fontBoxCounter = true;

            input.onkeydown = function handleEnter(input) {
                if (input.key == 'Enter') {
                    this.typedText= document.getElementById("textBox").value;
                    contextReal.fillText(this.typedText,event.clientX + 30,event.clientY - 20);
                    document.body.removeChild(this);
                    fontBoxCounter = false;
                    beforeDraw();
                }
            };   
        } 
    }

    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(coord){
        if(coord[0] < this.origX + 300 && coord[0] > this.origX - 300 && coord[1] < this.origY + 40 && coord[1] > this.origY - 40) {
        } else {
            $('#textBox').remove();
            fontBoxCounter = false;
        }
    }
    onMouseEnter(){}
}
