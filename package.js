Package.describe({
  name: 'bucky:meteortable',
  version: '0.0.13',
  // Brief, one-line summary of the package.
  summary: 'use meteor call for table display and export csv',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/bgbhavesh/meteortable.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
    api.versionsFrom('1.5.2');
    api.use('ecmascript');
    api.use([
        'check',
        'ecmascript',
        'underscore',
        'mongo',
        'blaze@2.3.2',
        'templating@1.3.2',
        'reactive-var',
        'tracker',
        'session',
        'templating',
        'fortawesome:fontawesome@4.7.0',
        'reactive-dict',
        'sacha:spin@2.3.1'
    ]);
    api.use(['jquery'], 'client', {weak: true});
    api.addFiles('client/css/style.css', 'client');
    api.addFiles('lib/_common.js');
    api.addFiles('server/methods.js', 'server');
	api.addFiles('client/meteortable.js', 'client');
	api.addFiles('client/meteortable.html', 'client');
});
Npm.depends({
    "object-path":"0.11.4"
});
Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('bucky:meteortable');
  api.mainModule('meteortable-tests.js');
});
