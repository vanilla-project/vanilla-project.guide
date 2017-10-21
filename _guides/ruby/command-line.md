---
title: Command Line Application
date:  2017-04-09
tags:
  - command-line
---

Ruby is a powerful dynamically typed, object oriented programming language created by Yukihiro &ldquo;Matz&rdquo; Matsumoto in 1995.
Its strength is in its almost English sentence reading syntax as well as its flexible and open object oriented system.


## Further Material

- Homepage: [ruby-lang.org](https://www.ruby-lang.org)
- Documentation: [ruby-doc.org](http://ruby-doc.org)
- Try Ruby in your browser: [tryruby.org](http://tryruby.org)
- Ruby Koans: [rubykoans.com](http://rubykoans.com)
- Learn Ruby the Hard Way: [learnrubythehardway.org](https://learnrubythehardway.org/book)


{% include_relative overview.md %}


## Directory Structure

A typical directory structure for a ruby command line project consists of a `lib` directory that contains all source files and a `spec` directory that includes all tests.
Another common convention is having a `bin` directory that may contain executable files to start your application.

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/ruby-command-line).

<ul class="directory-structure">
  <li class="directory">lib</li>
  <li class="directory">spec</li>
  <li class="ruby file">Gemfile</li>
  <li class="text file">Gemfile.lock</li>
</ul>


### Naming Conventions

File and directory names are in lower case and files match the classes or modules they contain.
For example the class `Vanilla` should be contained in file `vanilla.rb`.

Tests match their production code file names with a `_spec` suffix, e.g. tests for code in `lib/vanilla.rb` should be written in `spec/vanilla_spec.rb`.


## Example Project

The repository for the example applications is available at [github.com/vanilla-project/ruby-command-line](https://github.com/vanilla-project/ruby-command-line).

The main application consists of basically three files:

- `bin/example` is the main executable that instantiates and runs:
  - `lib/main.rb` contains the main application that uses:
    - `lib/example.rb` which contains only one method that returns a string.


### Running the Application

To run the application we can execute `bin/example`.
This should print the text &ldquo;Ruby Example&rdquo;.

```
$: ./bin/example
Ruby Example
```


### Running the Tests

To run the tests we execute `bundle exec rspec` which then looks for all files inside directory `spec` and runs them.
The output should look like the following:

```
$: bundle exec rspec
..

Finished in 0.00469 seconds (files took 0.07548 seconds to load)
2 examples, 0 failures
```


#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

`Main` on the other hand is tested via a test-double that gets injected.
This allows us to _spy_ on the output of it.
We want to avoid printing anything to the screen while running the tests.
Injecting a test double in this instance is a nice way to isolate our application from the command line.

In the executable `bin/example` we then inject `$stdout`, which is Ruby's variable for its standard output.

