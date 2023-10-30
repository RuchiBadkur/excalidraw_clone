// canvas is a grid of pixels

const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

function onUndo(){
    // un do 
    // console.log(c.getImageData());
    if(pathCount){
        drawingHistory.pop();
        pathCount--;
        if(pathCount === 0){
            // clear 
            c.clearRect(0, 0, canvas.width, canvas.height);
        }else{
            c.putImageData(drawingHistory[pathCount - 1], 0, 0);
        }
    }
}

function onRedo(){
    // re do
}

undo.addEventListener("click", onUndo);
redo.addEventListener("click", onRedo);


/**
// rectangle
c.StrokeRect(100, 100, 300, 300);

c.fillRect(100, 100, 200, 200);


// circle
c.arc(100, 100, 50, 0, Math.PI*2);
// c.fillStyle = "red";
// c.fill();
c.stroke();

// circle
c.arc(400, 400, 150, 0, Math.PI*2);
// c.fill();
c.stroke();

 */