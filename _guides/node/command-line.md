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


## Topics, Tools and Terms

Node packages are managed through Node Package Manager, commonly called just _npm_. It comes with the Node.js language distribution itself.
`npm` lets us run install commands to add packages to our system, for example `npm install express` will install Express.js on our system.


### Dependency Management

Having to install dependencies by hand quickly becomes tedious and time consuming.

_npm_ helps us manage our dependencies in a file called a `package.json`.
The content of that file is a list of packages we need for a given project.
An example `package.json` looks like this:

{% highlight javascript %}
{
  "name": "our-cool-project",
  "version": "0.0.9",
  "private": true,
  "scripts": {
    "start": "nodemon bin/index --exec babel-node",
    "build": "babel bin -d dist",
    "serve": "node dist/index.js",
    "lint": "eslint config app/** --ext .js",
    "fix": "eslint --fix config app/** --ext .js",
    "test": "mocha --compilers js:babel-register -r test/setup.js test --recursive"
  },
  "dependencies": {
    "body-parser": "~1.17.1",
    "ejs": "^2.5.6",
    "express": "~4.15.2",
    "morgan": "~1.8.1",
    "babel-preset-es2015": "^6.5.0",
    "babel-core": "6.11.4",
    "babel-eslint": "6.1.2"
  },
  "devDependencies": {
    "babel-register": "^6.24.1",
    "chai": "3.5.0",
    "eslint": "^3.19.0",
    "mocha": "3.2.0",
    "nodemon": "^1.11.0",
  }
}
{% endhighlight %}

We have more than just dependency management captured here.
As you can see there is a section for scripts, scripts can be run from the command line via the `npm` command, for example `npm run lint` or `npm start`.
Custom commands need the word `run` after `npm`, but default commands like `start` can be run with just `npm start`.

The second section adds project dependencies with versions, similar to other package managers.
The third adds dependencies that are only required for the development of the project, not for running it in production.

When faced with a new project and an existing `package.json`, have npm install everything needed by running `npm install`.
This will download all dependencies specified in the `package.json`.


### Version Managers

Once you start working on more than one Node.js project a version manager will prove very beneficial.

Without a version manager we'd need to always install the currently needed version of Node.js for the project we're working on.
This isn't so much a problem at the beginning, but once we work on one or two different projects that use different versions of Node it's helpful to be able to just switch between versions.

We recommend using a version manager in order to be able to use different node versions on your system.

The most popular and well maintained version manager available is Node Version
Manager, NVM.


### Testing Tools

There are a lot of testing tools available in the javascript ecosystem: Jasmine, Mocha, Karma, Chai, Sinon.

The main difference to consider is that Mocha and Karma are test runners, so they need to be combined with seperate assertion and mocking libraries (Chai, Sinon respectively) in order to function.
Jasmine comes with everything out of the box so you don't need to worry about extra libraries.

All frameworks are mostly equally powerful and it boils down to personal preference which one you pick.

In our guides we will be using Mocha and Chai as the default testing framework.


## Directory Structure

The repository for the example applications is available at [github.com/vanilla-project/node-command-line](https://github.com/vanilla-project/node-command-line).

A typical directory structure for a node.js command line project consists of a `src` directory that contains all source files and a `test` directory that includes all tests.

Since the community of Node.js users is so large, it is difficult to see a standard in the way apps are structured.
It is easy to find node command line applications that don't follow the folder structure below.

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/node-command-line).

<ul class="directory-structure">
  <li class="directory">src</li>
  <li class="directory">test</li>
  <li class="json file">package.json</li>
</ul>


