var SearchResult = function(props) {
  var icon = h("img", {src: "/assets/icons/" + props.icon, "class": "guides__image"});
  return h("li", {key: props.route, "class": "guides__guide"},
      h("a", {href: props.route, "class": "guides__link"}, icon, props.language + " " + props.title)
    );
};

var SearchResults = function(props) {
  if (!props.results) {
    return;
  }

  if (props.results.length === 0) {
    var link = h("a", {href: "https://github.com/vanilla-project/vanilla-project.github.io/issues/new"}, "let us know if you'd like to see a specific guide");
    var br = h("br");

    return h("p", null, "No guides found.", br, "Are we missing something? Please ", link, ".");
  }

  return h("ul", {"class": "guides"}, props.results);
};

