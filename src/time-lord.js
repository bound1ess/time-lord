(function() {
    var root = this, timeLord = {};

    timeLord.map = function(result, keys) {
        var newResult = {};

        for (var oldKey in keys) {
            newResult[keys[oldKey]] = result[oldKey];
        }

        return newResult;
    };

    timeLord.parse = function(timestamp) {
        // Strip all whitespaces.
        timestamp = timestamp.replace(/\s/g, "");

        return {
            ms:     timeLord.$parse(timestamp, "ms"),
            secs:   timeLord.$parse(timestamp, "s"),
            mins:   timeLord.$parse(timestamp, "m"),
            hours:  timeLord.$parse(timestamp, "h"),
            days:   timeLord.$parse(timestamp, "d"),
            months: timeLord.$parse(timestamp, "mo"),
            years:  timeLord.$parse(timestamp, "y"),
        };
    };

    // Prefix internals in Angular-like style.
    timeLord.$parse = function(cleanTimestamp, unit) {
        var regex = new RegExp("[\.0-9]+" + unit);

        var match = cleanTimestamp.match(regex);

        if (match !== null) {
            match = match[0].replace(unit, "");

            return match.indexOf(".") !== -1 ? parseFloat(match) : parseInt(match);
        }

        return null;
    };

    // Not ideal, but will do for now.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = timeLord;
    } else {
        root.timeLord = timeLord;
    }
})();
