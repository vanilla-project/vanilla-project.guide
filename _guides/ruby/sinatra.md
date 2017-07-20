---
title: Sinatra Application
date: 2017-07-13
---

Sinatra is a lightweight framework to build web applications with Ruby.

{% include_relative overview.md %}


## Directory Structure

Similar to the default directory structure for Ruby projects, Sinatra applications have a `lib` and `spec` directory.
Additionally to that it is good practice to have a separate `app` (also sometimes called &ldquo;`web`&rdquo;) directory that encapsulates all Sinatra and web-related code like views or templates.

<ul class="directory-structure">
  <li class="directory">app</li>
  <li class="directory">lib</li>
  <li class="directory">spec</li>
  <li class="text file">config.ru</li>
  <li class="ruby file">Gemfile</li>
  <li class="text file">Gemfile.lock</li>
</ul>

We provided a working example of a minimal Sinatra application on [Github](https://github.com/vanilla-project/ruby-sinatra).


### Important Files

Sinatra uses [Rack](http://rack.github.io), a standard interface for Ruby webservers, behind the scenes.
Rack applications can be configured via a file called [`config.ru`](config.ru) and started with the command `rackup` (the `.ru` ending stands for _**r**ack **u**p_).


### Naming Conventions

File and directory names are in lower case and files match the classes or modules they contain.
For example the class `Vanilla` should be contained in file `vanilla.rb`.

Tests match their production code file names with a `_spec` suffix, e.g. tests for code in `lib/vanilla.rb` should be written in `spec/vanilla_spec.rb`.


## Example Project

The repository for an example applications is available at [github.com/vanilla-project/ruby-sinatra](https://github.com/vanilla-project/ruby-sinatra).

The main building blocks of the application are the following three files:

- `config.ru` runs the application by requiring:
  - `app/application.rb` that contains the main Sinatra application which itself requires
    - `lib/example.rb` to provide an example message that will be presented on the index page of the web application.


### Running the Application

To start a Sinatra application we invoke: `bundle exec rackup`.
When executing that, `rackup` will automatically look for the file `config.ru` as it is the default when no arguments are given.
It will then print logging information similar to the following:

{% highlight shell %}
$: bundle exec rackup
[2017-07-13 07:20:01] INFO  WEBrick 1.3.1
[2017-07-13 07:20:01] INFO  ruby 2.3.1 (2016-04-26) [x86_64-linux]
[2017-07-13 07:20:01] INFO  WEBrick::HTTPServer#start: pid=26153 port=9292
...
{% endhighlight %}

This shows that the application is running and listening on port `9292`.
The host and port can also be configured via `--host` and `--port` arguments respectively.

Using a browser to navigate to `http://localhost:9292` will then show the example page.


### Running the Tests

To run all tests with RSpec we execute:

{% highlight shell %}
bundle exec rspec
{% endhighlight %}

This will execute the unit tests for all classes inside the `lib` directory as well as tests that exercise the actual Sinatra application.

#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

Tests for the main Sinatra application on the other hand use [`rack-test`](http://github.com/rack-test/rack-test) to verify that the index page can be rendered successfully.
This gem provides helper methods to exercise a Rack application during testing (e.g. `get` to send a GET request to the application).
The benefit of using `rack-test` is that we don't need to issue real HTTP requests to verify the application.

