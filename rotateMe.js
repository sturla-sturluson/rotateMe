
let shiftDown = false;
const degreeRegex = new RegExp('rotate\\((\\d+)deg\\)');

const rotatePage = () => {
    let currentRotation = document.body.style.transform;
    let rotateNumber = currentRotation.match(degreeRegex);
    if (rotateNumber) {
        rotateNumber = parseInt(rotateNumber[1]);
    } else {
        rotateNumber = 0;
    }
    rotateNumber += 90;
    if (rotateNumber === 360) {
        rotateNumber = 0;
    }
    document.body.style.transform = `rotate(${rotateNumber}deg)`;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        shiftDown = true;
    }
}
)

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        shiftDown = false;
    }
}
)

document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && shiftDown) {
        console.log('rotating');
        rotatePage();
    }
})