
let shiftDown = false;
const degreeRegex = new RegExp('rotate\\((\\d+)deg\\)');
//browser.browserAction.onClicked.addListener(rotatePage);

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
        document.body.style = "";
    }
    else {
        document.body.style = `transform: rotate(${rotateNumber}deg);`;
        setTopMargin(rotateNumber);
    }
}

const setTopMargin = (rotateNumber) => {
    const imgs = document.getElementsByTagName('img');
    if (imgs.length == 0 || imgs.length > 1) return;
    const img = imgs[0];
    const imgHeight = img.height;
    const imgWidth = img.width;
    const higher = imgHeight > imgWidth ? imgHeight : imgWidth;
    document.body.style = `transform: rotate(${rotateNumber}deg); margin-top: ${higher}px;`;
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift' && !shiftDown) {
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
    const key = e.key.toLowerCase();
    if (key === 'r' && shiftDown) {
        rotatePage();
    }
})