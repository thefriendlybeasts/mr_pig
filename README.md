# v1
v1 isn't ready yet, but it's usable. If you wanna start using it now:

1. Copy `mr_pig/`, `node_modules/`, `Gruntfile.js`, and `package.json` over into your site folder.

   *By default, Mr. Pig expects this to be above root, and your root to be named `html/`. Update
   this in `mr_pig/settings.yaml`.*
2. Optionally copy `mr_pig.gitignore` over next to `Gruntfile.js` and rename it `.gitignore` or copy
   its contents into an existing `.gitignore`. (recommended)
3. Run `grunt init` and, for now, answer yes to all of the questions. These will actually be
   optional once v1 is ready.
4. Use it.
   - `grunt serve` runs the watch tasks.
   - `grunt build` prepares your site for the live environment.

---

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)][grunt]

Mr. Pig is a YAML-configurable [Grunt][grunt] setup for
[Statamic][statamic], complete with deployments. It aims to simplify using Grunt in your
Statamic projects to the point that you don't need to understand how Grunt works.

Not sure what to do? Check out [the docs][docs].




[docs]: mr_pig/DOCS.md
[grunt]: http://gruntjs.com/
[statamic]: http://statamic.com/
