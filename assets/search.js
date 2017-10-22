var findGuidesForTags = function(tags, guides) {
  var found = [];

  for (var guide in guides) {
    if (guides.hasOwnProperty(guide)) {
      var guideTags = guides[guide];
      var matchingTags = 0;

      for (var i = 0; i < tags.length; i++) {
        if (guideTags.indexOf(tags[i]) > -1) {
          matchingTags += 1;
        }
      }

      if (matchingTags === tags.length) {
        found.push(guide);
      }
    }
  }

  return found;
};

var allRoutesOf = function(guides) {
  var routes = [];

  for (var route in guides) {
    if (guides.hasOwnProperty(route)) {
      routes.push(route);
    }
  }

  return routes;
};

var capitalize = function(string) {
  var words = string.split("-");
  var capitalizedWords = [];

  for (var i = 0; i < words.length; i++) {
    capitalizedWords.push(capitalizeFirstLetter(words[i]));
  }

  return capitalizedWords.join(" ");
}

var capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

