module.exports = function(grunt, options) {
  return {
    init: {
      options: {
        // The `config`s in these `questions` must match up to a key in `mr_pig/core/packages.yaml`
        // within the `prompt.pkgs` namespace..
        questions: [
          {
            config: 'prompt.pkgs.sass',
            type: 'confirm',
            message: 'Do you use 🐍 Sass?',
            default: true
          },
          {
            config: 'prompt.pkgs.autoprefixer',
            type: 'confirm',
            message: 'How about Autoprefixer?',
            default: true
          },
          {
            config: 'prompt.pkgs.watch',
            type: 'confirm',
            message: 'Browsersync? (live reload, synced actions across devices, etc.)',
            default: true
          },
          {
            config: 'prompt.pkgs.usemin',
            type: 'confirm',
            message: 'Concat, minify, and uglify before serving code? (see usemin in settings.yaml)',
            default: true
          }
        ],


        then: function(results, done) {
          var installList = options.m.pkgs.default.join(' ') + ' ';
          for (var group in grunt.config('prompt.pkgs')) {
            // Append packages to the install list if the dev chose this group.
            installList += grunt.config('prompt.pkgs')[group] ? options.m.pkgs[group].join(' ') + ' ' : '';
          }

          grunt.config.set('shell.npm_install.command', 'npm install ' + installList + ' -SE');
        }
      }
    }
  }
}
