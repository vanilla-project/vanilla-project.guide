---
title: Command Line Application
date:  2020-04-17
tags:
  - command-line
---

Python is a dynamically typed, (optionally) object oriented programming language created by Guido van Rossum 1991.
It follows a design philosophy that favours readability over cleverness.
More about that can be found in the [Zen of Python](https://www.python.org/dev/peps/pep-0020/).


## Further Material

- Homepage: [python.org](https://www.python.org)
- Documentation: [python.org/doc](https://www.python.org/doc)
- The Hitchhiker’s Guide to Python: [docs.python-guide.org](https://docs.python-guide.org)
- Pipenv: [pipenv.pypa.io](https://pipenv.pypa.io/en/latest)
- pyenv: [github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)


## Topics, Tools and Terms

Python has _packages_ and the tool to install new packages is called `pip`.
It comes with the Python language distribution itself.
`pip` lets us run install commands to add packages to our system, for example `pip install django` will install Django on our system.

The main package registry is called PyPI (**Py**thon **P**ackage **I**ndex) and is available at [pypi.org](https://pypi.org).


### Dependency Management

Having to install dependencies by hand (`pip`) quickly becomes tedious and time consuming.
Which is why we want to use a dependency manager to do the heavy lifting for us.

Python has some history about how to manage a project's dependencies that involves a text file called `requirements.txt` and _virtual environments_.
Using the `requirements.txt` file works, but there is manual overhead on the person adding new packages.

Additionally, when installing packages via `pip` they will all be installed globally to your system.
Over time this will lead to a lot of unnecessary packages installed and you can run into incompatibilities between versions when working with multiple projects.
This is where virtual environments came in to help separating dependencies between projects and isolating them from each other.
Virtual environments, or _venvs_, enabled every project to install its own dependencies without interfering with other projects' dependencies.

Luckily, there is a tool that frees us from manual installations and managing virtual environments ourselves: Pipenv.
When using Pipenv you get a very similar tool to `bundler` in Ruby, or `npm` in Node.js.

Pipenv uses a `Pipfile` to list all necessary dependencies.

The content of that file contains a list of packages we need for a given project.
An example Pipfile looks like this:

{% highlight python %}
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[scripts]
test = "python -m pytest"

[dev-packages]
pytest = "==5.4.1"

[packages]

[requires]
python_version = "3.7"
{% endhighlight %}

The `[[source]]` part tells Pipenv where to look for all packages.
[pypy.org](https://pypi.org) is the central location where most or all Python packages are available.
Entries under `[packages]` or `[dev-packages]` list dependencies of the project.
Versions of dependencies can be specified to ensure that every developer has the same versions installed on their systems.
It is also helpful when we deploy our Python applications to a server for the same reason.

To have Pipenv installing everything needed for us we run `pipenv install --dev`.
This will download all dependencies specified in the `Pipfile`.


### Version Managers

We recommend using a version manager in order to be able to use different Python versions on your system.

The main version manager available for Python is [pyenv](https://github.com/pyenv/pyenv).

A version manager will allow you to use different Python versions for different projects, so that you don't always need to install a new Python version whenever you switch to a project that needs a different version.
This can even be automated with a file named `.python-version` that contains the Python version the project expects.


### Testing Tools

Python comes with unit testing support out of the box.
The [`unittest` module](https://docs.python.org/3/library/unittest.html) follows the traditional xUnit style.
Additionally `pytest` provides a wide range of options and styles to testing Python code.

Both frameworks are powerful and it boils down to personal preference which one you pick.
In our guides we will be using `pytest` as the default testing framework.


## Directory Structure

A typical directory structure for a Python command line project consists of a well named directory that contains all source files (&ldquo;sample&rdquo; in the table below) and a `tests` directory that includes all tests.

It is encouraged to give this _well named project directory_ the name of the application or package you're creating.
Python source directories don't usually reside in a `src` or `lib` root directory.
More on that can also be found in the [sub-chapter about project structure in _The Hitchhiker’s Guide to Python_](https://docs.python-guide.org/writing/structure).

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/python-command-line).

<ul class="directory-structure">
  <li class="directory">sample</li>
  <li class="directory">tests</li>
  <li class="python file">Pipfile</li>
  <li class="text file">Pipfile.lock</li>
</ul>


### Naming Conventions

File and directory names are in lower case ([snake case](https://en.wikipedia.org/wiki/Snake_case) if separations are needed).

There's no 1:1 relation between functions or classes and their containing modules.
For example the class `Example` does not have to be defined in a file called `example.py`.

Tests match their production code file names with a `test_` prefix, e.g. tests for code in `module/vanilla.py` should be written in `tests/test_vanilla.py`.


## Example Project

The repository for the example applications is available at [github.com/vanilla-project/python-command-line](https://github.com/vanilla-project/python-command-line).

The main application consists of basically two files:

- `sample/main.py` contains the main application that uses:
  - `sample/example.py` which contains only one method that returns a string.


### Running the Application

To run the application we can execute the module `sample/main`.
This should print the text &ldquo;Python Example&rdquo;.

```
$: python -m sample.main
Python Example
```


### Running the Tests

To run the tests we execute `pipenv run test` which then looks for all files inside directory `tests` and runs them.
The output should look like the following:

```
$: pipenv run test
================================= test session starts =================================
platform darwin -- Python 3.7.4, pytest-5.4.1, py-1.8.1, pluggy-0.13.1
cachedir: .pytest_cache
rootdir: ~/python-command-line, inifile: pytest.ini
collected 2 items

tests/test_example.py::TestExample::test_returns_message PASSED
tests/test_main.py::TestMain::test_prints_example_output PASSED

================================== 2 passed in 0.02s ==================================
```


#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

`Main` on the other hand is tested via a test-double that gets injected.
This allows us to _spy_ on the output of it.
We want to avoid printing anything to the screen while running the tests.
Injecting a test double in this instance is a nice way to isolate our application from the command line.

At the bottom of the executable main module [`sample/main.py`](https://github.com/vanilla-project/python-command-line/blob/master/sample/main.py#L16) we inject `sys.stdout`, which is Python's variable for its standard output.

