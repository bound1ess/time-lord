(function() {
    var root = this, timeLord = {};

    timeLord.$words = {
        ms: ["millisecond", "milliseconds"],
        secs: ["second", "seconds"],
        mins: ["minute", "minutes"],
        hours: ["hour", "hours"],
        days: ["day", "days"],
        months: ["month", "months"],
        years: ["year", "years"],
    };

    timeLord.forHumans = function(result) {
        var message = "", tmp = [], filtered = {}, length = 0;

        for (var key in result) {
            if (result[key] !== null) {
                tmp.push([key, result[key]]);
            }
        }

        tmp.reverse().forEach(function(row) {
            filtered[row[0]] = row[1];
        });

        delete tmp;

        // JavaScript makes me cry sometimes.
        length = Object.keys(filtered).length;

        if (length == 0) {
            return message;
        }

        if (length === 1) {
            var row = timeLord.$accessResultRow(filtered, 0);

            return row[1] + " " + timeLord.$getProperForm(row[0], row[1]);
        }

        if (length === 2) {
            var first = timeLord.$accessResultRow(filtered, 0),
                second = timeLord.$accessResultRow(filtered, 1);

            return first[1]
                + " "
                + timeLord.$getProperForm(first[0], first[1])
                + " and "
                + second[1]
                + " "
                + timeLord.$getProperForm(second[0], second[1]);
        }
    };

    timeLord.$getProperForm = function(key, length) {
        return length > 1 ? timeLord.$words[key][1] : timeLord.$words[key][0];
    };

    // ...and again.
    timeLord.$accessResultRow = function(result, index) {
        var internalIndex = 0, key;

        for (key in result) {
            if (internalIndex === index) {
                return [key, result[key]];
            }

            internalIndex++;
        }
    };

    timeLord.map = function(result, keys) {
        var newResult = {};

        for (var oldKey in keys) {
            newResult[keys[oldKey]] = result[oldKey];
        }

        return newResult;
    };

    timeLord.parse = function(timestamp) {
        // Strip all whitespaces.
        timestamp = timestamp.replace(/\s/g, "\n");

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
        var regex = new RegExp("([\.0-9]+" + unit + ")$", "m");

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
