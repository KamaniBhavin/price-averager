chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (message.type === "syncScrapedProducts") {
        //Todo: Call API to save scraped data
        sendResponse(message);
    }
})