const clockwiseCheckButton = document.querySelector("#rotationDirection");
const savedPrompt = document.querySelector("#savedPrompt");
function saveOptions(e) {
    savedPrompt.innerHTML = "Saved!";
    e.preventDefault();
    browser.storage.sync.set({
        rotationDirection: document.querySelector("#rotationDirection").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        clockwiseCheckButton.checked = result.rotationDirection || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let getting = browser.storage.sync.get("rotationDirection");
    getting.then(setCurrentChoice, onError);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
