// class FillBucket extends PaintFunction{
//     constructor(contextReal,contextDraft){
//         super();
//         this.contextReal = contextReal;
//         this.contextDraft = contextDraft;
//         this.pixelStack; 
//     }


//     onMouseDown(coord, styleGuide, event){
//         this.pixelStack = [[coord[0], coord[1]]];
//     }
//     onDragging(){}
//     onMouseMove(){}
    


        
    
//     onMouseLeave(){}
//     onMouseEnter(){}
  
//     onMouseUp(coord, styleGuide, event){
//         while(this.pixelStack.length) {        
//             var newPos, x, y, pixelPos, reachLeft, reachRight;
//             newPos = this.pixelStack.pop();
//             x = newPos[0];
//             y = newPos[1];
//             let canvasWidth = this.contextReal.width; 
            
//             pixelPos = (y * this.contextReal.width + x) * 4;
//             while(y-- >= 0 /* drawingBoundTop */ && this.matchStartColor(pixelPos)) {        
//                 pixelPos -= this.contextReal.width * 4;
//             }
//             pixelPos += this.contextReal.width * 4;
//             ++y;
//             reachLeft = false;
//             reachRight = false;

//             while(y++ < this.contextReal.width-1 && this.matchStartColor(pixelPos)) {
//                 this.colorPixel(pixelPos);
//                 if(x > 0) {
//                     if(this.matchStartColor(pixelPos - 4)) {
//                         if(!reachLeft) {
//                             this.pixelStack.push([x - 1, y]);
//                             reachLeft = true;
//                         }
//                     }
//                     else if(reachLeft) {
//                         reachLeft = false;
//                     }
//                 }
//                 if (x < this.contextReal.width -1) {
//                     if (this.matchStartColor(pixelPos + 4)) {
//                         if(!reachRight) {
//                             this.pixelStack.push([x + 1, y]);
//                             reachRight = true;
//                         }
//                     } else if(reachRight) {
//                         reachRight = false;
//                     }
//                 }                    
//             pixelPos += this.contextReal.width * 4; 
//             }
//         }
//         context.putImageData(colorLayer, 0, 0);
//     }
  
//     matchStartColor(pixelPos) {
//         var r = colorLayer.data[pixelPos];	
//         var g = colorLayer.data[pixelPos+1];	
//         var b = colorLayer.data[pixelPos+2];
//         return (r == startR && g == startG && b == startB);
//     }

//     colorPixel(pixelPos) {
//         colorLayer.data[pixelPos] = fillColorR;
//         colorLayer.data[pixelPos+1] = fillColorG;
//         colorLayer.data[pixelPos+2] = fillColorB;
//         colorLayer.data[pixelPos+3] = 255;
//     }

// }  