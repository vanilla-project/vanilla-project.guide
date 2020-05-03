---
title: Command Line Application
date:  2020-05-03
tags:
  - command-line
---

Rust is a strongly typed programming language with focus on performance and memory-safety.
It's been designed at Mozilla Labs in 2010.


## Further Material

- Homepage: [rust-lang.org](https://www.rust-lang.org)
- The Rust Book: [doc.rust-lang.org](https://doc.rust-lang.org/book)
- Rust Package Registry: [crates.io](https://crates.io)
- Cargo Book: [doc.rust-lang.org](https://doc.rust-lang.org/cargo/guide)


## Topics, Tools and Terms

Rust packages are called _crates_, and the tool to manage the lifecycle of a project is called _cargo_.
It comes with the Rust language distribution itself.

Cargo lets us run commands to build and test projects or install new binaries.
It does not provide a way via the command line to add a new dependency, though.


### Dependency Management

The way to add new packages to a project is to edit a file called `Cargo.toml` and add the new package(s) in there.
Whenever the next `cargo build` or `cargo test` is executed, cargo will download any new dependencies then.
There is, however, a tool available for that: `cargo-edit` (see [`cargo-edit`'s GitHub repository](https://github.com/killercup/cargo-edit)).

Cargo uses the file `Cargo.toml` to keep track of required dependencies for a given project (together with `Cargo.lock`).
An example `Cargo.toml` looks like this:

{% highlight toml %}
[package]
name = "vanilla-project"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"

[dependencies]
{% endhighlight %}


### Version Managers

The official tool to manage different versions of Rust on one's system is called _rustup_.
See [its website](https://rustup.rs) as well as its [GitHub repository](https://github.com/rust-lang/rustup) for more details.


### Testing Tools

The Rust programming languages comes with testing support built in.
It provides some basic helper [macros](https://doc.rust-lang.org/stable/rust-by-example/macros.html) for assertions:

- `assert!(expression)`
- `assert_eq!(left, right)`
- `assert_ne!(left, right)`

When first looking at only these three primitives it seemed as if that wasn't enough for a good suite of (unit) tests.
It turns out that testing with just these three macros, projects can get a long way until they feel the need for more sophisticated testing capabilities.

There are some projects out there that attempt to bring [Hamcrest](http://hamcrest.org) matchers to Rust, though.
In our guide we will be using the default testing macros Rust comes with only.


## Directory Structure

Cargo is used to scaffold a new command line project for us.
It refers to it as a _binary project_ and can be created via `cargo new <project name> --bin`.

The good thing about cargo taking care of a project layout is that it contains the community standards of what a Rust project should look like.
In Rust there are technically no discussions whether or not source code should live in `src` or `lib` or something else.
The tooling takes care of that, and the tooling has been created with and by the community of Rust.

A typical directory structure consists of a `src` directory that contains all source modules.
We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/rust-command-line).

<ul class="directory-structure">
  <li class="directory">src</li>
  <li class="text file">Cargo.toml</li>
  <li class="text file">Cargo.lock</li>
</ul>

The Cargo Book has [its own chapter about package layout](https://doc.rust-lang.org/cargo/guide/project-layout.html) with further details.


### Unit Tests and Integration Tests

One difference that stands out to other languages is that there is no `src`/`test` directory serparation between production code and its unit tests in Rust.
Unit tests live _inside_ the modules defined in `src` &mdash; usually towards the bottom of the file.
It is possible, though, to have a `tests` directory on the root level of our projects.
Tests in there are considered _integration tests_, that test a wider scope of the project than individual unit tests.

The Rust Book has more guidance on [writing tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) and [test organisation](https://doc.rust-lang.org/book/ch11-03-test-organization.html).


### Naming Conventions

File and directory names are in lower case ([snake case](https://en.wikipedia.org/wiki/Snake_case) if separations are needed).

There's no 1:1 relation between functions, traits or structs and their containing modules.
For example the trait `Example` does not have to be defined in a file called `example.rs`.


## Example Project

The repository for the example applications is available at [github.com/vanilla-project/rust-command-line](https://github.com/vanilla-project/rust-command-line).

The main application consists of two files:

- `src/main.rs` is the main executable with a function that uses:
  - `src/example.rs` which contains only one function that returns a string.


### Running the Application

To run the application we can use cargo.
After it has been compiled, this should print the text &ldquo;Rust Example&rdquo;.

```
$: cargo run
   Compiling rust-command-line v0.1.0 (/home/vanilla/rust-command-line)
    Finished dev [unoptimized + debuginfo] target(s) in 1.90s
     Running `target/debug/rust-command-line`
Rust Example
```


### Running the Tests

To run the tests we execute `cargo test` which then looks for all modules inside of `src` that contain test code and executes them.
The output should look like the following:

```
$: cargo test
   Finished test [unoptimized + debuginfo] target(s) in 0.00s
    Running target/debug/deps/rust_command_line-3c93c33fdb784beb

running 2 tests
test example::tests::returns_message ... ok
test tests::prints_message ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```


#### Testing Approach

The test for function `example::message` is only verifying the return value of it.

Testing `main::print_messaage` on the other hand is done via a test-double that gets injected.
This allows us to _spy_ on the output it produces.
We want to avoid printing anything to the screen while running the tests.
Injecting a test double in this instance is a nice way to isolate our application from the command line.

