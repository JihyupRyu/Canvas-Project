let zooming = false;

class Zoom extends PaintFunction {
    constructor(contextReal) {
        super();
        this.contextReal = contextReal;  
        this.scale = 1.0;
        this.factor = 1.05;
        this.zoomvalue = 100;
        this.img = new Image();
        this.img.src = canvasReal.toDataURL() // get a data-URL of the canvas
        this.width = canvasReal.width;
        this.height = canvasReal.height;
    };

    onMouseDown(coord,event) {  
        $('#canvas-container').css({ "cursor": "move" });
        if (zooming) {
            this.scale *= this.factor;
            this.draw(this.scale, coord);
            this.percentage(this.factor);
        } else {
            console.log(this.scale)
            this.scale /= this.factor;
            this.draw(this.scale, coord);
            this.percentage(1/this.factor);
        }
    };

    onDragging(coord,event){ 
        $('#canvas-container').css({ "cursor": "move" });
        this.draw(this.scale, coord);
    };

    onMouseUp(coord,event){
        if (zooming) {
            $('#canvas-container').css({ "cursor": "zoom-in" });
        } else {
            $('#canvas-container').css({ "cursor": "zoom-out" });
        };
        beforeDraw();
    };

    onMouseLeave(){    
        $('#canvas-container').css({ "cursor": "default"});
    };

    onMouseEnter(coord, event){}

    onMouseMove(coord,event){}
    

    draw(scale, coord){
        this.contextReal.clearRect(0, 0, this.width, this.height);
        this.contextReal.save(); //save the default state
        this.contextReal.scale(scale, scale);
        this.contextReal.translate((coord[0]  - this.width/2)*scale, (coord[1] - this.height/2)*scale);
        this.contextReal.drawImage(this.img, 0, 0); // draw the newest last img on the canvas
        this.contextReal.restore(); //restore it later, so that you are able to draw a rect with the default state later
    }

    percentage(num){
        this.zoomvalue *= num;
        document.getElementById("bold-zoom-number").innerHTML = `${Math.floor(this.zoomvalue)}%`;
    }
};