const clockwiseCheckButton = document.querySelector("#rotateClockwiseCheckbox");
const loadedP = document.querySelector("#loadedP");
const disableButton = document.querySelector("#disableButton");
const settingsWindow = document.querySelector("#settingsWindow");
const rotateMeContainer = document.querySelector("#rotateMeContainer");

let isEnabled = false;
let rotateClockwise = true;

// Defaults
const _ROTATE_CLOCKWISE = true;
const _ROTATE_SHORTCUT = "r";
const _ENABLED = false;
// Variables

const updateClockwiseDirection = async (e) => {
    clockwiseCheckButton.checked = !rotateClockwise;
    rotateClockwise = !rotateClockwise;
    await browser.storage.sync.set({ rotateMeRotateClockwise: rotateClockwise });
}

const disableButtonAction = async () => {
    const enabled = !isEnabled;
    if (enabled) { setEnabled(); }
    else { setDisabled(); }
    await browser.storage.sync.set({ rotateMeIsEnabled: enabled });
}
const setEnabled = () => {
    disableButton.innerHTML = "Disable";
    isEnabled = true;
    rotateMeContainer.classList.remove("disabledWindow");
    clockwiseCheckButton.disabled = false;

}
const setDisabled = () => {
    disableButton.innerHTML = "Enable";
    isEnabled = false;
    rotateMeContainer.classList.add("disabledWindow");
    clockwiseCheckButton.disabled = true;
}

const loadSettings = async (e) => {
    let isEnabledSetting = await browser.storage.sync.get("rotateMeIsEnabled");
    let rotateClockwiseSetting = await browser.storage.sync.get("rotateMeRotateClockwise");
    if (isEnabledSetting === undefined || isEnabledSetting.rotateMeIsEnabled === undefined) {
        isEnabled = true;
        await browser.storage.sync.set({ rotateMeIsEnabled: isEnabled });
    } else {
        isEnabled = isEnabledSetting.rotateMeIsEnabled;
    }
    if (rotateClockwiseSetting === undefined || rotateClockwiseSetting.rotateMeRotateClockwise === undefined) {
        rotateClockwise = true;
        await browser.storage.sync.set({ rotateMeRotateClockwise: rotateClockwise });
    } else { rotateClockwise = rotateClockwiseSetting.rotateMeRotateClockwise; }

    if (isEnabled) { setEnabled(); }
    else { setDisabled(); }
    clockwiseCheckButton.checked = rotateClockwise;
}


document.addEventListener("DOMContentLoaded", loadSettings);
disableButton.addEventListener("click", disableButtonAction);
clockwiseCheckButton.addEventListener("click", updateClockwiseDirection);