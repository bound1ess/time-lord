(function() {
    var root = this, timeLord = {};

    timeLord.parse = function(timestamp) {
        return {
            ms: 5,
        };
    };

    // Not ideal, but will do for now.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = timeLord;
    } else {
        root.timeLord = timeLord;
    }
})();
