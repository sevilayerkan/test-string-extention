chrome.action.onClicked.addListener(function(tab) {
  chrome.runtime.connect({name: "popup"});
});
