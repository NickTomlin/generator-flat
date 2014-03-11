'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      dev: {
        files: {
          'dist/js/app.js': 'public/js/app.js'
        }
      },
      production: {
        files: {
          'dist/js/app.min.js': 'public/js/app.js'
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['connect', 'watch'],
        options: {
          logConcurrentOutput: true,
        }
      }
    },
    stylus: {
      dev: {
        options: {
          paths: ['stylus']
        },
        import: [
          'nib'
        ],
        files: {
          'dist/css/app.css': 'public/css/app.styl'
        }
      }
    },
    watch: {
      css: {
        files: ['public/css/**/*.styl', 'public/debug/*.styl'],
        tasks: ['stylus'],
        options: {
          interrupt: false,
          livereload: true
        }
      },
      // spec: {
      //   files: 'spec/**/*_spec.js',
      //   tasks: ['mochacli'],
      //   options: {
      //     interrupt: true
      //   }
      // },
      js: {
        files: [
          'public/js/**/*.js',
          '!public/js/vendor/**/*.js'
        ],
        tasks: ['browserify:dev'],
        options: {
          interrupt: false
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 3070,
          keepalive: true,
          base: ['dist', 'app'],
          livereload: true
        }
      }
    },
    copyto: {
      build: {
        files: [
          { cwd: 'public', src: ['**/*'], dest: 'dist/' },
        ],
        options: {
          ignore: [
            'public/css/**/*',
            'public/js/**/*',
            '!public/js/vendor/modernizr.js',
            'public/templates/**/*'
          ]
        }
      }
    },
    clean: {
      'tmp': 'tmp',
      'build': 'dist/templates',
      'all': ['dist/', 'tmp/']
    },
    availabletasks: {
      tasks: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('build', [
    'clean:all',
    'copyto',
    // 'i18n',
    'browserify:dev',
    'clean:tmp',
    'compass:production'
  ]);
  grunt.registerTask('test', ['jshint', 'mochacli']);

  grunt.registerTask('tasks', 'availabletasks');

  grunt.registerTask('run', [
    'clean:all',
    'browserify:dev',
    'stylus:dev',
    'clean:tmp',
    'copyto',
    'concurrent'
  ]);

  grunt.registerTask('default', 'run');
};

