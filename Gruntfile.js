module.exports = function(grunt) {
  var path = require('path');

  // Load the config files.
  var mrPig = grunt.file.readYAML('mr_pig/settings.yaml');

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


  // Prepare PostCSS tasks.
  mrPig.autoprefixer          = {};
  mrPig.autoprefixer.browsers = require('autoprefixer')(mrPig.pi.autoprefixer.browsers);


  require('load-grunt-config')(grunt, {
    configPath: [
      'mr_pig/tasks',
      'mr_pig/tasks/core',
      'mr_pig/tasks/optional',
      'mr_pig/tasks/third-party'
    ],
    config: {
      m: mrPig
    }
  });
};




// ---




// HELPERS
/**
 * Prepend each value in an array with a string, then return the array.
 * @param {str} str The string to prepend.
 * @param {arr} arr The array whose values need appendin'.
 */
function prependArray(str, arr) {
  for (var i in arr) {
    arr[i] = str + arr[i];
  }

  return arr;
}


/**
 * Push a value to an array, then return the array.
 * @param {arr} arr The array to push to.
 * @param {val} val The value to push to the array.
 */
function pushReturn(arr, val) {
  arr.push(val);

  return arr;
}


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
