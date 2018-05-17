module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);


  grunt.initConfig({
    postcss: {
      style: {
        options: {
          processors: [
            require('autoprefixer')({
              browsers: [
                'last 1 version',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Opera versions',
                'last 2 Edge versions'
              ]
            }),
            require('css-mqpacker')({
              sort: true
            })
          ]
        },
        src: 'css/style.css'
      }
    },
    csso: {
      style: {
        options: {
          report: 'gzip'
        },
        files: {
          'css/style.min.css': ['css/style.css'],
          'css/normalize.min.css': ['css/normalize.css']
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      main: [
        'js/script.js'
      ]
    },
    uglify: {
      my_target: {
        files: {
          'js/script.min.js': ['js/script.js']
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['img/**/*.{png,jpg,gif}']
        }]
      }
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ['*.html', 'css/*.css']
        },
        options: {
          server: '.',
          watchTask: true
        }
      }
    },
    watch: {
      html: {
        files: ['*.html']
      },
      style: {
        files: ["css/*.css"],
        tasks: ["postcss", "csso"]
      },
      img: {
        files: ['img/**'],
        tasks: ['imagemin']
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['jshint', 'uglify'],
        options: {
          interrupt: true,
        }
      },
      configFiles: {
        files: ['Gruntfile.js'],
        options: {
          reload: true
        }
      }
    }
  });

  grunt.registerTask('serve', ['browserSync', 'watch']);
  grunt.registerTask('build', [
    'postcss',
    'csso',
    'jshint',
    'uglify',
    'imagemin'
  ]);
};
