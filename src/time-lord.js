(function() {
    var root = this, timeLord = {};

    timeLord.toSeconds = function(value, unit) {
        if (typeof value === "string") {
            var sum = 0, result = timeLord.map(timeLord.parse(value), {
                secs:   "s",
                mins:   "m",
                hours:  "h",
                days:   "d",
                months: "mo",
                years:  "y",
            });

            for (var key in result) {
                if (result[key] !== null) {
                    sum += timeLord.toSeconds(result[key], key);
                }
            }

            return sum;
        }

        switch (unit) {
            case "ms": return value / 1000;
            case "s":  return value;
            case "m":  return value * 60;
            case "h":  return value * 3600;
            case "d":  return value * 86400;
            case "mo": return null; // This value can be incorrect.
            case "y":  return null; // Same.
        }
    };

    timeLord.$words = {
        ms:     ["millisecond", "milliseconds"],
        secs:   ["second", "seconds"],
        mins:   ["minute", "minutes"],
        hours:  ["hour", "hours"],
        days:   ["day", "days"],
        months: ["month", "months"],
        years:  ["year", "years"],
    };

    timeLord.forHumans = function(result) {
        if (typeof result === "string") {
            return timeLord.forHumans(timeLord.parse(result));
        }

        var tmp = [], filtered = {}, length = 0;

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
            return "";
        }

        if (length === 1) {
            var row = Object.keys(filtered);
            row = [row[0], filtered[row[0]]];

            return row[1] + " " + timeLord.$getProperForm(row[0], row[1]);
        }

        // Okay.
        var last = Object.keys(filtered);
        last = [last[last.length - 1], filtered[last[last.length - 1]]];

        var messages = [], counter = 0;

        for (key in filtered) {
            // This way the last element won't be used.
            if (counter == length - 1) {
                break;
            }

            messages.push(filtered[key] + " " + timeLord.$getProperForm(key, filtered[key]));

            counter++;
        }

        return messages.join(", ")
             + " and "
             + last[1] 
             + " " 
             + timeLord.$getProperForm(last[0], last[1]);
    };

    timeLord.$getProperForm = function(key, length) {
        return length > 1 ? timeLord.$words[key][1] : timeLord.$words[key][0];
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
