selectorDashLength = 6;
selectorLineColor = "black";
selectorLineWidth = 1;
minSizeNecessary = 3

$('#selector-button').click(() => {

    currentFunction = new Selecting(contextReal,contextDraft);

});

class Selecting extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;   
        this.objX;
        this.objY;
        this.objDraft = null;
        this.obj = null;
        this.selectionMade = false;
        this.originalMove = false;
    };

    onMouseDown(coord,event){

        if (this.selectionMade == false) { 

            this.contextReal.setLineDash([selectorDashLength]);
            this.contextDraft.setLineDash([selectorDashLength]);
            this.contextReal.lineWidth = this.contextDraft.lineWidth = selectorLineWidth;
            this.origX = coord[0];
            this.origY = coord[1];

        } else {
            
            this.adjustPoints();

            if ((coord[0] > this.origX) && (coord[0] < this.objX) && (coord[1] > this.origY) && (coord[1] < this.objY)) {

                
                if (this.originalMove == true) {
                    this.contextReal.clearRect(this.origX, this.origY, this.obj.width, this.obj.height);
                    this.originalMove = false;
                }
                this.putImage([this.objDraft, this.origX, this.origY], [this.obj, this.origX, this.origY]);                
            } else {   
                this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                this.contextReal.putImageData(this.obj, this.origX, this.origY);
                this.origX = coord[0];
                this.origY = coord[1];
                this.selectionMade = false;
                this.objDraft = null;
                this.obj = null;
                this.originalMove = false;
            }
        }   
    };


    onDragging(coord,event){

        if (this.selectionMade == false) {


            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.rect(this.origX,this.origY,coord[0] - this.origX,coord[1] - this.origY)
            this.contextDraft.stroke();

        }  else  {

            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.putImage([this.objDraft, coord[0] - this.objDraft.width/2, coord[1] - this.objDraft.height/2], [this.obj, coord[0] - this.obj.width/2, coord[1] - this.obj.height/2])
        }
    };

    onMouseUp(coord){
        
        if (this.selectionMade == false) {

            this.objX = coord[0];
            this.objY = coord[1];

            if (this.checkSize() == true) {
                this.getDraftImage(coord);
                this.obj = this.contextReal.getImageData(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY); 
                this.selectionMade = true;
                this.originalMove = true;
            } else this.selectionMade = false;

        }   else  { 

            this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
            this.putImage([this.objDraft, coord[0] - this.objDraft.width/2, coord[1] - this.objDraft.height/2], [this.obj, coord[0] - this.obj.width/2, coord[1] - this.obj.height/2])
            this.origX = coord[0] - this.obj.width/2 ;
            this.origY = coord[1] - this.obj.height/2;
            this.objX = coord[0] + this.obj.width/2;
            this.objY = coord[1] + this.obj.height/2;

        }
        
    };

    onMouseMove(coord){
        if (this.selectionMade == true) {
            {
                event.target.style.cursor = 'move';
            }
        } else {
            event.target.style.cursor = 'default';
        };
    };

    putImage(obj1, obj2) {
        this.contextDraft.putImageData(obj1[0], obj1[1], obj1[2]);
        this.contextDraft.putImageData(obj2[0], obj2[1], obj2[2]);
    };
    onMouseLeave(){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.putImageData(this.obj, this.origX, this.origY);
        this.selectionMade = false;
        this.objDraft = null;
        this.obj = null;
        this.origX = null;
        this.origY = null;
        this.originalMove = false;
    }
    onMouseEnter(){}

    checkCursorInSelection(coord) {
        let minX = Math.min(this.origX, this.objX);
        let minY = Math.min(this.origY, this.objY);

        if (coord[0] < (minX + Math.abs(this.origX - this.objX)) && coord[0] >= minX &&
            coord[1] < (minY + Math.abs(this.origY - this.objY)) && coord[1] >= minY) return true;
        else return false; 
    }

    checkSize () {
        if (Math.abs(this.origX - this.objX) > minSizeNecessary && Math.abs(this.origY - this.objY)  > minSizeNecessary) return true;
        else return false;
    }

    getDraftImage (coord) {
        if ((this.objX < this.origX) && (this.objY > this.origY)) {  
            this.objDraft = this.contextDraft.getImageData(this.origX + 2, this.origY - 2, coord[0] - this.origX - 4, coord[1] - this.origY + 4);
        } else if ((this.objX < this.origX) && (this.objY < this.origY)) {  
            this.objDraft = this.contextDraft.getImageData(this.origX + 2, this.origY + 2, coord[0] - this.origX - 4, coord[1] - this.origY - 4);
        } else if ((this.objX > this.origX) && (this.objY < this.origY)) {   
            this.objDraft = this.contextDraft.getImageData(this.origX - 2, this.origY + 2, coord[0] - this.origX + 4, coord[1] - this.origY - 4);
        } else {
            this.objDraft = this.contextDraft.getImageData(this.origX - 2, this.origY - 2, coord[0] - this.origX + 4, coord[1] - this.origY + 4);
        }
    }

    adjustPoints () {
        if ((this.objX < this.origX) && (this.objY > this.origY)) {    //drag from right top

            this.origX -= this.obj.width;
            this.objX += this.obj.width;

        } else if ((this.objX < this.origX) && (this.objY < this.origY)) {    //drag from right bottom

            this.origX -= this.obj.width;
            this.origY -= this.obj.height;
            this.objX += this.obj.width;
            this.objY += this.obj.height;

        } else if ((this.objX > this.origX) && (this.objY < this.origY)) {    //drag from left bottom

            this.origY -= this.obj.height;
            this.objY += this.obj.height;

        };
    }

    resetVariables () {
        this.selectionMade = false;
        this.obj = null;
        this.objDraft = null;
        this.objX = null;
        this.objY = null;
        this.origX = null;
        this.origY = null;
        this.originalMove = false;
    }

}



// $('#selecting').click(() => {

//     currentFunction = new Selecting(contextReal,contextDraft);

// });

// class Selecting extends PaintFunction{
//     constructor(contextReal,contextDraft){
//         super();
//         this.contextReal = contextReal;
//         this.contextDraft = contextDraft;   
//         this.move = 0;     
//         this.obj = null;
//         this.objDraft = null;
//         this.mouseStyle = false;
//     };
//         //this.move = 0, 
//         //this.move = 1, first mouse down
//         //this.move = 2, second mouse down
//         //this.move = 3, 3rd, 4th , 5th.......mouse down


//     onMouseDown(coord,event){

//         if (this.move == 0) { 
            
//             this.contextReal.setLineDash([6]);
//             this.origX = coord[0];
//             this.origY = coord[1];
//             this.move++;
//             //move = 1

//         }   else if (this.move == 1) {

//             if ((coord[0] < this.origX) && (coord[1] > this.origY)) {
//                 this.origX -= this.obj.width;
//                 this.objX += this.obj.width;
//             } else if ((coord[0] < this.origX) && (coord[1] < this.origY)) {
//                 this.origX -= this.obj.width;
//                 this.origY -= this.obj.height;
//                 this.objX += this.obj.width;
//                 this.objY += this.obj.height;
//             } else if ((coord[0] > this.origX) && (coord[1] < this.origY)) {
//                 this.origY -= this.obj.height;
//                 this.objY += this.obj.height;
//             } 

//             if (((coord[0] > this.origX) && (coord[0] < this.objX)) || ((coord[0] < this.origX) && (coord[0] > this.objX)) || ((coord[1] > this.origY) && (coord[1] < this.objY)) || ((coord[1] < this.origY) && (coord[1] > this.objY))) {

//                 this.contextReal.clearRect(this.origX, this.origY, this.obj.width, this.obj.height);
//                 this.putImage([this.objDraft, this.origX, this.origY], [this.obj, this.origX, this.origY]);
//                 this.move++;
//                 //move = 2

//             }   else {

//                 this.contextReal.putImageData(this.obj, this.origX, this.origY);
//                 this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//                 this.move = 0;
//                 this.obj = null;
//                 this.objDraft = null;
//                 this.mouseStyle = false;

//             }
            
//         }   else if (((this.move == 2) && (coord[0] > this.origX) && (coord[1] > this.origY) && (coord[0] < this.objX) && (coord[1] < this.objY))) {
  
//             this.putImage([this.objDraft, this.origX, this.origY], [this.obj, this.origX + 2, this.origY + 2]);
//             this.move++;
           
//         }   else {
        
//             this.contextReal.putImageData(this.obj, this.origX + 2, this.origY + 2);
//             this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//             this.move = 0;
//             this.obj = null;
//             this.objDraft = null;
//             this.mouseStyle = false;
//         };
//     };


//     onDragging(coord,event){

//         if (this.move == 1) {
   
//             this.contextDraft.beginPath();
//             this.contextDraft.strokeStyle = 'black';
//             this.contextDraft.setLineDash([6]);
//             this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//             this.contextDraft.rect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
//             this.contextDraft.stroke();

//         }  else if (this.move == 2) {

//             this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//             this.putImage([this.objDraft, coord[0] - this.objDraft.width/2, coord[1] - this.objDraft.height/2], [this.obj, coord[0] - this.obj.width/2, coord[1] - this.obj.height/2]);

//         }   else if (this.move == 3) {

//             this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//             this.putImage([this.objDraft, coord[0] - this.objDraft.width/2, coord[1] - this.objDraft.height/2], [this.obj, coord[0] - this.obj.width/2, coord[1] - this.obj.height/2])
//             this.move --;
//         };
//     };

//     onMouseUp(coord){
//         if (this.move == 1) {

//             this.objDraft = this.contextDraft.getImageData(this.origX - 2, this.origY - 2, coord[0] - this.origX + 4, coord[1] - this.origY+4);
//             this.obj = this.contextReal.getImageData(this.origX, this.origY, coord[0]- this.origX, coord[1] - this.origY);
//             this.objX = coord[0];
//             this.objY = coord[1];

//             this.mouseStyle = true;


//         }   else if (this.move == 2) {
             
//             this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
//             this.putImage([this.objDraft, coord[0] - this.objDraft.width/2, coord[1] - this.objDraft.height/2], [this.obj, coord[0] - this.obj.width/2, coord[1] - this.obj.height/2])
           

//             this.origX = coord[0] - this.obj.width/2 ;
//             this.origY = coord[1] - this.obj.height/2;
//             this.objX = coord[0] + this.obj.width/2;
//             this.objY = coord[1] + this.obj.height/2;
//         };
//     };

//     onMouseMove(){
//         if (this.mouseStyle) {
//             event.target.style.cursor = 'move';
//         } else {
//             event.target.style.cursor = 'default';
//         };
//     };

//     putImage(obj1, obj2) {
//         this.contextDraft.putImageData(obj1[0], obj1[1], obj1[2]);
//         this.contextDraft.putImageData(obj2[0], obj2[1], obj2[2]);
//     };
//     onMouseLeave(){}
//     onMouseEnter(){}
// };

