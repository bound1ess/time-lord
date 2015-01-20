var expect = require("chai").expect, timeLord = require("../src/time-lord");

describe("timeLord", function() {
    it("should parse milliseconds", function() {
        expect(timeLord.parse("0ms").ms).to.equal(0);
        expect(timeLord.parse("ms").ms).to.equal(null);

        expect(timeLord.parse(" 5ms").ms).to.equal(5);
        expect(timeLord.parse("10ms ").ms).to.equal(10);

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

    it("should make the result human readable", function() {
        var result = timeLord.forHumans("");
        expect(result).to.equal("");

        result = timeLord.forHumans("1d");
        expect(result).to.equal("1 day");

        result = timeLord.forHumans("2d 8.5h");
        expect(result).to.equal("2 days and 8.5 hours");

        result = timeLord.forHumans("1d 12h 1m 50s");
        expect(result).to.equal("1 day, 12 hours, 1 minute and 50 seconds");
    });

    it("should convert values to seconds", function() {
        expect(timeLord.toSeconds(1, "ms")).to.equal(0.001);
        expect(timeLord.toSeconds(1, "s")).to.equal(1);
        expect(timeLord.toSeconds(1, "m")).to.equal(60);
        expect(timeLord.toSeconds(1, "h")).to.equal(3600);
        expect(timeLord.toSeconds(1, "d")).to.equal(86400);
        expect(timeLord.toSeconds(1, "mo")).to.equal(null);
        expect(timeLord.toSeconds(1, "y")).to.equal(null);

        expect(timeLord.toSeconds("1d 1h 1m 1s")).to.equal(86400 + 3600 + 60 + 1);
    });
});
