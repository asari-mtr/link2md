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
        const background = chrome.extension.getBackgroundPage();

        // TODO: I can only get it for the first time
        background.console.log(results);

        var result = false;
        var textarea = background.document.getElementById('ta');
        textarea.value = "Hello clipboard";
        textarea.select();

        if (background.document.execCommand('copy')) {
          resutl = true;
        } else {
          background.console.error('failed to get clipboard content');
        }

        textarea.value = '';
        return result;
      }
    );
  });
};
