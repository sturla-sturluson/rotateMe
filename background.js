

const degreeRegex = new RegExp('rotate\\((\\d+)deg\\)');

const documentBody = document.body;

function openPage() {
    console.log('rotatePage with button');
}

function rotateFunc() {
    console.log('rotatePage with button');
    let currentRotation = documentBody.style.transform;
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
    documentBody.style.transform = `rotate(${rotateNumber}deg)`;
}

browser.browserAction.onClicked.addListener(openPage);
