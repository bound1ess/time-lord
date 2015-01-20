var expect = require("chai").expect, timeLord = require("../src/time-lord");

describe("timeLord", function() {
    it("should parse milliseconds", function() {
        expect(timeLord.parse("0ms").ms).to.equal(0);
        expect(timeLord.parse("ms").ms).to.equal(null);

        expect(timeLord.parse(" 5ms").ms).to.equal(5);
        expect(timeLord.parse("10 ms").ms).to.equal(10);

        expect(timeLord.parse("7.5ms").ms).to.equal(7.5);
        expect(timeLord.parse(".5ms").ms).to.equal(0.5);
    });

    it("should also parse seconds, minutes, hours, days, months and years", function() {
        var result = timeLord.parse("1s 1.5m 2h 2.5d 3mo 3.5y");

        expect(result.secs).to.equal(1);
        expect(result.mins).to.equal(1.5);
        expect(result.hours).to.equal(2);
        expect(result.days).to.equal(2.5);
        expect(result.months).to.equal(3);
        expect(result.years).to.equal(3.5);
    });

    it("should change keys", function() {
        var result = timeLord.map(timeLord.parse("1ms 2s 3m"), {
            ms: "milliseconds",
            secs: "seconds",
            mins: "minutes",
        });

        expect(result.milliseconds).to.equal(1);
        expect(result.seconds).to.equal(2);
        expect(result.minutes).to.equal(3);
    });
});
