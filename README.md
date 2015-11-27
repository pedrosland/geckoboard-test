# Geckboard Test [![Build Status](https://travis-ci.org/pedrosland/geckoboard-test.svg?branch=master)](https://travis-ci.org/pedrosland/geckoboard-test)

## Running

You will need:

* Node and npm (I used v0.12 and v2.11 respectively). Travis claims it also works on Node v4.2 and v5.1
* Probably python and other build tools for node-sass
* Modern browser with support for ES2015 Promise API and CSS Flex

First,

    npm install

then

    npm run serve

then open your browser at http://localhost:8080. Note that by default, it enables hot(ish) reloading.

To run tests I've chosen Karma:

    npm run test

For development, I ran the tests automatically as part of my IDE with Karma in server mode.

## Possible approaches

I've made the assumption that we want the chart to be an SVG. This gives us scalable charts that are crisp on any
display density or medium.

After some thinking I came up with 3 possible ways to generate an SVG chart.

 * Use d3 or similar library to generate the chart on the fly in the browser
 * Create an SVG manually and tweak it with code in the browser
 * Use Illustrator/Inkscape to create the image and just CSS transform the indicator

Using d3 feels like the obvious choice as it provides us with lots of tools if we decide to create more complex charts
in future or add interactive features. It is also the most heavy-weight.

This feels a little like reinventing the wheel but it could allow us to easily generate the graph on the server if we
want to later without using tools like PhantomJS or JSDOM.

Using an SVG generated by a tool is probably the fastest way to get just this chart done. If it was a real world project
and we didn't want more charts in future, I'd almost certainly pick this. To achieve the same effect as in the
suggested image, we could cheat and use the indicator to block out the section of the curve.

### TDD

TDD for the chart itself becomes hard. The most sensible approach would be to test just the text and perhaps the angle
of the indicator. We probably don't want to mock lots of the d3 API. It probably doesn't make much sense to test an
image either.

Later on we could use regression testing with PhantomCSS or Wraith to make sure the chart is drawn correctly.

## Implementation

Why d3? I've used it before and while its power, elegance and API still scare me :) I know it is up to almost any task.
It probably wins for flexibility and future-proofing the project.

Why not use a framework? I didn't feel the project warranted one and I felt like not using one. I considered a few
including Angular, Angular2, React, [Mithril][mithril] and [Aurelia][aurelia]. 

Why Bacon? I love Bacon.js. Initially I wasn't sure if I wanted to have my components more pure but I decided that it
would be cool if they could accept a stream and update themselves. It meant that when I added polling later, it was very
easy.

Tests beside components? Yes. I like that. I can easily see what is what. I open one and the other is right there. I
could have taken more advantage of Webpack's css stuff and imported gauge.scss from gauge.js. Not sure if I like that.

## Limitations

This is the biggie. As I mentioned above, using d3 limits the code to the browser. This probably isn't great if we want
to allow the user to download images or make them available through an API. Our options are probably JSDOM or PhantomJS.
We could still take advantage of d3's robustness though. Some parts like `d3.svg.arc` and probably `d3.scale.linear`
which are nice and well tested already could still be used on the server.

Without a framework to guide us, care would have to be taken to avoid code soup. We'd just need to be careful and
 probably document what we felt that a "component" was and should be (not) responsible for. With ES2015 templates though
 it should be possible to build a maintainable web app in a similar way. Using a framework may make things easier,
 improve productivity and performance.

When building a UI, I consider something kind of rough and ready like this a limitation as a user may expect something
smarter.

## TODO

Some things still to do are:

 * Fix travis (it is untested so I assume it doesn't work)
 * Build for production. Untested. Eg it would be nice if the CSS was extracted to its own file
 * Fix some sneaky edge cases eg API returns max < min sometimes
 * Probably use the d3 format helper for formatting numbers
 * Support more currency codes
 * It could look prettier
 * Animate from one value to the next. If we wanted the arch to look like the sample with animation, d3 could help us.
 * No min/max value displayed (although it is used)
 * E2E tests with selenium. Likely [selenium-standalone][selenium-standalone] with mocha and perhaps
    [webdriver.io][webdriver.io]. [Nightwatch.js][nightwatch.js] does look cool but I've never used it.
 * Perhaps [PhantomCSS][phantomcss] or [Wraith][wraith]?
 * Move index.html and favicon.ico to some more sensible place.
    This just worked with webpack-dev-server so I went with it.

Time taken about 4 hours. Writing this took longer.

[mithril]: http://mithril.js.org/
[aurelia]: http://aurelia.io/
[selenium-standalone]: https://www.npmjs.com/package/selenium-standalone
[webdriver.io]: http://webdriver.io/
[nightwatch.js]: http://nightwatchjs.org/
[phantomcss]: https://github.com/Huddle/PhantomCSS
[wraith]: https://github.com/BBC-News/wraith
