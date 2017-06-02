---
title:  Ruby Command Line Application
date: 2017-04-09
---

Ruby is a powerful dynamically typed, object oriented programming language created by Yukihiro &ldquo;Matz&rdquo; Matsumoto in 1995.
Its strength is in its almost English sentence reading syntax as well as its flexible and open object oriented system.


## Further Material

- Homepage: [ruby-lang.org](https://www.ruby-lang.org)
- Documentation: [ruby-doc.org](http://ruby-doc.org)
- Try Ruby in your browser: [tryruby.org](http://tryruby.org)
- Ruby Koans: [rubykoans.com](http://rubykoans.com)
- Learn Ruby the Hard Way: [learnrubythehardway.org](https://learnrubythehardway.org/book)


## Topics, Tools and Terms

Ruby packages are called _gems_, and the tool to install new packages, called (`gem`), comes with the Ruby language distribution itself.
`gem` lets us run install commands to add packages to our system, for example `gem install rails` will install Rails on our system.


### Dependency Management

Having to install dependencies by hand quickly becomes tedious and time consuming.
Luckily we have a tool called _Bundler_ to help with that; Bundler needs to be installed as a gem: `gem install bundler`.
This will install Bundler globally with the other gems on our system and provide the executable `bundle` for us which we're going to use later.

Now we have a way to _bundle_ and manage our dependencies in a file called a `Gemfile`.
The content of that file is a list of gems we need for a given project.
An example Gemfile looks like this:

{% highlight ruby %}
source "https://rubygems.org"
gem "rails", "5.0.2"
{% endhighlight %}

The first line tells Bundler where to look for all gems.
[Rubygems.org](https://rubygems.org) is a central place where Ruby gems are available.
The second line adds Rails as a dependency (with version `5.0.2`).
This is helpful to make sure every developer has the same versions installed on their systems.
It is also helpful when we deploy our Ruby applications to a server for the same reason.

To have bundler installing everything needed for us we run `bundle install`.
This will download all dependencies specified in the `Gemfile`.


### Version Managers

Once you start working on more than one Ruby project a version manager will prove very beneficial.

Without a version manager we'd need to always install the currently needed version of Ruby for the project we're working on.
This isn't so much a problem at the beginning, but once we work on one or two different projects that use different versions of Ruby it's helpful to be able to just switch between versions.

We recommend using a version manager in order to be able to use different ruby versions on your system.

There are several version managers available: RVM, rbenv and chruby to name a couple of popular ones.
They all solve the same problem and choosing one mostly boils down to personal preference.

A version manager will allow you to use different Ruby versions for different projects, so that you don't always need to install a new Ruby version whenever you switch to a project that needs a different version.
This can even be automated with a file named `.ruby-version` that contains the ruby version the project expects.


### Testing Tools

For testing there are basically two options: [Minitest](http://docs.seattlerb.org/minitest) or [RSpec](http://rspec.info).
Minitest follows the classic xUnit framework approach, whereas RSpec follows the behaviour driven design approach.
Both frameworks are equally powerful and it boils down to personal preference which one you pick.
In our guides we will be using RSpec as the default testing framework.


## Directory Structure

A typical directory structure for a ruby command line project consists of a `lib` directory that contains all source files and a `spec` directory that includes all tests.
Another common convention is having a `bin` directory that may contain executable files to start your application.

We provided a working example of a minimal project on [Github](provide URL here).

<ul class="directory-structure">
  <li class="directory">lib</li>
  <li class="directory">spec</li>
  <li class="ruby file">Gemfile</li>
  <li class="text file">Gemfile.lock</li>
</ul>

