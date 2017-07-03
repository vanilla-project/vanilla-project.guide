---
layout: default
title: Search
---
<h1>{{ page.title }}</h1>

<select id="search" placeholder="This is a placeholder" multiple=""></select>

<article id="search-results"></article>

<script rel="stylesheet" src="{{ "/assets/preact.min.js" | relative_url }}"></script>
<script rel="stylesheet" src="{{ "/assets/choices.min.js" | relative_url }}"></script>
<script rel="stylesheet" src="{{ "/assets/search.js" | relative_url }}"></script>

<script>

{% assign all_attributes = "" | split: "" %}

var guides = {
{% for guide in site.guides %}
  {% assign attributes = "" | split: "" %}
  {% assign attributes = attributes | push: guide.language %}
  {% for paradigm in guide.paradigms %}
    {% assign attributes = attributes | push: paradigm %}
  {% endfor %}
  {% for tag in guide.tags %}
    {% assign attributes = attributes | push: tag %}
  {% endfor %}

  "{{guide.url}}": [
    "{{ attributes | escape | join: '","' }}"
  ],

  {% for attribute in attributes %}
    {% unless all_attributes contains attribute %}
      {% assign all_attributes = all_attributes | push: attribute %}
    {% endunless %}
  {% endfor %}
{% endfor %}
};

{% assign all_attributes = all_attributes | uniq %}

var routeToLanguageAndTitle = {
{% capture code_without_whitespaces %}
  {% for guide in site.guides %}
    "{{guide.url}}": {language: "{{ guide.language }}", title: "{{ guide.title | escape }}"},
  {% endfor %}
{% endcapture %}
{{ code_without_whitespaces }}
};

var options = {
  silent: {% if jekyll.environment == 'production' %} true {% else %} false {% endif %},
  choices: [
    {% for flavor in all_attributes %}
    { value: "{{ flavor }}", label: capitalize("{{ flavor }}") },
    {% endfor %}
  ],
  searchFloor: 1,
  duplicateItems: false,
  placeholder: true,
  placeholderValue: "Start searching for project flavours...",
  removeItemButton: true
};

var preactRoot;
var h                = preact.h;
var searchedTags     = [];
var input            = document.getElementById("search");
var resultsContainer = document.getElementById("search-results");
var choices          = new Choices(input, options);

var SearchResults = function(props) {
  var guides = findGuidesForTags(props.searchedTags, props.guides);
  var results = [];

  if (props.searchedTags.length === 0) {
    return;
  }

  for (var i = 0; i < guides.length; i++) {
    var g = routeToLanguageAndTitle[guides[i]];
    results.push(h(SearchResult, {route: guides[i] + "", language: g.language, title: g.title}));
  }

  if (results.length === 0) {
    var link = h("a", {href: "https://github.com/vanilla-project/vanilla-project.github.io/issues/new"}, "let us know if you'd like to see a specific guide");
    var br = h("br");

    return h("span", null, "No guides found.", br, "Are we missing something? Please ", link, ".");
  }

  return h("ul", null, results);
};

var SearchResult = function(props) {
  return h("li", {key: props.route},
      h("a", {href: props.route}, props.language + " " + props.title)
    );
};

var renderResult = function(searchedTags) {
  var resultsProps = {
    guides: guides,
    searchedTags: searchedTags
  };

  preactRoot = preact.render(h(SearchResults, resultsProps), resultsContainer, preactRoot);
};

input.addEventListener('addItem', function(addEvent) {
  var tag = addEvent.detail.value;

  searchedTags.push(tag);

  renderResult(searchedTags);
});

input.addEventListener('removeItem', function(removeEvent) {
  var tag = removeEvent.detail.value;

  var index = searchedTags.indexOf(tag);
  searchedTags.splice(index, 1);

  renderResult(searchedTags);
});

renderResult([]);
</script>

