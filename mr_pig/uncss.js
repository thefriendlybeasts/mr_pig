'use strict';

var uncss = require('uncss');
var fs    = require('fs');
var yaml  = require('js-yaml');


var file = module.exports = {
  /**
   * Read a file synchronously.
   * @param  {string} path The path to the file.
   * @return {buffer}      The data in the file.
   */
  read: function(path) {
    return fs.readFileSync(path);
  },

  /**
   * Write to a file synchronously.
   * @param  {string} path Path to the file.
   * @param  {object} data The data to go in the file.
   */
  write: function(path, data) {
    fs.writeFileSync(path, JSON.stringify(data));
  },

  /**
   * Delete a file synchronously.
   * @param  {string} path The path to the file.
   */
  unlink: function(path) {
    fs.unlinkSync(path);
  }
}





// Convert YAML file to JSON file.
var config      = file.read('mr_pig.yaml');
var mrpig       = yaml.load(config);
var uncssrcData = mrpig.uncss.uncssrc;
var tempConfig  = 'mr_pig/uncssrc.temp.json';

file.write(tempConfig, uncssrcData);

// Set up config.
var config      = {};
config.filename = process.argv[2];
config.files    = process.argv[3].split(',');
config.dest     = mrpig.dist + '/_themes/' + mrpig.theme + '/css/';


// Run UnCSS and write to the file.
writeCSS(config);
// Delete the temporary JSON file.
file.unlink(tempConfig);





/**
* Write the css output by UnCSS.
* @param {object} config The config to use.
*/
function writeCSS(config) {
  config.options = { uncssrc: tempConfig };

  uncss(config.files, config.options, function(error, output) {
    // If UnCSS threw an error, show it.
    if (error) {
      console.error(
        'UnCSS: ' + error + '\n' + config.filename + ' not UnCSSed.'
      );

    } else {
      // If there was no error, write the UnCSSed styles to the set file.
      fs.writeFile(
        config.dest + config.filename,
        output,
        function(error) {
          if (error) {
            // If there was an error, show it.
            console.error(error + '\n' + config.filename + ' not UnCSSed.');

          } else{
            // If there was no error, announce it.
            console.log(
              'Success! High-five! \n' +
              'UnCSSed ' +
              config.filename +
              '!!!!1 \n'
            );
          }
        }
      );
    }
  });
}
