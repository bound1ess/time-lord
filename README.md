# Time-lord [![Build Status](https://travis-ci.org/bound1ess/time-lord.svg?branch=master)](https://travis-ci.org/bound1ess/time-lord)

Work with timestamps in a specific format. Works in Node.js as well as in browsers (agnostic).

## Idea

I actually needed such a thing for a private project. It is a pretty cool idea, look:

```JavaScript
var someConfigurationObject = {
    someTimestamp: "5h 20m 30s", // => 5 hours, 20 minutes and 30 seconds (ago).
};
```

So here is what I came to:

```JavaScript
var timestamp = "1y 2mo 15d 10h 23m 30s 240ms", timeLord = require("time-lord");
// If you are using it on client side (browser), timeLord will be already available in `window` scope.

timeLord.parse(timestamp);
// => {years: 1, months: 2, days: 15, hours: 10, mins: 23, secs: 30, ms: 240}

timeLord.forHumans(timestamp);
// => "1 year, 2 months, 15 days, 10 hours, 23 minutes, 30 seconds and 240 milliseconds"

timeLord.toSeconds(30, "s");
// => 1800

timeLord.toSeconds("30s");
// => 1800

timeLord.map(timeLord.parse(timestamp), {secs: "seconds", mins: "minutes"});
// => { ... seconds: 30, minutes: 23}
```

## Installation

```shell
npm install time-lord
```

## Tests

```shell
grunt test
```

## Code minification

```shell
grunt minify-js
# Check out dist/ directory.
```

## Code coverage

Aiming for 100%.

```shell
npm run get-coverage
# Check out coverage/ directory.
```

## License

MIT.
