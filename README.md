# Project Kickstart Assemble

This is how I start Assemble-Projects as a Frontend-Developer.


## My Project-Setup

- [__Grunt__](http://gruntjs.com/) – js task runner
- [__Assemble__](http://assemble.io/) – static site generator
- [__SASS__](http://sass-lang.com/) / [__Compass__](http://compass-style.org/) – css preprocessing
- [__Livereload__](http://livereload.com/) – browser auto refresh
- [__KSS__](http://warpspire.com/kss/) – living styleguide

Grunt depends on [node.js](http://nodejs.org), Sass depends on [Ruby](http://www.ruby-lang.org). Some of the [Grunt plugins](#grunt-plugins-used) depend on command line tools to be installed on your (build) system.


## Requirements

These are the minimum requirements for my project setup:  
 
- [__Node.js & Node Package Manager__](http://nodejs.org)
- [__Grunt Command Line Interface__](http://gruntjs.com/getting-started) – `sudo npm install -g grunt-cli`
- [__SASS 3.3__](http://rubygems.org/gems/sass/versions/) (atm in RC-state) – `sudo gem install sass --pre`
- [__SASS Globbing 1.1__](http://rubygems.org/gems/sass-globbing/versions) – `sudo gem install sass-globbing`
- [__Compass 1__](http://rubygems.org/gems/compass/versions) (atm in ALPHA-state) – `sudo gem install compass --pre`

It's mandatory to use the latest versions of SASS and Compass if you want to work with [__CSS Source Maps__](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors) in Google Chrome.  
If you want to use the browser-auto-refresh-feature, get [__LiveReload.js__](https://github.com/livereload/livereload-js) and install it to the root-folder of localhost.


## Getting started

Open your preferred command line tool and choose your project directory.  

Either use `./setup-dev-env.sh`. This will start a shell script to check requirements, then runs `npm install` automatically to install Grunt and [Grunt plugins](#grunt-plugins-used) required for the build script.  

Or use `npm install` if your are on Windows (you have to check the requirements manually). This will install Grunt and [Grunt plugins](#grunt-plugins-used) required for the build script.

1. `grunt` or `grunt build` – start build script
2. [http://localhost:9002/](http://localhost:9002/) or [http://0.0.0.0:9002/](http://0.0.0.0:9002/) – watch your build-directory in the browser (livereload is running on port 9002)
3. `grunt dist` – start distribution build script


## Grunt-Plugins used

- [assemble](https://github.com/assemble/assemble)
- [connect-livereload](https://github.com/intesso/connect-livereload)
- [grunt-autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
- [grunt-combine-media-queries](https://github.com/buildingblocks/grunt-combine-media-queries)
- [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean)
- [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)
- [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)
- [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy)
- [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin)
- [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
- [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)
- [grunt-htmlhint](https://github.com/yaniswang/grunt-htmlhint)
- [grunt-newer](https://github.com/tschaub/grunt-newer)
- [grunt-packager](https://github.com/bobbor/grunt-packager)
- [grunt-phantomas](https://github.com/stefanjudis/grunt-phantomas)
- [grunt-photobox](https://github.com/stefanjudis/grunt-photobox)
- [grunt-string-replace](https://github.com/erickrdch/grunt-string-replace)
- [grunt-styleguide](https://github.com/indieisaconcept/grunt-styleguide)
- [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin)
- [grunt-sync](https://github.com/tomusdrw/grunt-sync)
- [grunticon](https://github.com/filamentgroup/grunticon)


## CSS Rules

I'm using some variation of BEM+SMACSS+optionatedexperienceofcssdevelopmentyears:

My site exists of basic **blocks**. Blocks are independent parts of the site (e.g. menu, metanav, login form, sidebar, user detail page). Like explained at [yandex's BEM](http://img-fotki.yandex.ru/get/5008/221798411.0/0_babce_7deef28f_XXL.png).
The blocks may contain other blocks.

The smallest entities of a block are called **elements**. For instance the block 'menu' contains multiple items, a login block may contain a username element, password element and a submit button element. Like explained at [yandex's BEM](http://img-fotki.yandex.ru/get/6726/221798411.0/0_babd1_f14000fa_XL.png).

Blocks and elements may be modified with **modifiers**. For instance the selected menu item is a modified version of the menu item.

- Blocks
  - are prefixed with _b-_
  - __good:__ b-menu, b-sidebar, b-sitemap, b-user
  - __bad:__ menu, sidebar, sitemap, user
- Elements
  - have _no prefix_ and can only be defined in block scope
  - are not prefixed with their block (choose a longer name if it's not expressive enough)
  - __good:__ item, title, user-avatar (instead of user or avatar)
  - __bad:__ user-user-avatar, menu-item-a
- Modifier
  - are prefixed with _is-_, and have to be defined in block or element scope
  - __good:__ is-selected, is-active, is-approved
  - __bad:__ selected, active, approved


### Example

File `_menu.scss` in `source/sass/blocks` directory.

```
SCSS

.b-menu { /* block: 'b-menu' */
	&.is-static { /* modifier: 'is-static' for b-menu  */
	}
	
	.item { /* element: 'item' in b-menu */
		a { /* element: 'item a' in b-menu */
		}
	}
}
```


### Separating page layout blocks from real blocks

Because you want to know if the block is for page layout or for a single component.

Proposal:

* b-page,
* b-page-header,
* b-page-nav,
* b-page-main,
* b-page-aside,
* b-page-footer


### Coding Style

(This list is not intended to be exhaustive.)

- Use lowercase for class names, selectors and HTML elements.
- Be consistant with indentation – I'm using tabs instead of spaces.
- Be consistent in declaration order, cluster related properties (Positioning, Box-Model, Text & Color). I'm no fan of an alphabetical order.
- Be consistant with quotes – I'm using double quotes ```""```.
- Quote attribute values in selectors, e.g. ```input[type="checkbox"]```.
- One selector per line, one rule per line.
- Put spaces after ```:``` in property declarations.
- Put spaces before ```{``` in rule declarations.
- Put a ```;``` at the end of the last declaration in a declaration block.
- Include a space after each comma in comma-separated property or function values, e.g. ```rgba(0, 0, 0, 0)```.
- Separate each ruleset by a blank line.
- Document styles with [KSS](https://github.com/kneath/kss).


### CSS Coding Guidelines

(This list is not intended to be exhaustive.)

- Avoid element selectors.
  - __bad:__ .foo div, .foo span, .foo ul
  - ___good:___ .foo .section, .foo .title, .foo .linklist
- Avoid IDs where possible (exeption: e.g. in forms -> for-attribute).
  - __bad:__ #sidebar
  - __good:__ .sidebar
- Avoid qualifying class names with type selectors.
  - __bad:__ ul.linklist, div.example, a.back 
  - __good:__ .linklist, .example, .back
- Avoid the descendant selector. Target directly if possible.
  - __bad:__ .foo .bar .baz
  - __good:__ .baz-header
- Use shorthand properties where possible.
  - __bad:__ padding-top: 0; padding-right: 1em; padding-bottom: 2em; padding-left: 1em;
  - __good:__ padding: 0 1em 2em;
- Omit unit specification after “0” values.
  - __bad:__ margin: 0px;
  - __good:__ margin: 0;
- Use hexadecimal color codes #000 unless using rgba.
  - __bad:__ color: orange;
  - __good:__ color: #ffa500;
- Use 3 character hexadecimal notation where possible.
  - __bad:__ color: #ff0099;
  - __good:__ color: #f09;
- Use number keywords (100–900) for font-weight.
  - __bad:__ font-weight: normal;
  - __good:__ font-weight: 400;
- Separate words in class names by a hyphen.
  - __bad:__ .user_avatar, .userAvatar, .useravatar
  - __good:__ .user-avatar
- Dont't use !important, it's ok to use it on helper classes though.
- Dont't use conditional stylesheets, use the html-class (e.g. .lt-ie9) instead to style directly in your block.


### SASS Coding Guidelines

(This list is not intended to be exhaustive.)

I'm using SCSS-syntax because it's valid CSS and more expressive in my eyes.

__List @extend first__

```
.b-foo {
	@extend %module; 
	…
}
```

__List regular styles next__

```
.b-foo {
	@extend %module; 
	margin: 0 auto;
	…
}
```

__List @include depending on the property you are referencing__

```
.b-foo {
	@extend %module; 
	margin: 0 auto;
	@include rem(padding, 10px);
	color: #000;
}
```

__List nested selectors last__

```
.b-foo {
	@extend %module;
	margin: 0 auto;
	@include rem(padding, 10px);
	color: #000;
	
	> .bar {
		padding: 0 10px 5px;
	}
}
```

__Maximum Nesting: three levels deep__

```
.b-foo {
	.bar {
		.baz {
			// no more!
		}
	}
}
```


## Questions?

If you're asking yourself »Why not …?« have a look at my WHYNOT.md file. There I might answer some common questions. :)


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)


## TODO

- extra step for build folder, to add all new files to svn and remove all removed files from svn (without svn rm)
- what about JS: how do we include it? bower?
- give _dist_ some love
- give styleguide-template some default styling
- add example btn-class with extends
- extend css/sass coding guidelines
