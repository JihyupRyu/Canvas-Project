let poly_min_range = 15;
let poly_doubleClickLimit = 350;

class DrawingPolygon extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;           
        this.new = true;
        this.coords = [];
    }
    
    setPolygonNewTrue() {
        this.new = false;
    }

    onMouseDown(coord, styleGuide, event){
        if (this.new) {
            this.coords = [];
            setCanvasToStyleGuide(1); 
            this.origX = this.stepX = coord[0];
            this.origY = this.stepY = coord[1];
            
        } else {   
            this.drawLine(this.stepX, this.stepY, coord[0], coord[1], this.contextDraft);
        } 
    }

    onDragging(coord, styleGuide, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawLine(this.stepX, this.stepY, coord[0], coord[1], this.contextDraft);
    }

    onMouseUp(coord, styleGuide, event){    
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.drawLine(this.stepX, this.stepY, coord[0], coord[1], this.contextReal);
        this.coords.push(coord);
        this.stepX = coord[0];
        this.stepY = coord[1]; 
        
        // Check to see if the last line ended within min_range of the polygon's starting coordinates

        if ((Math.abs(this.stepX - this.origX) < poly_min_range && Math.abs(this.stepY - this.origY) < poly_min_range && this.new == false) ||
        ((event.timeStamp - this.doubleClickTimeCheck) < poly_doubleClickLimit)) {
            // this.drawLine(coord[0], coord[1], this.origX, this.origY, this.contextReal)
            let region = new Path2D();
            region.moveTo(this.origX, this.origY);
            for (var i = 0; i < this.coords.length; i++) {
                region.lineTo(this.coords[i][0], this.coords[i][1]);
            }
            setCanvasToStyleGuide(1);
            region.closePath();
            this.contextReal.fill(region);
            this.contextReal.stroke(region);
            beforeDraw();
            this.new = true;
            this.coords = [];

        } else this.new = false;

        this.doubleClickTimeCheck = event.timeStamp;
    }

    drawLine (x1, y1, x2, y2, context) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();    
    }

    onMouseLeave(){
        

        this.contextReal.beginPath();
        this.contextReal.moveTo(this.stepX, this.stepY);
        this.contextReal.lineTo(this.origX, this.origY);
        this.contextReal.stroke();
        this.contextReal.fillStyle = styleGuide.fillColor;
        this.contextReal.fill();
        this.coords = [];
        this.new = true;       
    }

    onMouseEnter(){}
    onMouseMove(){}
    
}

