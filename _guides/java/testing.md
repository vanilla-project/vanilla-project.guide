The standard testing framework is called [JUnit](http://junit.org).
JUnit is primarily a runner for our tests, and it comes with it's own matchers like `assertEquals`, `assertTrue`, etc.
There are alternatives to that, which provide a more fluent way to express expectations of a test.

One other matcher library is [Hamcrest](http://hamcrest.org).
It supports exepectations in the style of

{% highlight java %}
assertThat(a, is(equalTo(b)));
{% endhighlight %}

compared to the more traditional JUnit style

{% highlight java %}
assertEquals(a, b);
{% endhighlight %}

Another one is AssertJ, which allows expectations in the style of

{% highlight java %}
assertThat(a).isEqualTo(b);
{% endhighlight %}

JUnit itself comes with Hamcrest bundled automatically, so in this guide and the example application we will be using Hamcrest style assertions.
