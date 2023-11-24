const clockwiseCheckButton = document.querySelector("#rotationDirection");
const loadedP = document.querySelector("#loadedP");
const disableButton = document.querySelector("#disableButton");
const settingsWindow = document.querySelector("#settingsWindow");
const clockwiseSaveButton = document.querySelector("#clockwiseSaveButton");
let isEnabled = undefined;

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        rotationDirection: clockwiseCheckButton.checked,
    });
    loadedP.innerHTML = "Saved!";
}

function syncClockwiseSettings() {
    function setCurrentChoice(result) {
        clockwiseCheckButton.checked = result.rotationDirection || false;
    }

    function onError(error) {
        loadedP.innerHTML = "Error loading " + error;
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("rotationDirection");
    getting.then(setCurrentChoice, onError);
}

function syncDisableSettings() {
    function setCurrentChoice(result) {
        isEnabled = result.isEnabled;
        if (isEnabled === undefined) {
            isEnabled = false;
            console.log("Setting is undefined, setting to false");
        }


        initialSetup();
    }

    function onError(error) {
        loadedP.innerHTML = "Error loading " + error;
        console.log(`Error: ${error}`);
    }
    let getting = browser.storage.sync.get("isEnabled");
    getting.then(setCurrentChoice, onError);

}

const disableButtonAction = () => {
    loadedP.innerHTML = "Clicked disable button"
    if (!isEnabled) {
        setEnabled();
        browser.storage.sync.set({
            isEnabled: true,
        });
    }
    else {
        setDisabled();
        browser.storage.sync.set({
            isEnabled: false,
        });
    }

}
const setEnabled = () => {
    disableButton.innerHTML = "Disable";
    isEnabled = true;
    settingsWindow.classList.remove("disabledWindow");
    clockwiseCheckButton.disabled = false;
    clockwiseSaveButton.disabled = false;

}

const setDisabled = () => {
    disableButton.innerHTML = "Enable";
    isEnabled = false;
    settingsWindow.classList.add("disabledWindow");
    clockwiseCheckButton.disabled = true;
    clockwiseSaveButton.disabled = true;
}

const initialSetup = () => {
    if (isEnabled) {
        setEnabled();
    }
    else {
        setDisabled();
    }
}


disableButton.addEventListener("click", disableButtonAction);
document.addEventListener("DOMContentLoaded", syncClockwiseSettings);
document.addEventListener("DOMContentLoaded", syncDisableSettings);
clockwiseSaveButton.addEventListener("click", saveOptions);


