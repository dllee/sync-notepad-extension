chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({notepad: ''});
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    function: setClipboardContent
  });
});

function setClipboardContent() {
  chrome.storage.sync.get('notepad', (data) => {
    navigator.clipboard.writeText(data.notepad).then(() => {
      console.log('Notepad content copied to clipboard.');
    }).catch(err => console.error('Failed to copy: ', err));
  });
}