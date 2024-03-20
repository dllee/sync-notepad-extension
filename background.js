chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ clippings: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveClipping") {
      saveClipping(request, sendResponse);
  } else if (request.action === "getClippings") {
      getClippings(sendResponse);
  }
  return true;
});

const saveClipping = (request, sendResponse) => {
  chrome.storage.sync.get("clippings", (result) => {
      let clippings = result.clippings || [];
      clippings.unshift({ text: request.text, creationDate: new Date().getTime() });
      chrome.storage.sync.set({ clippings }, () => {
          sendResponse({ clippings });
      });
  });
};

const getClippings = (sendResponse) => {
  chrome.storage.sync.get("clippings", (result) => {
      sendResponse({ clippings: result.clippings || [] });
  });
};
