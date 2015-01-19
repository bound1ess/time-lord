module.exports = function(grunt) {
    grunt.loadNpmTasks("grunt-simple-mocha");

    grunt.initConfig({
        simplemocha: {
            options: {
                ignoreLeaks: false,
                ui: "bdd",
                reporter: "spec",
            },
            all: {
                src: ["test/*.js"],
            },
        },
    });

    grunt.registerTask("default", ["test"]);

    grunt.registerTask("test", "Run Mocha tests.", function() {
        // OK for now.
        grunt.task.run("simplemocha");
    });
};
