module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-simple-mocha");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.initConfig({
        simplemocha: {
            options: {
                ignoreLeaks: false,
                ui: "bdd",
                reporter: "spec",
            },
            timeLord: {
                src: ["test/*.js"],
            },
        },
        uglify: {
            options: {
                mangle: false,
                sourceMap: false,
                compress: false,
            },
            timeLord: {
                files: {
                    "dist/time-lord.min.js": ["src/time-lord.js"],
                },
            },
        },
    });

    grunt.registerTask("default", ["test"]);

    grunt.registerTask("test", "Run Mocha tests.", ["simplemocha"]);

    grunt.registerTask("minify-js", "Minify JS files using Uglify.", ["uglify"]);
};
