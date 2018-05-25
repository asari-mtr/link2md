let copyAsMd = document.getElementById('copyAsMd');

copyAsMd.onclick = function(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:
        `
const selection = window.getSelection()

const dom = selection.getRangeAt(0).cloneContents();

const links = dom.querySelectorAll('a');

var linkTexts = [];
for (const link of links) {
  const href = link.getAttribute('href');
  linkTexts.push(href);
}
linkTexts;
        `
        },
      function(results) {
        // TODO: I can only get it for the first time
        chrome.extension.getBackgroundPage().console.log(results);
      }
    );
  });
};
