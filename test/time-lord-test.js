var expect = require("chai").expect, timeLord = require("../src/time-lord");

describe("timeLord", function() {
    it("should parse milliseconds", function() {
        expect(timeLord.parse("5ms").ms).to.equal(5);
    });
});
