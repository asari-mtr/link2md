let copyAsMd = document.getElementById('copyAsMd');

copyAsMd.onclick = function(e) {
  chrome.extension.getBackgroundPage().console.log("click");
};
