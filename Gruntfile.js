module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.initConfig({
        jshint: {
            options: {
                '-W030': true
            },
            jshintrc: "./.jshintrc",
            files: {
                src: ['src/**/*.js', 'Gruntfile.js', 'test/**/*.js']
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                },
                src: ['test/*.js']
            }
        },
        watch:{
            all:{
                files:['src/**/*.js', 'test/**/*.js'],
                tasks:['test']
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'mochaTest:test']);

};
