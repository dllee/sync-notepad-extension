document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('saveClipping').addEventListener('click', saveCurrentClipping);
    loadClippings();
});

const saveCurrentClipping = () => {
    const text = document.getElementById('newClipping').value;
    if (text.trim()) {
        chrome.runtime.sendMessage({action: "saveClipping", text}, () => {
            document.getElementById('newClipping').value = '';
            loadClippings();
        });
    }
};

const loadClippings = () => {
    chrome.runtime.sendMessage({action: "getClippings"}, (response) => {
        const clippingsList = document.getElementById('clippingsList');
        clippingsList.innerHTML = '';
        response.clippings.forEach((clipping) => {
            const li = document.createElement('li');
            li.textContent = clipping.text;
            clippingsList.appendChild(li);
        });
    });
};
