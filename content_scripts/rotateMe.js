let shiftDown = false;
let rotateClockWise = true;
let savedSetting = true;
let isEnabled = false;
const degreeRegex = new RegExp('rotate\\((\\d+)deg\\)');


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
    if (rotateNumber) {
        rotateNumber = parseInt(rotateNumber[1]);
    } else {
        rotateNumber = 0;
    }
    if (!rotateClockWise) {
        return getCounterClockwiseRotatedNumber(rotateNumber);
    } else
        return getClockwiseRotatedNumber(rotateNumber);
};

const getClockwiseRotatedNumber = (rotateNumber) => {
    rotateNumber += 90;
    if (rotateNumber === 360) rotateNumber = 0;
    return rotateNumber;
};
const getCounterClockwiseRotatedNumber = (rotateNumber) => {
    rotateNumber -= 90;
    if (rotateNumber === -90) rotateNumber = 270;
    return rotateNumber;
}

const rotatePage = async () => {
    if (!isEnabled) {
        console.log("Plugin is disabled");
        return
    };
    setClockwiseSetting();
    const img = findLargestImage();
    if (!img) return;
    let currentRotation = img.style.transform;
    let rotateNumber = currentRotation.match(degreeRegex);
    rotateNumber = getRotatedNumber(rotateNumber);
    if (rotateNumber === 0) {
        img.style = "";
    }
    else {
        settingImgStyle(img, rotateNumber);
    }
}

const settingImgStyle = (img, rotation) => {
    if (rotation === 180) {
        img.style = `transform: rotate(${rotation}deg); margin-top: 0px;`;
        return;
    };
    const height = img.height;
    const width = img.width;
    const difference = width - height;
    img.style = `transform: rotate(${rotation}deg); margin-top: ${difference / 2}px;`;
};

const setDisabledSetting = () => {
    function setCurrentChoice(result) {
        isEnabled = result.isEnabled;
        if (isEnabled === undefined) {
            isEnabled = false;
            console.log("Setting is undefined, setting to false");
        }

    }

    function onError(error) {
        console.log(`Error: ${error}`);
        isEnabled = false;
    }
    let getting = browser.storage.sync.get("isEnabled");
    getting.then(setCurrentChoice, onError);
    isEnabled = savedSetting;

}

const setClockwiseSetting = () => {
    function setCurrentChoice(result) {
        savedSetting = result.rotationDirection;
        if (savedSetting === undefined) {
            savedSetting = true;
            console.log("Setting is undefined, setting to true");
        }

    }

    function onError(error) {
        console.log(`Error: ${error}`);
        savedSetting = true;
    }
    let getting = browser.storage.sync.get("rotationDirection");
    getting.then(setCurrentChoice, onError);
    rotateClockWise = savedSetting;

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

setDisabledSetting();
setClockwiseSetting();


