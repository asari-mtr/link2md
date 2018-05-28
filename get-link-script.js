var selection = window.getSelection();
var dom = selection.getRangeAt(0).cloneContents();
var links = dom.querySelectorAll('a');
var origin = location.origin;

var linkTexts = [];
for (const link of links) {
  var href = link.getAttribute('href');
  if (href.startsWith("/") || href.startsWith("#")) {
    href = origin.concat(href);
  }
  const text = link.text.trim();
  const list = "- [ ] [" + text + "](" + href + ")";
  linkTexts.push(list);
}
linkTexts.join("\r\n");
