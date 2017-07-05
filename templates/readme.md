# Snazzie Website: A Simple Static Site Generator

* * *

## What is this?

Snazzie is an easy to use static site generator that uses the powers of Gulp to allow for live development reloading, asset compilation and minification as well as deployment to github pages. Its pure front end goodness designed by a front end developer, for front end developers.

## How do I get started with this?

Getting started with Snazzie is easy to use in just a few simple steps.

1. Clone or download this directory [update the remote](https://help.github.com/articles/changing-a-remote-s-url/)
2. Create your own directory on github (You will need it for step 4).
3. Change the name of your directory via the command line, like so:  `mv snazzie [YOUR DIRECTORY NAME HERE]`
4. type `npm init`.  When Snazzie initializes, enter in your directory name and use your repository location.  The rest is up to you for preferences.
5. type in your information into the desired fields, replacing the default snazzie setup.

That's it!

## How do I fire this up?

`npm start`

## How do I build this thing?

`npm run build`

## How do I deploy it for the world to see?

`npm run deploy`

## Where do I put pages?

In the app directory.  If you like, you can modify the gulp task to watch a page directory, it can be found on line 66 of gulpfile.js.  However, you should leave the index page out of there as a point of entry.

## Does Snazzie come with any pre-loaded CSS or JS libraries?

No.  Feel free to use whatever you prefer.  You can also use CDN hosted libraries, such as [jQuery](https://developers.google.com/speed/libraries/#jquery) or [Bootstrap](http://getbootstrap.com/getting-started/).  You should put them above the commented sections for self-hosted css or js files.

## Where do I put my precompiled SCSS, LESS or STYL files?

There are separate subdirectories for SCSS, LESS and Stylus stylesheets in the app directory.  All three subdirectories will be watched, choose whatever preprocessor you feel would work best for your project and compile away!

The default stylesheets are style.scss, style.less and style.styl.  Feel free to add any additional files that you need, but be sure to add those files in between the build comments, as shown below.  All files will be compressed when building.

## Where could I put vanilla CSS files?

#### CSS:
In the css subdirectory.  You can choose unminified files if you prefer, they will be compressed as your site is built.  Please note that if you choose to use vanilla CSS, name the file something else that styles.css if you are planning to use a preprocessor in addition.  (If not, feel free to use styles.css)  On build, these files will be compressed if they are included in the commented areas as shown below.

```
<!--build:css css/styles.min.css -->
    <link rel="stylesheet" href="./css/my-file-name.css">
    <link rel="stylesheet" href="./css/styles.css">
<!-- endbuild -->

```

## Can I use CDN hosted CSS frameworks like Bootstrap or Font Awesome with Snazzie?

You sure can.  Its up to you where you would like to put that, we suggest outside of the commented tags to be compiled on build, like this:

```

<link rel="stylesheet" href="https......." crossorigin="anonymous">

<!--build:css css/styles.min.css -->
    <link rel="stylesheet" href="./css/my-file-name.css">
    <link rel="stylesheet" href="./css/styles.css">
<!-- endbuild -->

```

## Does Snazzie have autoprefixing?

Yes!  On build, all the applicable vendor prefixes to your styles will be applied.

## Does Snazzie support es6?

Yes!  Please read on below, for notes about where to put and use your JS files.

However, there is a caveat with ES6 and Snazzie.  As Snazzie is a client side static site builder, importing js files tends to return errors with require.js.  This is a known bug, will be amended in the future.

## Where do I put any additional JS files?

In the js subdirectory.  There is a gulp task that will compile your javascript on the fly for you as well, so take particular note as to the file structure below.  Consider your working directory for javascript to be the `js` directory, whereas being able to see the fruits of your labor will be coming from the `compiled_js` directory.

## How does Snazzie compile my JavaScript?

Like the minified CSS, everything placed in the commented build statements will be compiled when the build command is run, as shown below.  Please note, the directory that should be compiled is coming from the `compiled_js` directory, not the `js` directory directly.

```
<!--build:js js/main.min.js -->
  <script src="./compiled_js/my-file-name.js"></script>
  <script src="./compiled_js/my-other-file-name.js"></script>
<!-- endbuild -->
```

## Can I use jQuery with Snazzie?

Sure!  We suggest using installing jQuery as an npm package and imported into the files where you need it, rather than using it as a Google Hosted Library.

## Can I use other CDN hosted JS libraries with Snazzie?

Yes!  Similar to the CSS section mentioned above, include whatever libraries you need outside of the build tags.
