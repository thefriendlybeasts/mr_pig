module.exports = function(grunt) {
  var path = require('path');

  // Load the config files.
  var mrPig = grunt.file.readYAML('mr_pig/settings.yaml');
  // These be the plugins we need for each option.
  mrPig.pkgs = grunt.file.readYAML('mr_pig/core/packages.yaml');

  if (grunt.file.exists('mr_pig/preferences.yaml')) {
    var mrPigPrefs = grunt.file.readYAML('mr_pig/preferences.yaml');
  } else {
    var mrPigPrefs = {};

    // Inform user that they can tweak some preferences.
    grunt.log.subhead('Mr. Pig');
    grunt.log.writeln('-------');
    grunt.log.writeln(
      'You can set personal preferences for things like which browser to use during development ' +
      'in `mr_pig/preferences.yaml`. See `mr_pig/preferences.sample.yaml`.'
    );
  }


  // Set default preferences.
  mrPig.browser   = 'Google Chrome Canary';
  mrPig.local.url = 'http://localhost:8080';


  // Set vars for use in tasks.
  mrPig.local.themePath = path.join(mrPig.local.root, '_themes', mrPig.theme);
  mrPig.dist.themePath  = path.join(mrPig.dist.root,  '_themes', mrPig.theme);


  // Overwrite defaults with user preferences.
  mrPig = mergeObjects(mrPig, mrPigPrefs);


  // Prepare PostCSS tasks if installed.
  if (grunt.file.exists('node_modules/grunt-postcss') &&
      grunt.file.exists('node_modules/autoprefixer')
  ) {
    mrPig.autoprefixer          = {};
    mrPig.autoprefixer.browsers = require('autoprefixer')(mrPig.pi.autoprefixer.browsers);
  }




  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'mr_pig/core/tasks'),
    overridePath: 'mr_pig/tasks',
    config: {
      m: mrPig
    }
  });
};




// ---




// HELPERS
/**
 * Recursively merge the properties of two objects into the first, then return the object.
 * @param {object} obj1 The first object.
 * @param {object} obj2 The second object.
 */
function mergeObjects(obj1, obj2) {
  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      obj1[p] = obj2[p].constructor == Object ? mergeObjects(obj1[p], obj2[p]) : obj2[p];

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }


  return obj1;
}
