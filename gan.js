// Global variables
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let painting = false;
let tool = "pen";
let drawHistory = [];
let stepIndex = -1;

// Event listeners
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", endDraw);
canvas.addEventListener("mousemove", draw);


// Get all buttons with the class "btn"
var buttons = document.querySelectorAll(".btn");

// Loop through all buttons and add a click event listener to each one
buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        // Remove the 'clicked' class from all buttons
        buttons.forEach(function(btn) {
            btn.classList.remove("clicked");
        });

        // Toggle the 'clicked' class on the clicked button
        this.classList.toggle("clicked");
    });
});
// Function to get mouse position relative to canvas
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

// Function to handle start of drawing
function startDraw(e) {
    painting = true;
    draw(e);
}

// Function to handle end of drawing
function endDraw() {
    painting = false;
    ctx.beginPath();
    drawHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    stepIndex++;
}

// Function to handle drawing
function draw(e) {
    if (!painting) return;
    let mousePos = getMousePos(canvas, e);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = tool === "pen" ? "black" : "white";

    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mousePos.x, mousePos.y);
}

// Function to choose pen tool
function choosePen() {
    tool = "pen";
}

// Function to choose eraser tool
function chooseEraser() {
    tool = "eraser";
}

// Function to step back in drawing history
function stepBack() {
    if (stepIndex <= 0) {
        clearSketch();
    } else {
        stepIndex--;
        ctx.putImageData(drawHistory[stepIndex], 0, 0);
    }
}

// Function to clear the canvas and drawing history
function clearSketch() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawHistory = [];
    stepIndex = -1;
}






// Function to download canvas drawing
function downloadCanvas() {
    // Create a link element
    let link = document.createElement('a');

    // Set the link's href to the canvas data URL
    link.href = canvas.toDataURL();

    // Set the download attribute to the desired file name
    link.download = 'sketch.png';

    // Trigger a click event on the link to start the download
    link.click();
}

// Get the download button
let downloadButton = document.querySelector('.btn.download');

// Add a click event listener to the download button
downloadButton.addEventListener('click', downloadCanvas);













