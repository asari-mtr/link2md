'use strict';

var contextMenuItem = {
    "id": "linkAsMarkdown",
    "title": "Copy link as markdown",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData) {
  if (clickData.menuItemId == "linkAsMarkdown" && clickData.selectionText) {
    linkAsMarkdown();
  }
})

chrome.browserAction.onClicked.addListener(function(tab) {
  linkAsMarkdown();
});

function linkAsMarkdown() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: "get-link-script.js"},
      function(results) {
        const background = chrome.extension.getBackgroundPage();

        var result = false;
        var textarea = background.document.getElementById('ta');
        textarea.value = results;
        textarea.select();

        if (background.document.execCommand('copy')) {
          result = true;
        } else {
          background.console.error('failed to get clipboard content');
        }

        textarea.value = '';
        return result;
      }
    );
  });
}
