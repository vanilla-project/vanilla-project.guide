---
title: Java Command Line
date: 2017-10-14
---

_Java is a general-purpose programming language introduce little over 20 years ago. It has become widely popular in the enterprise space due to the Java Virtual Machine, the Garbage Collector, a similar programming model to C/C++ but the promise of easier-to-write programms than its competitors of the time_

_It is statically typed, notorious for a proliferation of `null`, and relies on polymorphism for clever solutions to problems. Since Java 8, more and more functional programming elements have found their way into the languge, such as `Stream` and `Optional<T>`, makring a resurgance since the more traditional Java 6 and 7 releases._  

## Further Material

- [Download](https://java.com/de/download/) from the offical site
- Official [JavaDocs](https://docs.oracle.com/javase/8/docs/api/)
- Java Tutorials: [docs.oracle.com](http://docs.oracle.com/javase/tutorial)
- Java [Koans](https://github.com/matyb/java-koans) to learn the language a single test at a time


## Topics, Tools and Terms

_Explain some general terminology that's being used in the community here._


### Dependency Management

Java dependencies are called _jars_.
There multiple established tools (_Maven, Ivy, Gradle, sbt_) to declare and manage Java dependencies.
These tend to come bundled with some kind of task execution framework.
In this guide we will focus on _Gradle_ to maintain our Java projects, though we will lean heavily on standard and practices inspired by _Maven_.

// TODO: Install gradle?

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

None that I have used myself and can thus recommend.


### Testing Tools

// JUnit and Hamcrest 


## Directory Structure

_Every language has either an expected layout or at least the community agreed on a common way to organize projects._

<ul class="directory-structure">
  <li class="directory">src</li>
  <li class="directory">test</li>
  <li class="file">main.file</li>
</ul>


### Naming Conventions

_It helps explaining the conventions for file and directory names (e.g. do the tests live in `test`, `tests`, `spec`, &hellip;?)._


## Tests

_If applicable for the given language and project type we should also explain different testing strategies._
_Like approaches to unit-, controller-, integration- and acceptance-testing._

_This does not always apply, so feel free to remove that subchapter if that is the case._
_For example if the guide is about a command-line program, explaining how to test controllers isn't really possible._
_Whereas if the guide focusses on a web-framework in a given language, it might be worthwhile explaining a controler- and acceptance-testing approach._


## Example Project

_Every guide should come with an example repository that has working code to demonstrate a basic setup._
_Ideally there's a simple unit test available as well to demonstrate how to test with the language._


### Running the Application

_Provide instructions to run the actual application._


### Running the Tests

_Show how to run the tests and if needed explain how different moving parts fit together._


#### Testing Approach

_Different testing strategies can be explained, too!_

