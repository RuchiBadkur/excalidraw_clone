const canvas = document.getElementById("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// CanvasRenderingContext2D

const c = canvas.getContext("2d");
// // c is the context object responsible for making any kind of drawings on the canvas.


// // drawing a single line
// c.beginPath();
// c.moveTo(200, 300); // starting point for the line
// c.lineTo(400, 100); // ending point for the line

// /**
//  * Properties for Stroking
//  * 1. strokeStyle = color to be drawn
//  * 2. lineWidth = thicknes of the line
//  */
// // c.strokeStyle = "red";
// c.lineWidth = 2;
// // c.globalAlpha = 1;
// c.stroke(); // stroke draws the line with black color from p1 to p2
// c.closePath();


// /**
//  * Draw three lines
//  * L1 : p1(100, 50), p2(90, 200) => red colored, 3px thickness
//  * L2 : p1(50, 150), p2(300, 40) => blue colored, 10px thickness
//  * L3 : p1(500, 500), p2(600, 600) => tomato colored, 5px thickness
//  */


const drawingHistory = [];
let pathCount = 0;

function drawLine(p1, p2, color = "blue", thickness = 2){
    c.beginPath();
    c.strokeStyle = color;
    c.lineWidth = thickness;
    c.moveTo(p1.x, p1.y);
    c.lineTo(p2.x, p2.y);
    c.stroke();
    c.closePath();
}

// drawLine({x: 100, y: 50}, {x: 90, y: 200}, "red", 3);
// drawLine({x:100, y:50}, {x: 50, y:150}, "blue", 10);
// drawLine({x:500, y:500}, {x: 600, y:600}, "tomato", 5);

/*
Dynamic line draw

function onMouseDown(event){
    let {clientX, clientY} = event;
    c.beginPath();
    c.moveTo(clientX, clientY);
    c.lineWidth = 4;
    c.strokeStyle = "blue";
}

function onMouseUp(event){
    let {clientX, clientY} = event;
    c.lineTo(clientX, clientY);
    c.stroke();
    c.closePath();
}
*/


// canvas.addEventListener("mousedown", onMouseDown);
// canvas.addEventListener("mouseup", onMouseUp);

/*
// continuous lines

c.beginPath();
c.strokeStyle = "red";
c.lineWidth = 4;
c.moveTo(100, 100); //p1
c.lineTo(300, 100); //p2
c.stroke(); //p1 -> p2
c.closePath();
c.beginPath();
c.moveTo(300, 100);
c.lineTo(350, 300);
c.lineWidth = 2;
c.strokeStyle = "blue";
c.stroke(); // strokes out from starting beginPath
*/

/**
 * mouseMove 
 */

// canvas.addEventListener("mousemove", (e) =>{
//     console.log(e.clientX, e.clientY);
// })


/** Free hand drawing */
// canvas.addEventListener("mousedown", onMouseDown);



let options = {
    isFreeHandDrawing: true,
    isRectangleDrawing: false,
}
 
let drawingColor = "black"; 
let previousPosition = null;

function enableRectDrawing(){
    options = {
        isFreeHandDrawing: false,
        isRectangleDrawing: true,
    }
    console.log(options);
}

let initialCount;
function onMouseDown(e){
    previousPosition = [e.clientX, e.clientY];
    // console.log("mouse down", e.clientX, e.clientY);
    // let {clientX: x, clientY: y} = event;
    // previousPosition = [x, y]; //{x:x, y:y}
    c.strokeStyle = drawingColor;
    c.lineWidth = 2;
    initialCount = pathCount;
    /** 
     * Add mousemove event and mouseup event
     */
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

}


function onMouseMove(e){
    // console.log("mouse Move", e.clientX, e.clientY);

    //1. for the first time inside this previousPosition =
    let currentPosition = [e.clientX, e.clientY];
    //2. draw line from previousPosition to currentPosition
    if(options.isFreeHandDrawing){
        c.beginPath();
        c.moveTo(...previousPosition);
        c.lineTo(...currentPosition);
        c.stroke();
        c.closePath();
        previousPosition = currentPosition;
    }

    if(options.isRectangleDrawing){
        drawRectangle(currentPosition);
    }
}

function drawRectangle(currentPosition){
    if(initialCount !== pathCount){
        c.putImageData(drawingHistory[initialCount-1], 0, 0);
        pathCount = initialCount;
    }

    let width = currentPosition[0] - previousPosition[0];
    let height = currentPosition[1] - previousPosition[1];
    c.strokRect(previousPosition[0], previousPosition[1], width, height);
    drawingHistory.push(c.getImageData(0, 0, canvas.width, canvas.height));
    pathCount++;
}

function onMouseUp(e){
    // console.log("mouse up", e.clientX, e.clientY);
    // we need to remove mouse move listener after mouse up
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mouseup", onMouseUp);
    drawingHistory.push( c.getImageData(0, 0, canvas.width, canvas.height));
    pathCount++;
}

// pathCount
// drawingHistory
// c.putImageData(drawingHistory[2], 0, 0);