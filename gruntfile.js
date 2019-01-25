/**
 * Created by Sreeni
 */
module.exports = function(grunt){
    grunt.initConfig({
        jshint:{
            all: ["./public/app/**/*.js"],
            options: {
                unused: true
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerInitTask("default", ["jshint"]);
}