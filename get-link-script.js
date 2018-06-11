var selection = window.getSelection();
var dom = selection.getRangeAt(0).cloneContents();
var links = dom.querySelectorAll('a');
var origin = location.origin;
var pathname = location.pathname;

var linkTexts = [];
for (const link of links) {
  var href = link.getAttribute('href');
  if (href == null) {
    continue;
  }
  if (href.startsWith("javascript:")) {
    continue;
  }
  if (href.startsWith("/")) {
    href = origin.concat(href);
  }
  if (href.startsWith("#")) {
    href = origin.concat(pathname).concat(href);
  }
  var text = link.text.trim();
  if (text.length == 0) {
      text = href;
  }
  const list = "- [ ] [" + text + "](" + href + ")";
  linkTexts.push(list);
}
linkTexts.join("\r\n");
