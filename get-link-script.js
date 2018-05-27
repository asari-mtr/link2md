var selection = window.getSelection()
var dom = selection.getRangeAt(0).cloneContents();
var links = dom.querySelectorAll('a');

var linkTexts = [];
for (const link of links) {
  const href = link.getAttribute('href');
  const text = link.text.trim();
  const list = "- [ ] [" + text + "](" + href + ")";
  linkTexts.push(list);
}
linkTexts.join("\r\n");
