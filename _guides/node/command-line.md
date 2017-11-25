---
title: Command Line Application
date:  2017-05-28
tags:
  - command-line
---

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine, it was created by Joyent engineer Ryan Dahl.
Node.js allows you to use JavaScript outside of a browser.
Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.


## Further Material

- Homepage: [nodejs.org](https://nodejs.org/)
- Documentation: [nodejs.org/api](https://nodejs.org/api)

## Directory Structure

The repository for the example applications is available at [github.com/vanilla-project/node-command-line](https://github.com/vanilla-project/node-command-line).

A typical directory structure for a node.js command line project consists of a `src` directory that contains all source files and a `test` directory that includes all tests.

Since the community of Node.js users is so large, it is difficult to see a standard in the way apps are structured.
It is easy to find node command line applications that don't follow the folder structure below.

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/node-command-line).

<ul class="directory-structure">
  <li class="directory">src</li>
  <li class="directory">test</li>
  <li class="js file">index.js</li>
  <li class="json file">package.json</li>
</ul>

{% include_relative overview.md %}

### Naming Conventions

File and directory names are in lower case and files match the classes or modules they contain.
For example the class `Vanilla` should be contained in file `vanilla.js`.

Tests match their production code file names with a `.spec` suffix, e.g. tests for code in `src/vanilla.js` should be written in `test/vanilla.spec.js`.


## Example Project

The repository for the example applications is available at [https://github.com/vanilla-project/node-command-line](https://github.com/vanilla-project/node-command-line).

The main application consists of basically three files:

- `index.js` is the main executable that instantiates and runs:
  - `src/app.js` contains the main application that uses:
    - `src/example.js` which contains only one method that returns a string.


### Running the Application

To run the application we can execute `npm start`.
This should print the text &ldquo;Node Example&rdquo;.

```
$: npm start
Node Example
```

### Running the Tests

To run the tests we execute `npm test` which then looks for all files inside directory `test` and runs them.
The output should look like the following:

```
$: npm test

> command-line@0.0.1 test /Users/nickbdyer/projects/beer_idea/node-command-line
> mocha test/ --reporter dot

  ․․

  2 passing (7ms)

```


#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

`App` on the other hand is tested via a test-double that gets injected.
This allows us to _spy_ on the output of it.

It is not trivial to create a Duplex Stream in Node that behaves identically to
stdout. Since `Console` takes a stream in it's constructor we have used
a `Writable Stream` to a file that is then read back in for the test assertion.

In the executable `index.js` we then inject `$stdout` into `new Console`, which is Node's variable for its standard output.

