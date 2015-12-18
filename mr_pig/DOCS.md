Mr. Pig is a YAML-configurable [Grunt][grunt] setup for [Statamic][statamic], complete with
deployments. It aims to simplify using Grunt in your Statamic projects to the point that you don't
need to understand how Grunt works.

*I do however recommend gaining a fuller understanding.*




# Features
- Live reload
- Minification and concatenation of JavaScript/CSS
- Image optimization
- CSS post-processing to removed unused CSS (Extremely helpful with frameworks like Bootstrap and
  Foundation) and add vendor prefixes
- Deployments via Git (requires shell access to your server **OR** DeployBot account)




# Benefits
- Develop and test faster
- Serve fewer and smaller files
- Hakuna matata




# Installation
Mr. Pig requires that you have Grunt installed, which requires that you have npm installed.
Dependencies! Don't worry, we can walk you through it. If you already have Grunt and npm installed,
skip ahead to [Installing Mr. Pig](#installing-mr-pig).

**Note: This may seem complicated, but after setting it up a time or two, you'll see it's really not
so hard.**

**You only have to install Grunt and npm the first time.**

If you have trouble with these instructions, get the instructions straight from the boar's mouth:

- [Installing npm][npm-installation]
- [Installing Grunt][grunt-getting-started]


## Installing npm
npm is the package manager (think Bower) for Node.js, so installing npm is really a by-product of
installing Node.js.

Just visit the [Node.js site][node] and click the wonderfully-lime “Install” button to
download an installer and run it.


## Installing Grunt
[Grunt recommends][grunt-getting-started] that you install the CLI globally and the task runner on a
per-project basis. You only have to install the CLI once and installing Mr. Pig takes care of the
task runner for you.

To install the Grunt CLI, run the following command in Terminal (or whatever crazy command shell you
might use).

```
npm install -g grunt-cli
```

If it doesn't work the first time, you probably need to use `sudo`, which means to `do` something as
a `s`uper`u`ser. If you need to install with `sudo`, it asks for your password. No characters pop
up on the screen when you type it in.

## Installing Mr. Pig
Download the latest version and drop the files in your project directory.

<aside>
In order to keep things organized, Mr. Pig is designed to be installed above-root by default.

```language-files
mr_pig/
html/
|-- _add-ons/
|-- _app
|-- _config
|-- …
Gruntfile.js
package.json
```

If you prefer a sty of directories, open `mr_pig/settings.yaml`, and change

```yaml
local:
  root: html
```

->

```yaml
local:
  root: ./
```
</aside>

Once everything you put everything in place, you can run `grunt init`, which asks you a series of
questions. Your answers custom-tailor Mr. Pig to your site.

```shell
cd ~/Sites/my-project
grunt init
```


## Gitignore
Make sure you ignore `mr_pig/preferences.yaml` and `node_modules`.

`preferences.yaml` contains developer-specific info so you shouldn't commit it to a repo that more
than one person works on.

You should never, ever, ever, ever, ever edit anything in `node_modules` and it's all installed by
simply running `grunt init`, so there's no reason to track it in your repo.




# Usage
## During development
In Terminal, navigate to your project folder and run `grunt serve`.

```shell
cd ~/Sites/my-project
grunt serve
```

This runs the default Grunt task which opens your site up in your preferred browser and reloads the
page/CSS when you make changes.

Because Mr. Pig uses [BrowserSync][browsersync], you can also open your site up on any device on the
same network. Just use the URL provided to you in Terminal after you run `grunt`
(http://10.10.10.108:3000 in this case).

```shell
Running "browserSync:dev" (browserSync) task
[BS] [info] Proxying: http://localhost:8080
[BS] Access URLs:
 -------------------------------------
       Local: http://localhost:3000
    External: http://10.10.10.123:3000
 -------------------------------------
          UI: http://localhost:3001
 UI External: http://10.10.10.123:3001
 -------------------------------------
[BS] Watching files...

Running "watch" task
Waiting...
```

The coolest thing about BrowserSync is that, by default, whatever you do on one device happens on
all other devices accessing the site. Visit the UI URL (http://localhost:3001, in this case) to
configure some other cool stuff. A few things of note are CSS Outlining, CSS Depth Outlining, and a
customizable Overlay CSS Grid, all under the **Remote Debug** tab.

## Building
When ready to push changes to a live server / test the built version of your site, just run
`grunt build` in your project folder.

```shell
cd ~/Sites/my-project
grunt build
```

This creates a new folder next to `html` that you can easily upload to your server or serve via
[Vagrant][vagrant] (check out our [Vagrant setup for Statamic][vagrant-statamic], MAMP, XAMP, or
whatever you use to run a local server.




# Configuration
## Browser and URL
By default, Mr. Pig opens your site in Google Chrome Canary and use the URL
http://localhost:8080 (access your site here if you use our
[Vagrant setup for Statamic][vagrant-statamic]). If you prefer another browser or URL, simply open
`mr_pig/preferences.yaml` and update the values to your liking.

Technically, you can override any option in `settings.yaml` in `preferences.yaml`, but you should
almost **never** do this (and we don't support it). For most sites, you want to share all options in
`settings.yaml` with everyone working on the site. `preferences.yaml`, on the other hand, contains
personal preferences that do not affect other developers.


## Deployments via DeployBot
To deploy via DeployBot, open each file in `mr_pig/core/scripts/deploybot` and check out the
comments at the top to learn how to use it.


## Everything else
Open `mr_pig/settings.yaml` and take a look at the settings. Find each setting documented in
comments alongside the setting itself.


## Files and paths
Grunt allows [globbing][grunt-globbing], to make specifying files and paths more practical. You can
find examples of this under `copy`.

```yaml
pi:
  copy:
    src:
      - assets/**/*.{jpg,jpeg,png,gif}
      - '!assets/img/resized/*.{jpg,jpeg,png,gif}'
      - {apple-touch-icon,favicon,mstile}*
```

- `*` matches any number of characters that aren't `/`.
- `**` works just like `*`, except recursively.
- `{}` matches anything contained inside separated by commas.
- `!` means not.

So `assets/**/*.{jpg,jpeg,png,gif}` grabs any `jpg`, `jpeg`, `png`, or `gif` anywhere in the
`assets` folder.

…but `!assets/img/resized/*.{jpg,jpeg,png,gif}` tells Grunt to ignore any of those files in the
`resized` folder, where Statamic saves
[transformed][statamic-transform] images.

`{apple-touch-icon,favicon,mstile}*` looks for any file in the root that begins with
`apple-touch-icon`, `favicon`, or `mstile`.




# Thanks
Sponsored in part by [LionsMouth Digital][lmd].




[browsersync]: http://www.browsersync.io/
[docs]: mr_pig/DOCS.md
[grunt]: http://gruntjs.com/
[grunt-getting-started]: http://gruntjs.com/getting-started
[grunt-globbing]: http://gruntjs.com/configuring-tasks#globbing-patterns
[lmd]: http://lionsmouthdigital.com
[node]: http://nodejs.org/
[npm-installation]: https://docs.npmjs.com/getting-started/installing-node
[statamic]: http://statamic.com/
[statamic-transform]: http://statamic.com/learn/documentation/tags/transform
[vagrant]: https://www.vagrantup.com/
[vagrant-statamic]: https://github.com/thefriendlybeasts/vagrant-statamic
