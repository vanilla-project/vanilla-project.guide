---
title: Maven Command Line Application
date:  2017-10-15
tags:
  - command-line
  - Maven
---

{% include_relative overview.md %} 


## Further Material

- Java Platform: [docs.oracle.com](http://docs.oracle.com/javase/8/docs)
- Java Tutorials: [docs.oracle.com](http://docs.oracle.com/javase/tutorial)
- Maven: [maven.apache.org](http://maven.apache.org)


## Topics, Tools and Terms

Java packages are distributed in _jars_ (from _**J**ava **ar**chive_).
The central repository to download these jars from is [Maven central](https://search.maven.org).

The Java Virtual Machine (short: JVM) is the platform all Java programs run on.
It allows Java code to be operating system agnostic, meaning that a Java program written on MacOS can be compiled and run on Windows without modification.

Maven is not just a tool for build or dependency management, it supports the whole lifecycle for Java projects.
That includes compiling, testing, packaging, releasing and deploying of a project (amongst many other more).
More about Maven's build lifecycle can be found on the [official documentation](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html).


### Dependency Management

One part Maven helps with is managing the dependencies of a project.
The central configuration file for that is called `pom.xml` (POM stands for Project Object Model) and it defines metadata, structure and dependencies of a project.
It's content is written in XML and this is what a basic `pom.xml` looks like:

{% highlight xml %}
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>guide.vanilla_project</groupId>
  <artifactId>java-maven-command-line</artifactId>
  <version>1.0-SNAPSHOT</version>

  <name>Java Maven Command Line Application</name>
  <url>https://vanilla-project.guide/java/maven-command-line</url>

  <dependencies>
    <dependency>
      <groupId>org.junit.vintage</groupId>
      <artifactId>junit-vintage-engine</artifactId>
      <version>4.12.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
{% endhighlight %}

Let's go through that file line by line:
The `modelVersion` tells Maven about the POM version itself.
It defines what tags can be used for example.
The more interesting settings are the ones that come after that.

Java packages are primarily identified by the `groupId` and `artifactId`.
Where `groupId` is an identifier for the author of that jar.
A convention for that is to use a top-level domain in reverse order.
This would be `com.google` for jars from Google or `org.apache.maven` for Maven itself.
The `artifactId` then identifies the application/library inside the namespace of `groupId`.

The setting for `version` defines, as the name implies, the particular version of a jar file.
In our example you there's a &ldquo;SNAPSHOT&rdquo; qualifier that declares a development, or &ldquo;as-yet-unreleased&rdquo; version.
Oracle's documentation has [more information about Maven version numbers](https://docs.oracle.com/middleware/1212/core/MAVEN/maven_version.htm).

For `name` we can choose whatever description we want to name our project.
Last but not least `url` can define a URL of the project itself.

After that comes the list of dependencies.
In the exampe we declare JUnit as a dependency for the project.
The `<scope>test</scope>` tag will make sure that JUnit will only be part of the program during testing, not when it is packaged up for production use.


### Version Managers

Version managers allow us to quickly switch between different language versions.
There's no support to automatically install new versions, though.
With Java this is a manual process.


### Testing Tools

{% include_relative testing.md %}


## Directory Structure

The directory structure for a maven project consists of a `src` directory that has two sub-directories:
1. `main` for the production code.
2. `test` for the tests.

Inside each of those it's possible to have a `resources` directory to contain general assets for the project like images or configuration files.

We provided a working example of a minimal project on [Github](https://github.com/vanilla-project/java-maven-command-line).

<ul class="directory-structure">
  <li class="directory">
    src
    <ul>
      <li class="directory">main<ul><li class="directory">java</li></ul></li>
      <li class="directory">test<ul><li class="directory">java</li></ul></li>
    </ul>
  </li>
  <li class="ruby file">pom.xml</li>
</ul>

Every subdirectory inside each `java` directory forms a [package](https://en.wikipedia.org/wiki/Java_package).
Packages are Java's way to give classes that belong together a namespace.


### Naming Conventions

{% include_relative naming.md %}


## Example Project

The repository for the example application is available at [github.com/vanilla-project/java-maven-command-line](https://github.com/vanilla-project/java-maven-command-line).

The main application consists of basically three files:

- `Main.java` is the main executable that instantiates and runs:
  - `App.java` contains the main application that uses:
    - `Example.java` which contains only one method that returns a string.


### Running the Application

To run the application we need to build it first.

This can be done by executing the `package` target of maven:

{% highlight shell %}
mvn package
{% endhighlight %}

This will download all dependencies, compile the code, run the tests and _package_ it up into a `.jar` file.

We can then execute the jar file to run our application:

{% highlight shell %}
java -jar target/java-maven-command-line-1.0-SNAPSHOT.jar
{% endhighlight %}


### Running the Tests

To run the tests we execute `mvn test` which then looks for all files inside directory `src/test` and runs them.
The output should look like the following:

```
$: mvn test
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------------------------------------------------------------
[INFO] Building java-maven-command-line 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO]
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ java-maven-command-line ---
[INFO] skip non existing resourceDirectory /Users/christoph/development/java-maven-command-line/src/main/resources
[INFO]
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ java-maven-command-line ---
[INFO] Nothing to compile - all classes are up to date
[INFO]
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ java-maven-command-line ---
[INFO] skip non existing resourceDirectory /Users/christoph/development/java-maven-command-line/src/test/resources
[INFO]
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ java-maven-command-line ---
[INFO] Nothing to compile - all classes are up to date
[INFO]
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ java-maven-command-line ---
[INFO] Surefire report directory: /Users/christoph/development/java-maven-command-line/target/surefire-reports

-------------------------------------------------------
 T E S T S
 -------------------------------------------------------
 Running guide.vanilla_project.AppTest
 Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.095 sec
 Running guide.vanilla_project.ExampleTest
 Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0 sec

 Results :

 Tests run: 2, Failures: 0, Errors: 0, Skipped: 0

 [INFO] ------------------------------------------------------------------------
 [INFO] BUILD SUCCESS
 [INFO] ------------------------------------------------------------------------
 [INFO] Total time: 1.969 s
 [INFO] Finished at: 2017-10-15T13:18:37+01:00
 [INFO] Final Memory: 9M/245M
 [INFO] ------------------------------------------------------------------------
```

#### Testing Approach

The test for class `Example` is only verifying the return value of one method.

`App` on the other hand is tested via a test-double that gets injected.
This allows us to _spy_ on the output of it.
We want to avoid printing anything to the screen while running the tests.
Injecting a test double in this instance is a nice way to isolate our application from the command line.

In the actual `Main` class we then inject `System.out`, which is Java's standard output stream.

