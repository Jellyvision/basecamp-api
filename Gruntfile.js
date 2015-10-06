module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        coffee:{
            dev:{
                files:{
                    'src/*.js':'src/coffee/*.coffee',
                }
            },
            test:{
                files:{
                    'test/test.*.js':'test/test.*.coffee'
                }
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
                files:['src/**/*.js', 'test/*.js'],
                tasks:['test']
            }
        }
    });

    grunt.registerTask('test', 'mochaTest:test');

};
