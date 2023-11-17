const clockwiseCheckButton = document.querySelector("#rotationDirection");
const savedPrompt = document.querySelector("#savedPrompt");
const loadedP = document.querySelector("#loadedP");
function saveOptions(e) {
    e.preventDefault();
    savedPrompt.innerHTML = "Saving...";
    browser.storage.sync.set({
        rotationDirection: clockwiseCheckButton.checked,
    });
    loadedP.innerHTML = "Saved!";
}

function restoreOptions() {
    function setCurrentChoice(result) {
        loadedP.innerHTML = "Loaded result was: " + result.rotationDirection;
        clockwiseCheckButton.checked = result.rotationDirection || false;
    }

    function onError(error) {
        loadedP.innerHTML = "Error loading " + error;
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("rotationDirection");
    getting.then(setCurrentChoice, onError);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
