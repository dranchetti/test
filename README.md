# Golin Digital - Starter Pack
A frontend starter pack for projects at Golin.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- IE Edge (IE 12+)
- Internet Explorer 9+
- Safari (latest)

## Structure
### CSS
The CSS structure is based upon the [7-1 Pattern](http://sass-guidelin.es/#the-7-1-pattern) as provided by Sass Guidelines. If you don't like it, you're free to change it. It is only a suggestion, but works most of the time for projects. The screen.scss file imports all of these  files, which follow a specific order so our styles aren't overwritten.

```
/assets
    /scss
        /animations - Includes stock Animate.css animations as mixins
        /base - Includes all boilerplate code. Global styles, such as setting a body background colour, should go in here. This is also true for typography, which has its own stylesheet in here.
        /components - Includes all component styles. Button styles, media blocks, carousels, thumbnail, etc. styles should go in here.
        /layout - Includes all styles that create a layout for the page. Header, footer, sidebar, forms, navigation, etc. styles should go in here.
        /pages - Includes all page specific styles.
        /utils - Includes all Sass tools, helpers, etcetera. This should include every global variable, function, mixin and placeholder.
        /vendors - Includes all vendor files - if you didn't write it, it goes here.
    screen.scss - Compiles a separate stylesheet for screen
```

#### Using Animations
Animations are taken from Animate.css and rewritten as CSS mixins, meaning they will only be compiled if they are used. Use the animations as a mixin and all appropriate keyframes will be compiled alongside typical setting of animations on the CSS elements.

For example, to use the "lightspeed out" animation, do this:
```css
.element {
    @include lightspeedout();
}
```
which will subsequently output:
```css
.element {
  -webkit-animation-fill-mode: both;
          animation-fill-mode: both;
  -webkit-animation-name: lightspeedout;
          animation-name: lightspeedout;
  -webkit-animation-timing-function: ease-out;
          animation-timing-function: ease-out; }

@-webkit-keyframes lightspeedout {
  from {
    opacity: 1; }
  to {
    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
            transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0; } }

@keyframes lightspeedout {
  from {
    opacity: 1; }
  to {
    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);
            transform: translate3d(100%, 0, 0) skewX(30deg);
    opacity: 0; } }
```

**Please note:** @keyframe definitions are only output once. If used twice, the last declaration takes priority. Please bear this in mind if you create another keyframe by the same name and then use a mixin called the same.
**Please note:** You will have to specify animation duration each time you use a mixin. Recommended is either 1s or 0.75s. However, hinge is already set at 2s as it's a special case.

#### Print Specific Styles
Please create another file, in the same folder as the original file, and suffix the filename with `.print.scss`. These specific stylesheets should be imported in the screen.scss, inside the `@media print` block.

### JavaScript
The JavaScript structure depends on what your framework of choice is. If you are using AngularJS, please follow [John Papa's](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) styleguide. If you're using anything else (including jQuery), please follow the [ESLint Code Conventions](http://eslint.org/docs/developer-guide/code-conventions). The linter is configured for the ESLint Code Conventions using their recommended rules. We do, however, indent JS files with 2 (instead of 4) spaces.

Please also make an effort to write docblocks. We have implemented them on all backend projects, and on some frontend projects. It makes it so much easier for someone to jump onto the project and understand it if they've never worked on it before.

#### JavaScript Vendor Files
To concat and uglify your vendor files, please use `npm` to install them. For example: `npm install angularjs --save` (not --save-dev). When it has installed, create a variable at the top of the Makefile pointing to its location, e.g. `VENDOR_ANGULAR:./node_modules/angular/angular.js`, and place the reference in the `js_vendor` task on the line that starts with `@$(UGLIFY_JS)`. It already includes (to my disgust!) jQuery.

### Images
I've recently got into the habit of splitting images into folders based on type - svgs in one, pngs in another. You're welcome to do whatever you want here (although you may have to change some tasks...)!

## Usage
To install everything you need to start working with Starterpack, run `make init`. Then to:
- Build everything: `make build` / `make build_prod`
- Build CSS: `make css`
- Build JS: `make js`
- Build Images: `make images`
- Watch CSS/JS: `make watch`

### Using the Production flag
The production flag ("make build_prod") strips some tasks for being run on servers, such as linting JS, which are only ever installed as dev dependencies anyway.

### A note about Images
PNGs, JPGs, etcetera, are just copied across. SVGs are minified and then added to a single file (sprite.css.svg). To "inject" these into a partial (best way to do it), which is then included in another file, add this to your `images` task:
```
@cat $(BASEPATH_DEST_IMG)/**/sprite.css.svg > $(SVG_DEFS_FILE)
```
You will need to create a variable at the top of the Makefile - simply: `SVG_DEFS_FILE=./path/to/svg/defs/file.php`.

## What does each task do?
### Build CSS
The CSS task will do the following:
- Compile your Sass into a CSS file
- Autoprefix properties to support browsers listed above
- Convert typography declarations (line-height, font-size, letter-spacing) to use rem sizing, meaning you no longer have to use a mixin
- Minify CSS using CSSNano
- Automatically generates extra flexbox rules to stop IE being a bitch about it
- Generate sourcemaps for your CSS files, removing the need to generate both a minified and unminified version

This task will output a `screen.css`.

### Build JS
The JS task will do the following:
- Lint JS
- Concat all JS into a single file
- Minify JS using UglifyJS2
- Generate sourcemaps for your JS file, removing the need to generate both a minified and unminified version
- Output into public folder

### Build Images
The image task will do the following:
- Compress SVGs
- Generate an SVG sprite
- Output into public folder

### Watch
The `watch` task will do the following:
- Watch CSS and JS run each build task on change.

## Cachebusting
A major issue with clients is having them to forcibly clear cache. For non-tech savvy clients, this can prove a problem. Therefore, I have built two NPM modules that will automatically append a hash to a filename based on contents, and then inject the reference into `index.php`.

**Please note: this does not currently work on older servers due to limitations (i.e. we run an old Node version, and how it's done is not supporting in Node 0.10). The task is currently removed from the Makefile. If you would like to implement this, please let me (Jake) know and I'll give you a hand.**

## Notes
### Updating the Starterpack
This Starterpack will be updated weekly, on a Friday evening, if needs be. Deprecated packages, if any, will be replaced/removed, and packages will be updated to their latest appropriate version.

### Contributing
If you wish to add a task, or add features to a current task, please feel free. Fork this repository and PR back into `develop`!

## Other notes
Please make an effort to stop using jQuery for animations, changing CSS properties and doing anything CSS can do. Unless you're explicitly supporting IE 8, please create animations using CSS, which benefits the user by being able to use hardware accelleration to improve smoothness and speed of animations. Ideally, your project should be moving to a place where it doesn't rely on JS for animations, changing CSS properties or the like. I really can't think of any reason why you'd want to do that. It used to be easy using jQuery before CSS3 was implemented _literally everywhere_, but now it's a pain on the user and slows down sites massively.

## Todo
- Create package to cache minified images, speeding up Imagemin in the process
- Include package to automatically generate styleguide (that works)
- Write Sourcemap tutorial
