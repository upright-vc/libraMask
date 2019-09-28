console.log('background running!');

chrome.runtime.onMessage.addListener(receiver);

function receiver(req, sender, sendResponse) {
  console.log(req);
}
