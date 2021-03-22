//Create Elements that can be manipulated
const canvas = document.getElementById("GameScreen");
const context = canvas.getContext("2d");
const resetButton = document.getElementById("resetScreenButton");
const colorSelector = document.getElementById("colorSelector");
const colorButton = document.getElementById('colorSwatch');
const opacitySlider = document.getElementById('opacitySlider');
const mainSection = document.getElementById('main');

canvas.width = mainSection.clientWidth;
canvas.height = mainSection.clientHeight * 2;
console.log ("Widght: " + canvas.clientWidth + " Height: " + canvas.clientHeight * 2)


document.getElementById('opacityLabel').innerText = opacitySlider.value+"%"
colorButton.value = 'rgba(0,0,0,0)'; // Default Color to load up with.
//console.log(colorButton.value)
let mouseIsDown = false; //Mouse moving is always registering.

canvas?.addEventListener("click", e => {
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;
    // context.fillRect(xPos,yPos,5,5)
    drawCircle(xPos,yPos);
})

resetButton?.addEventListener('click', () => {
    const backgroundColorUsed =  getComputedStyle(canvas).backgroundColor;
    const currentColor = context.fillStyle
    //console.log(currentColor)
    context.fillStyle = backgroundColorUsed;
    context.fillRect(0,0, canvas.offsetWidth, canvas.clientHeight)
    context.fillStyle = currentColor;
    //console.log('Reset Button Clicked');
})

canvas?.addEventListener('mousedown' || 'touchstart', e => {
    //console.log('MouseDown Event Triggereted')
    mouseIsDown = true;
})

canvas?.addEventListener('mousemove' || 'touchmove', e => {
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;
    if(mouseIsDown) drawCircle(xPos,yPos);
})

canvas?.addEventListener('mouseup'|| 'touchend', e => {
    //console.log("MouseUp Event Listener triggerd")
    mouseIsDown = false;
})

opacitySlider?.addEventListener('click' || 'change', e => {
    // let value = e?.target?.value/100;
    document.getElementById('opacityLabel').innerText = opacitySlider.value +"%"
    //console.log(value);  
})

colorButton?.addEventListener('click', e => {
    let value = e?.target?.value;
    //console.log(value);  
})

function drawCircle(xPos, yPos,){
    context.fillStyle = hexToRGB(colorButton.value,opacitySlider.value/100);
    context.beginPath();
    context.arc(xPos,yPos, 5 , 0, 2 * Math.PI)
    context.fill();
    context.closePath();
}

function hexToRGB(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}