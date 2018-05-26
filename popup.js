let copyAsMd = document.getElementById('copyAsMd');

copyAsMd.onclick = function(e) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:
        `
var selection = window.getSelection()

var dom = selection.getRangeAt(0).cloneContents();

var links = dom.querySelectorAll('a');

var linkHref = [];
var linkTexts = [];
for (const link of links) {
  const href = link.getAttribute('href');
  const text = link.text;
  const list = "- [ ] [" + text + "](" + href + ")";
  linkTexts.push(list);
}
linkTexts.join('\\n');
        `
        },
      function(results) {
        const background = chrome.extension.getBackgroundPage();

        var result = false;
        var textarea = background.document.getElementById('ta');
        textarea.value = results;
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
