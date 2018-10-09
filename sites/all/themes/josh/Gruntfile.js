/**
 * Gruntfile for fca Theme.
 * This Gruntfile contains all the task definitions related to the build of the thehm,
 * e.g. SCSS compilation, linting, etc
 * Mostly for reference
 * TODO: Add a README.md to this folder with setup instructions
 */
"use strict();";

module.exports = function(grunt) {

  var browsers = ['last 2 versions', 'ie 9'];


  var gruntConfig = {
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    
    paths : {
      scss: 'sass',
      css : 'css'
    },

    //SASS subtask
    sass: {
      // Development target
      development : {
       // Any dev-specific options are declared here (e.g. sourceMaps)
        options: {
          sourceMap       : true,                   // The default source map - generate with relative URIs
          sourceComments  : false,
          trace           : true,                   // Generate a full traceback on error
          style           : 'expanded',             // Show compiled neatly and readable - best for debugging
          compass         : false,                  // Current false, but may be used if we import the Platon core CSS
          cacheLocation   : '/tmp/vb-sasscache',  // Stores the SASS cache files in /tmp/, to keep the repo cle
          // debugInfo    : true,                // Extra info that can be used by the FireSass plugin
          lineNumbers     : true                    // Show source line numbers in compiled output
        },
        // The files to compile. This is in the format DESTINATION.CSS:SOURCE.SCSS
        files: {
          '<%= paths.css %>/style.css' : '<%= paths.scss %>/style.scss',
        }
      },
      // Production target
      production : {
        // Any production-specific options are declared here
        options: {
          sourcemaps   : 'none',         // The default source map - diasabled in production
          style        : 'compressed',   // Minify and strip comments from compiled source
          compass      : false           // Current false, but may be used if we import the Platon core CSS
        },
      }
    },

   // postCSS subtask
    postcss: {
      options: {
        map: true,       // Generate a sourcemap
        remove: false,
        processors: [
          require('pixrem')(),
          require('autoprefixer')({ browsers : browsers })   // autoprefixer
        ]
      },
      dev: {
        // The files to compile. This is in the format DESTINATION.CSS:SOURCE.SCSS
        files: {
          '<%= paths.css %>/style.css' : '<%= paths.css %>/style.css'
        }
      }
    },


    // Grunt Watch subtask - use this to run subtasks when file(s) change
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      sass: {
        files : ['sass/**/*.scss'],
        tasks : ['dev']
      }
    },
  };

  grunt.initConfig(gruntConfig);


  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Set up tasks to run the subtasks declared in gruntConfig
  grunt.registerTask('dev', ['sass:development', 'postcss']);
  grunt.registerTask('production', ['sass:production']);
  grunt.registerTask('compile', ['production']);

  grunt.registerTask('default', ['dev', 'watch', 'jshint']);


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

};