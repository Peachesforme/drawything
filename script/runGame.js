//Create Elements that can be manipulated
const canvas = document.getElementById("GameScreen");
const context = canvas.getContext("2d");
const resetButton = document.getElementById("resetScreenButton");
const colorSelector = document.getElementById("colorSelector");
const colorButtons = document.getElementsByClassName('colorSwatch');

let mouseIsDown = false; //Mouse moving is always registering.



//Render the buttons with their appropriate color
const availableColors = Object.values(colorButtons)
availableColors.forEach(element => {
    element.style.backgroundColor = element.value
});

canvas?.addEventListener("click", e => {
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;
    // context.fillRect(xPos,yPos,5,5)
    drawCircle(xPos,yPos);
})

resetButton?.addEventListener('click', () => {
    const backgroundColorUsed =  getComputedStyle(canvas).backgroundColor;
    const currentColor = context.fillStyle
    // console.log(currentColor)
    context.fillStyle = backgroundColorUsed;
    context.fillRect(0,0, canvas.offsetWidth, canvas.clientHeight)
    context.fillStyle = currentColor;
    // console.log('Reset Button Clicked');
})

canvas?.addEventListener('mousedown', e => {
    // console.log('MouseDown Event Triggereted')
    mouseIsDown = true;
})

canvas?.addEventListener('mousemove', e => {
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;
    if(mouseIsDown){
        drawCircle(xPos,yPos);
        // context.fillRect(xPos,yPos,5,5) 
        // console.log("MouseMove Event Listener triggerd" + " X: " +
        // xPos + " Y: " + yPos)
    }   
})

canvas?.addEventListener('mouseup', e => {
    // console.log("MouseUp Event Listener triggerd")
    mouseIsDown = false;
})


colorSelector?.addEventListener('click', e => {
    const color = e?.target?.value;
    context.fillStyle = color;
})

function drawCircle(xPos, yPos,){
    context.beginPath();
    context.arc(xPos,yPos, 5 , 0, 2 * Math.PI)
    context.fill();
    context.closePath();
}