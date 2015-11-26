module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        clean: {
            js: ["src/angular-or-filter.min.js", "src/angular-or-filter.min.js.map"]
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    preserveComments: 'some'
                },
                files: {
                    'src/angular-or-filter.min.js': ['src/angular-or-filter.js']
                }
            }
        }
    });

    grunt.registerTask('build', 'uglify');

    grunt.registerTask('cleanPath', 'clean');

    grunt.registerTask('compile', [
        'clean',
        'uglify'
    ]);
};
