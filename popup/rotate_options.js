const clockwiseCheckButton = document.querySelector("#rotationDirection");
const savedPrompt = document.querySelector("#savedPrompt");
const loadedP = document.querySelector("#loadedP");
const disableButton = document.querySelector("#disableButton");
let isEnabled = false;

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        rotationDirection: clockwiseCheckButton.checked,
        isEnabled: isEnabled
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
    }

    function onError(error) {
        loadedP.innerHTML = "Error loading " + error;
        console.log(`Error: ${error}`);
    }
    let getting = browser.storage.sync.get("isEnabled");
    getting.then(setCurrentChoice, onError);
    initialSetup();
}

const disableButtonAction = () => {
    if (!isEnabled) {
        disableButton.innerHTML = "Enable";
        isEnabled = true;
    }
    else {
        disableButton.innerHTML = "Disable";
        isEnabled = false;
    }
    saveOptions();

}

const initialSetup = () => {
    if (isEnabled) {
        disableButton.innerHTML = "Disable";
    }
    else {
        disableButton.innerHTML = "Enable";
    }
}


disableButton.addEventListener("click", disableButtonAction);
document.addEventListener("DOMContentLoaded", syncDisableSettings);
document.addEventListener("DOMContentLoaded", syncClockwiseSettings);
document.querySelector("form").addEventListener("submit", saveOptions);
