// Karma configuration
// Generated on Mon Nov 05 2018 23:43:18 GMT+0000 (Greenwich Mean Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
      'node_modules/angular-ui-router/release/angular-ui-router.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      {
        pattern: 'app/**/*.ts'
      },
      {
        pattern: 'node_modules/angular-ui-bootstrap/dist/*'
      }

    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },

    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/
      },
      reports: {
        'html': 'artifacts/coverage',
        'lcovonly': {
          'directory': 'artifacts/coverage',
          'filename': 'lcovonly/lcov.info'
        },
        'text-summary': ''
      },
      tsconfig: './tsconfig.json',
      coverageOptions: {
        exclude: [/\.spec\.ts$/i],
        threshold: {
          global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
          }
        }
      }
    },

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["karma-typescript", 'spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
