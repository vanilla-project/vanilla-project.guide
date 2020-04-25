function updateScrollIndicator() {
  var indicator = document.getElementById("js-scroll-indicator");

  if (indicator) {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    indicator.style.width = scrolled + "%";
  }
}
