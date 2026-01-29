const browserIsChrome = () => {
    return (typeof browser === "undefined");
}


const getSetting = async (settingName) => {
    if (browserIsChrome()) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(settingName, (result) => {
                resolve(result);
            });
        });
    }

    return await browser.storage.sync.get(settingName);
}

const setSetting = async (settingName, value) => {
    if (browserIsChrome()) {
        return new Promise((resolve) => {
            let settingObj = {};
            settingObj[settingName] = value;
            chrome.storage.sync.set(settingObj, () => {
                resolve();
            });
        });
    }
    await browser.storage.sync.set({ [settingName]: value });
}