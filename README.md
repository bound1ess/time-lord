# Time-lord

Work with timestamps in a specific format.

## Idea

I actually needed such a thing for a private project. It is a pretty cool idea, look:

```JavaScript
var someConfigurationObject = {
    someTimestamp: "5h20m30s", // => 5 hours, 20 minutes and 30 seconds (ago)
};
```

So here is what I came to:

```JavaScript
var timestamp = "1y 2mo 15d 10h 23m 30s 240ms";

TimeLord.parse(timestamp); // => {y: 1, mo: 2, d: 15, h: 10, m: 23, s: 30, ms: 240}
TimeLord.humanReadable(timestamp);
// => "1 year, 2 months, 15 days, 10 hours, 23 minutes, 30 seconds and 240 milliseconds"
```

## Overview...
## Installation...
## Tests...

## License

MIT.
