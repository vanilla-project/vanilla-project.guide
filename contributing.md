# Contribution Guide

We want to make it easy for people to add new content.

While doing that we should also keep our content consistent, so that our readers can expect the same or similar structured content across different guides.

This contribution guide is likely to be a living document and we'll add or remove points as we learn more about and from our collaborators, content and readers.

In case there are any question don't hesitate to raise them in an issue or the pull request for the new guide itself.


## Providing a new Guide

Please copy the [template.md](template.md) file in the root of this repository and use it as a starting point.

If the guide you're providing is for a language we already have a section for, place the new file in the appropriate subdirectory in the `_guides` directory, e.g. a Ruby on Rails guide should live in `_guides/ruby/rails.md`.

In case the new guide is for a completely new language create a new subdirectory inside `_guides` and place the file inside.

The pattern for directories and filenames is [kebab-case](http://wiki.c2.com/?KebabCase).
Here are some examples:

|                    | Path                     | Comment                                  |
|--------------------|--------------------------|------------------------------------------|
| :white_check_mark: | `go/command-line.md`     | _File name in expected kebab-case._      |
| :white_check_mark: | `objective-c/ios-app.md` | _Directory name in expected kebab-case._ |
| :x:                | `go/commandLine.md`      | _Camel-cased file name._                 |
| :x:                | `Go/command-line.md`     | _Capitalized directory name._            |
| :x:                | `objectivecc/ios-app.md` | _Directory name is not in kebab-case._   |


## Format

- Use the [guide template]() as a starting point for any new guide.
- Filenames have the `.md` file extension.
- Markdown content should be formatted and structured appropriately.
  - A level-two heading comes after a level-one heading and such.
- When linking to an external resource provide a title or description for it.
  - Use `[RailsConf 2014 - Closing Keynote by Aaron Patterson)(https://www.youtube.com/watch?v=BTTygyxuGj8)` instead of just `https://www.youtube.com/watch?v=BTTygyxuGj8`.


### Content

**Use the atx-style for headings.**

`# Title` instead of
```
Title
=====
```

**Separate heading levels from its text with a space.**

Prefer `# Title` over `#Title`.


**Separate each (sub) chapter by two empty lines.**

Prefer

```
...
Last line of chapter.


## New Chapter
```

over

```
...
Last line of chapter.

## New Chapter
```

This makes it more visible in the source that it's not just another paragraph starting there.


**Start every sentence on a new line.**

When the content is being rendered, they will form a continuous paragraph again, but while looking at the source, it helps keeping sentences concise and reduces repetition.
Starting three sentences in a row with _&ldquo;And&rdquo;_ can be spotted easier by doing that.

```
Sentence one.
Another sentence.
A longer sentence.

And a new paragraph.
```

**Use proper quotes.**

Prefer using real quotes instead of the inch symbol (the &ldquo;double quote&rdquo; `"`).

- `&ldquo;` is the left double quote: &ldquo;
- `&rdquo;` is the right double quote: &rdquo;
- `&lsquo;` is the left single quote: &lsquo;
- `&rsquo;` is the right single quote: &rsquo;

