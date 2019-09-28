console.log('test!');

// let port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  const message = {method: event.data.method, payee: event.data.payee, amount: event.data.amount};
  if (event.data.type == "FROM_PAGE") {
    console.log('message', message);
  }

  chrome.runtime.sendMessage(message);
});

// Example call from webpage:
// window.postMessage({type: "FROM_PAGE", method: "transfer", payee: "0x0", amount: "100"}, "*");
