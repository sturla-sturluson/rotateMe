// Defaults
const _ROTATE_CLOCKWISE = true;
const _ROTATE_SHORTCUT = "r";
const _ENABLED = false;
// Variables

let shiftDown = false;
let rotateShortcut = "r"
let isEnabled = false;
let rotateClockwise = true;
const degreeRegex = new RegExp('rotate\\((\\d+)deg\\)');


const loadSettings = async () => {
    let isEnabledSetting = await browser.storage.sync.get("rotateMeIsEnabled");
    let rotateClockwiseSetting = await browser.storage.sync.get("rotateMeRotateClockwise");
    if (isEnabledSetting === undefined || isEnabledSetting.rotateMeIsEnabled === undefined) {
        isEnabled = true;
        await browser.storage.sync.set({ rotateMeIsEnabled: isEnabled });
    } else { isEnabled = isEnabledSetting.rotateMeIsEnabled; }
    if (rotateClockwiseSetting === undefined || rotateClockwiseSetting.rotateMeRotateClockwise === undefined) {
        rotateClockwise = true;
        await browser.storage.sync.set({ rotateMeRotateClockwise: rotateClockwise });
    } else { rotateClockwise = rotateClockwiseSetting.rotateMeRotateClockwise; }

}


const findLargestImage = () => {
    const imgs = document.getElementsByTagName('img');
    if (imgs.length == 0) return;
    let currImage = imgs[0];
    let currArea = currImage.height * currImage.width;
    for (let i = 1; i < imgs.length; i++) {
        const img = imgs[i];
        const area = img.height * img.width;
        if (area > currArea) {
            currArea = area;
            currImage = img;
        }
    }
    return currImage;
};

const getRotatedNumber = (rotateNumber) => {
    if (rotateNumber) { rotateNumber = parseInt(rotateNumber[1]); }
    else { rotateNumber = 0; }
    if (!rotateClockwise) { return getCounterClockwiseRotatedNumber(rotateNumber); }
    else { return getClockwiseRotatedNumber(rotateNumber); }
};

const getClockwiseRotatedNumber = (rotateNumber) => {
    rotateNumber += 90;
    return rotateNumber % 360;
};
const getCounterClockwiseRotatedNumber = (rotateNumber) => {
    rotateNumber += 270;
    return rotateNumber % 360;
}

const rotateActionMult = async () => {
    await loadSettings();
    if (!isEnabled) {
        return
    };
    const imgs = document.getElementsByTagName('img');
    if (imgs.length === 0) return;
    let currentRotation = imgs[0].style.transform;
    let rotateNumber = currentRotation.match(degreeRegex);
    rotateNumber = getRotatedNumber(rotateNumber);
    if (rotateNumber === 0) {
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style = "";
        }
        return;
    }
    for (let i = 0; i < imgs.length; i++) {
        settingImgStyle(imgs[i], rotateNumber);
    }

}
const settingImgStyle = (img, rotation) => {
    // If we are just flipping the image, we don't have to worry about the margin
    if (rotation === 180) {
        img.style = `transform: rotate(${rotation}deg); margin-top: 0px;`;
        return;
    };
    // Doing very rough adjustments so the image doesn't get cut off
    const height = img.height;
    const width = img.width;
    const difference = width - height;
    img.style = `transform: rotate(${rotation}deg); margin-top: ${difference / 2}px;`;
};


document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift' && !shiftDown) { shiftDown = true; }
})
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') { shiftDown = false; }
})
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === rotateShortcut && shiftDown) {
        rotateActionMult()
    }
})