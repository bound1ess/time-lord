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
});
