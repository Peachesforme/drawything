//Create Elements that can be manipulated
//git push -u origin master
const canvas = document.getElementById("GameScreen");
const context = canvas.getContext("2d");
const resetButton = document.getElementById("resetScreenButton");
const colorSelector = document.getElementById("colorSelector");
const colorButton = document.getElementById('colorSwatch');
const opacitySlider = document.getElementById('opacitySlider');
const mainSection = document.getElementById('main');
const selectClass = document.getElementById('thicknessSelect')

canvas.width = mainSection.clientWidth;
canvas.height = (mainSection.clientHeight * 4 > '100vw') ?  mainSection.clientHeight : mainSection.clientHeight * 4 ;


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

canvas?.addEventListener('mousedown', () => mouseIsDown = true)

canvas?.addEventListener('mousemove' || 'touchmove', e => {
    const xPos = e.clientX - canvas.offsetLeft;
    const yPos = e.clientY - canvas.offsetTop;
    if(mouseIsDown) drawCircle(xPos,yPos);
})

canvas?.addEventListener('mouseup', () => mouseIsDown = false)

opacitySlider?.addEventListener('click', () => document.getElementById('opacityLabel').innerText = opacitySlider.value +"%")

function drawCircle(xPos, yPos){
    context.fillStyle = hexToRGB(colorButton.value,opacitySlider.value/100);
    const size = selectClass?.value || 1;
    context.beginPath();
    context.arc(xPos,yPos, size , 0, 2 * Math.PI)
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

selectClass?.addEventListener('change', () => {console.log(selectClass.value)})