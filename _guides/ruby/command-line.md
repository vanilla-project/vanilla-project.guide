---
title:  Ruby Command Line Application
date: 2017-04-09
---

Ruby is a powerful dynamically typed, object oriented programming language.


## Tools

Ruby packages are called _gems_, and the tool to install new packages (`gem`) comes with Ruby itself.
For example we can run `gem install rails` to install Rails on our system.


### Dependency Management

Because always having to install dependencies by hand becomes tedious and time consuming really fast, a tool called _Bundler_ is available.
Bundler needs to be installed as a gem: `gem install bundler`.
This will install Bundler globally and provide the executable `bundle` for us which we're going to use later.

Now we have a way to _bundle_ and manage our dependencies in a file called `Gemfile`.
The content of that file is a list of gems we need for our project.
An example Gemfile can look as follows:

{% highlight ruby %}
source "https://rubygems.org"
gem "rails", "5.0.2"
{% endhighlight %}

The first line tells Bundler where to look for all gems.
[Rubygems.org](https://rubygems.org) is a central place where Ruby gems are available.
The second line adds Rails as a dependency (with version `5.0.2`).
This is helpful to make sure every developer has the same versions installed on their systems.
But not only other developers, this is also helpful when we deploy our Ruby applications to a server.

To have bundler installing everything needed for us we run `bundle install`.
This will download all dependencies specified in the `Gemfile`.

Once you start working on more than one Ruby projects a version manager will prove very beneficial.

Without a version manager we'd need to always install the currently needed version of Ruby for the project we're working on.
This isn't so much a problem at the beginning, but once we work on one or two different projects that use different versions of Ruby it's helpful to be able to just switch between versions.

We recommend using a version manager in order to be able to use different ruby versions on your system.

### Version Managers

There are several version managers available: RVM, rbenv and chruby to name a couple of popular ones.
They all solve the same problem and choosing one mostly boils down to personal preference.

A version manager will allow you to use different Ruby versions for different projects, so that you don't always need to install a new Ruby version whenever you switch to a project that needs a different version.


## Directory Structure

A typical directory structure for a ruby project consists of a `lib` directory that contains all source files and a `spec` directory that includes all tests.
A common convention is a `bin` directory that may contain executable files to start your application.

<ul class="directory-structure">
  <li class="directory">lib</li>
  <li class="directory">spec</li>
  <li class="ruby file">Gemfile</li>
  <li class="text file">Gemfile.lock</li>
</ul>

