---
title: Gradle Command Line Application
date: 2017-10-14
---

{% include_relative overview.md %} 

## Further Material

- [Download](https://java.com/de/download/) from the offical site
- Official [JavaDocs](https://docs.oracle.com/javase/8/docs/api/)
- Java Tutorials: [docs.oracle.com](http://docs.oracle.com/javase/tutorial)
- Java [Koans](https://github.com/matyb/java-koans) to learn the language a single test at a time


## Topics, Tools and Terms

Java packages are distributed in _jars_ (from _**J**ava **ar**chive_).
The central repository to download these jars from is [Maven central](https://search.maven.org).

The Java Virtual Machine (short: JVM) is the platform all Java programs run on.
It allows Java code to be operating system agnostic, meaning that a Java program written on MacOS can be compiled and run on Windows without modification.

Gradle is not just a tool for build or dependency management, it supports the whole life-cycle for Java projects.
That includes compiling, testing, packaging, releasing and deploying a project.
Gradle can be expanded with custom tasks for specific needs of the project. You can find out more about writing tasks in the [official documentation](https://docs.gradle.org/current/userguide/more_about_tasks.html)


### Dependency Management

Java dependencies are called _jars_.
There multiple established tools (_Maven, Ivy, Gradle, sbt_) to declare and manage Java dependencies.
These tend to come bundled with some kind of task execution framework.
In this guide we will focus on _Gradle_ to maintain our Java projects, though we will lean heavily on standard and practices inspired by _Maven_.

Start out by creating an initial scaffolding with `gradle init --type java-application`.
This will create the basic files and folder that form the core structuer of a _Gradle_ application.
For the time being, lets focus on the `build.gralde` file. It defines our project, its dependencies, and any tasks that we'd need to run.

The inital setup has created a minimal skeleton of a `build.gradle` file (comments ommited):

```groovy
// Plugins are a way to share common configuration settings between projects
// Apply the java plugin to add basic support for Java, while the `application`
// adds some basic tasks to package up our application when its ready.
apply plugin: 'java'
apply plugin: 'application'

// Where to get dependencies from. JCenter is the largest repository of jars and very reputable
repositories {
  jcenter()
}

// This is where we will declare our dependnecies
dependencies {
    testCompile 'junit:junit:4.12'
}

// Define the main class for the application, which is part of the `application` plugin
mainClassName = 'App'

```

Let us focus on the `dependencies` block to learn how to maintain our project dependencies.
Dependening on whether you need the dependency as part of your production code or only as part of the testing infrastructue you'll need to declare you dependency as part of the `compile` configuration or the `testCompile` configuration.
In the above example, the JUnit jar has been added to to the `testCompile` configuration as there is no use for it as part of the finished application.
The string in single-quotes represents the _Maven Artifact_ notation, namely the _groupId_, the _artifactId_, and the _version_.
This allows _Gradle_ to pinpoint the depedency, locate it in the repository, and download it wiht _its_ dependencies.

If we wanted to add the _Apache Commons Language_ utilities in version 3.6 we would write the following:

```groovy
...
dependencies {
    compile 'org.apache.commons:commons-lang3:3.6'
    testCompile 'junit:junit:4.12'
}
...
```

There are more configurations such as `runtime` and `testRuntime` that are used for specialised purposes. See the [Gradle Documentation](https://docs.gradle.org/current/userguide/dependency_management.html) for more details.

### Version Managers

Version managers allow us to quickly switch between different language versions.
There's no support to automatically install new versions, though.
With Java this is a manual process.


### Testing Tools

{% include_relative testing.md %}


## Directory Structure

The directory structure for a Gradle project using the `maven` plugin consists of a `src` directory that has two sub-directories:
1. `main` for the production code.
2. `test` for the tests.

Inside each of those it's possible to have a `resources` directory to contain general assets for the project like images or configuration files.

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/java-gradle-command-line).

<ul class="directory-structure">
  <li class="directory">
    src
    <ul>
      <li class="directory">main<ul><li class="directory">java</li></ul></li>
      <li class="directory">test<ul><li class="directory">java</li></ul></li>
    </ul>
  </li>
  <li class="ruby file">build.gradle</li>
</ul>

Every subdirectory inside each `java` directory forms a [package](https://en.wikipedia.org/wiki/Java_package).
Packages are Java's way to give classes that belong together a namespace.


### Naming Conventions

{% include_relative naming.md %}


## Example Project

The repository for the example application is available at [github.com/vanilla-project/java-gradle-command-line](https://github.com/vanilla-project/java-gradle-command-line).

The main application consists of basically three files:

- `Main.java` is the main executable that instantiates and runs:
  - `App.java` contains the main application that uses:
    - `Example.java` which contains only one method that returns a string.


### Running the Application

To run the application we need to build it first.

This can be done by executing the `jar` task of gradle

{% highlight shell %}
gradle jar
{% endhighlight %}

This will download all dependencies, compile the code, run the tests and _package_ it up into a `.jar` file.

We can then execute the jar file to run our application:

{% highlight shell %}
java -jar ./build/libs/java-gradle-command-line.jar
{% endhighlight %}


### Running the Tests

To run the tests we execute `gradle test` which then looks for all files inside directory `src/test` and runs them.
The output should look like the following:

```
$: gradle test
BUILD SUCCESSFUL in 0s
3 actionable tasks: 3 up-to-date
```


#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

`App` on the other hand is tested via a test-double that gets injected.
This allows us to _spy_ on the output of it.
We want to avoid printing anything to the screen while running the tests.
Injecting a test double in this instance is a nice way to isolate our application from the command line.

In the actual `Main` class we then inject `System.out`, which is Java's standard output stream.


