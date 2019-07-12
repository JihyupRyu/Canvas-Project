class DrawingRectangle extends PaintFunction{
    constructor(contextReal,contextDraft){
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
            if(e.key == 'Escape' || keyListeners.escape == true) {
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.escape = true;
            } 
        });
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextDraft);
        
    }

    
    onMouseUp(coord, styleGuide, event){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.checkAndDraw(this.origX, this.origY, coord[0], coord[1], this.contextReal);
        
    }
    
    onMouseMove(){}
    onMouseLeave(){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.escape = true;
    }
    onMouseEnter(){}



    checkAndDraw (x1, y1, x2, y2, context) {
        
        if (this.escape == false && keyListeners.escape == false) {
            if (keyListeners.shift == false) {
                this.drawRect(x1, y1, x2 - x1 , y2 - y1, context);
            } else {
                this.drawSquare(x1 , y1, x2, y2, context);
            }
            beforeDraw();
        } 
    }

    drawRect(x1, y1, x2, y2, context) {
        context.beginPath();
        context.rect(x1, y1, x2, y2);
        context.stroke();
        context.fill();
    }

    drawSquare(x1, y1, x2, y2, context) {
        if ((y2 - y1) * (x2 - x1) > 0) {
            if (y2 - y1 > 0) {
                this.drawRect(x1, y1, Math.max(x2 - x1, y2 - y1), Math.max(x2 - x1, y2 - y1), context);
            } else {
                this.drawRect(x1, y1, Math.min(x2 - x1, y2 - y1), Math.min(x2 - x1, y2 - y1), context);
            }
        } else {
            if (y2 - y1 > 0) {
                this.drawRect(x1, y1, -Math.max(Math.abs(x2 - x1), y2 - y1), Math.max(Math.abs(x2 - x1), y2 - y1), context);
            } else {
                this.drawRect(x1, y1, Math.max(Math.abs(x2 - x1), y2 - y1), -Math.max(Math.abs(x2 - x1), y2 - y1), context);
            } 
        }
    }
}
