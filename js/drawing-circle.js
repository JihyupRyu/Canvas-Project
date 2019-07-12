class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft){
        super();
        this.contextReal = contextReal;    
        this.contextDraft = contextDraft;      
        this.escape = false;               
    }
    
    onMouseDown(coord, styleGuide, event){
        this.escape = false;           
        setCanvasToStyleGuide(2);
        contextReal.setLineDash([]);
        contextDraft.setLineDash([]);
        this.origX = coord[0];
        this.origY = coord[1];
    }
     
    onDragging(coord, styleGuide, event){
        $(document).keyup((e) => {
            if(e.key == 'Escape') {
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.escape = true;
            } 
        });
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextDraft);
    }

    onMouseUp(coord) {
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextReal);
        this.escape = false;
    }

    onMouseLeave(){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.escape = true;
    }

    onMouseEnter(){}
    onMouseMove(){}

    checkAndDraw (x1, y1, x2, y2, context) {
        if (this.escape == false) {
            if (keyListeners.shift == false) {
                this.drawEllipse(x1, y1, x2, y2, context);
            } else {
                this.drawCircle(x1, y1, x2, y2, context);
            }
            beforeDraw();
        }
    }

    drawCircle (x1, y1, x2, y2, context) {
        context.beginPath();
        context.arc(x1, y1, Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2), 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }

    drawEllipse (x1, y1, x2, y2, context) {
        context.beginPath();
        context.ellipse(x1, y1, Math.abs(x2 - x1), Math.abs(y2 - y1), 0, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
    }
}
