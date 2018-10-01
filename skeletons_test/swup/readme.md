# swup
**Animated page transitions with css.**

![Transition examples](https://user-images.githubusercontent.com/9338324/39842661-9ec5d41a-53e7-11e8-87de-963b4da4a952.gif)

**Note:** In case you like to do your animations in JavaScript, you may also check out [swupjs](https://github.com/gmrchk/swupjs).

## About swup
* It's just ridiculously [easy to use](#example), even for beginners.
* Define as many [containers](#elements) to replace as you want! You can tell swup to replace even the smallest parts of the page, so you can work with the rest for your animation.
* Use swup [events](#events) to run your JavaScript, trigger analytics, close sidebars or anything you need…
* Forget about timing. swup [detects the end of your animations](#animation-selector) and controls the whole lifecycle of transition automatically.
* Don't worry about browser history… swup takes care of it, changes the url when it's needed and preserves browser native behavior on popState events.
* Has some cool additional features for even better experience like [cache](#cache), smart [preload](#preload) without DDOSing your server, badass smooth "acceleration based" [scroll](#scroll) control, helpful [debug mode](#debug-mode), or support for [forms](#form-selector).

[Installation](#installation)

[Example](#example)

[How it works](#how-it-works)

[Options](#options)
* [Link Selector](#link-selector)
* [Form Selector](#form-selector)
* [Element](#elements)
* [Animation Selector](#animation-selector)
* [Cache](#cache)
* [Preload](#preload)
* [Page Class Prefix](#page-class-prefix)
* [Scroll](#scroll)
* [Support](#support)
* [Debug Mode](#debug-mode)
* [Skip popState Handling](#skip-popstate-handling)
* [Default values](#default-values)

[Events](#events)

[Plugins](#plugins)
* [Plugin Installation](#plugin-installation)
* [swupMergeHeadPlugin](#swupmergeheadplugin)
* [swupGaPlugin](#swupgaplugin)
* [swupGtmPlugin](#swupgtmplugin)

[API](#api)

[Contributions](#contributions)

## Installation
```shell
npm install swup
```

or include the file from the dist folder

```html
<script src="./dist/swup.js"></script>
```

### Example
Define the elements that are being animated and elements that need to be replaced.
Let's assume we want to fade in/out the content of `main` element and replace it's contents.
Add `swup` [id to tell swup](#elements) to replace the content of that element
and your [animation class](#animation-selector) to tell swup to wait for that element to animate.
Both are adjustable in options and are not related to each other (you can animate completely different elements that the containers for replacing content).
```html
<html>
    <head>
        <title>Homepage</title>
    </head>
    <body>
        <main id="swup" class="transition-fade">
            <h1>This is homepage</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/someOtherPage">Go to other page</a>
        </main>
    </body>
</html>
```

Enable swup.
```javascript
import Swup from 'swup';
const swup = new Swup();    // only this line when included with script tag
```

Add your css for the element animation.
```css
.transition-fade {
    transition: .4s;
    opacity: 1;
}
html.is-animating .transition-fade{
    opacity: 0;
}
```

**And that's it, we're all set, or at least for our fade in/fade out example…**
Swup loads the page, handles classes for the css animation, waits for the animation to finish/page to load, replaces content and fades your content back.
Swup also changes the title of your page to the loaded one, and exchanges classes of body element (more in [options](#options) section).

## How it works
Apart from loading the contents of the new page and replacing required parts in DOM, swup is built around css animation.
All that needs to be done is defining your hidden state in CSS.
Swup detects the end of transition of animated elements and proceeds to replacing the content and animating your page back.
For the animations based on CSS to be possible, swup uses several classes that are assigned to the `html` tag through the process of page transition.

* `is-animating` - This class is assigned to the html tag once link is clicked and is removed shortly after the content of the page is replaced. (used for defining styles for an unloaded page)
* `is-changing` - Assigned once a link is clicked and removed when the whole process of transition of pages is done. (used for showing some loading)
* `is-leaving` - Assigned once a link is clicked and removed right before the content is replaced. (can be used in together with `is-animating` to create different animation for *IN* and *OUT*)
* `is-rendering` - Assigned right before the content is replaced and removed when the whole process of transition of pages is done. (same as above)
* `to-[route of next page in URL friendly form]` - Assigned once a link is clicked and removed when the whole process of transition of pages is done.
Custom class can be also added by adding `data-swup-class` to the link, where `to-[content of data-swup-class attribute]` is added to html. (used to change animation for different URLs)

## Options
Swup has a several options that can be passed into a constructor as an object.
```javascript
let options = {};
const swup = new Swup(options);
```

### Link Selector
Link selector defines link elements that will trigger the transition. By default, the selector takes any link with `href` attribute starting with `/`, `#` or current domain.
```javascript
LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])'
```
In case you want to exclude links for some routes, lightbox or any other functionality, extend the selector.
By default, you can also add `data-no-swup` attribute to the link, if you want to exclude just a few.


### Form Selector
Form selector defines forms that will be submitted via swup (with animation and all, as any other request).
By default, any form with `data-swup-form` attribute is selected.
```javascript
FORM_SELECTOR: 'form[data-swup-form]'
```
Swup will take the form data and submit it with appropriate `method` and `action` based on form attributes, where method defaults to `GET` and action defaults to current url.
In case of `GET` method, swup serializes the data into url. In case of `POST` request, swup wraps the data and sends in via POST request. 

**Note:** This feature is rather experimental and serves to enable submission of simple forms such as "search on website" form. 
The response from the server must be a valid page with all elements that need to be replaced by swup.
When cache is enabled, swup does not visit same url twice, including `POST` requests with different data. swup removes page from cache before form submission, so the submit goes through every time.
This method does not support submission of files, or other advanced features. 
Please refer to [API](#api) section, for using swup API for sending requests. 


### Elements
Elements option defines the array of selectors of containers, where the content needs to be replaced.
Elements option usually contains the main element with the content of the page, but can include any element that is present across all pages.
This creates a possibility of animating elements on the page while still replacing it's parts. 
Another good example where this is helpful is the "change language" link, which usually appears the same across the site, but leads to a different URL on each page.
Option defaults to the single element of id `#swup`.
```javascript
options = {
    elements: ['#swup']
}
```

### Animation Selector
As swup is built on animations, it is required to define the elements that are being animated. Usually, you would like to give the elements some common class or class prefix.
By default option is set to `[class*='transition-']`, which selects all elements with class attribute containing `transition-`.
```javascript
animationSelector: '[class*="transition-"]'
```

### Cache
Swup has a built-in cache, meaning that it stores previously loaded contents of the pages in memory in a form of an object.
This drastically improves speed for static sites but should be disabled for dynamic sites. Cache option defaults to `true`.
```javascript
cache: true
```

### Preload
When enabled, swup starts loading the page on hover of the link and does not wait for the user to click.
In case the page is not loaded at the time of clicking on the link, swup simply waits for the request to finish and does not create new request.
Also, swup only creates one preload request at the time, so your server won't be overwhelmed by people just passing their cursor through some grid of links.
If cache is disabled, swup still preloads pages on hovered links, but the content of cache is removed after each page transition.
In case you want to preload some page automatically without any trigger by the user, `data-swup-preload` on the link will do the trick.
```javascript
preload: true
```

### Page Class Prefix
Some CSS styles are very often based on the class of the page defined in the `body` element.
Swup replaces the `body` classes for each loaded page. However, the site may use the `body` class attribute for functionality such as opening of some sort of menu by adding class to the body element.
In that case, you may want to define a prefix for your page style classes such as `page-`, so only those are replaced by swup.
By default option is set to `''` and all classes of body element are replaced during the transition.
In case the class attribute on body is not used at all, the class replacement can be disabled all together by setting the option to `false`.
```javascript
pageClassPrefix: ''
```

### Scroll
Swup has a built-in scroll control, so scroll to top and to anchor element in URL (#some-element) is handled automatically.
This feature can be turned off and you can use your own scroll based on the emitted events discussed in [events](#events) section.
By default, the option is set to `true`.
```javascript
scroll: true
```

There are additional settings for scroll:

`doScrollingRightAway` defines if swup is supposed to wait for the replace of the page to scroll to the top. 
`animateScroll` sets whether the scroll animation is enabled or swup simply sets the scroll without animation.
Animation of scroll is also adjustable with options `scrollFriction` and `scrollAcceleration`.

All default values for additional options of scroll are displayed below:

```javascript
doScrollingRightAway: false,
animateScroll: true,
scrollFriction: .3,
scrollAcceleration: .04,
```

### Support
Due to the use of promises, transitionEnd and pushState features of JavaScript, swup has a basic support check built in to avoid breaking of the site in case of an older browser that doesn't support used features. 
However, as there may always be some exceptions for browsers or polyfills can be used on the page (that may or may not work), this support check can be disabled and you can use your own support check before creating the instance.
Support option is enabled by default.
```javascript
support: true
```

### Debug Mode
Debug mode is useful for integrating swup into your site.
When enabled, swup displays emitted events (see [events](#events) section) in the console, as well as contents of the cache when changed.
Swup instance is also accessible globally as `window.swup` in debug mode. Option defaults to false.
```javasrripts
debugMode: false
```

### Skip popState Handling
Swup is built around browser history API, but sometimes some other tools manipulating the browser history can be used as well. 
For this reason, swup places a source property into every history state object it creates, so it can be later identified (swup also modifies current history record on start, to include the "swup" source property as well). 
On `popState` events, swup only handles the records that were created by swup. 
This behavior can be modified by `skipPopStateHandling` option, which is represented by a function returning boolean (false = handle the popstate, true = do nothing). 
The function accepts one argument - the popstate event. Option defaults to the following:
```javascript
skipPopStateHandling: function(event){
    if (event.state && event.state.source == "swup") {
        return false;
    }
    return true;
}
```

### Default values
```javascript
let options = {
    LINK_SELECTOR: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
    FORM_SELECTOR: 'form[data-swup-form]',
    elements: [
        '#swup'
    ],
    animationSelector: '[class*="transition-"]',
    cache: true,
    pageClassPrefix: '',
    scroll: true,
    debugMode: false,
    preload: true,
    support: true,
    skipPopStateHandling: function(event){
        if (event.state && event.state.source == "swup") {
            return false;
        }
        return true;
    },
}
```

## Events
As we are replacing the native functionality of the browser, there is a need for a lifecycle that would replace the standard browser page lifecycle (*load page* and *leave page*).
For this purpose, swup emits bunch of events triggered on the `document` while working.
We can use those events to enable our JavaScript, trigger some analytics, and much more.
```javascript
// trigger page view for GTM
document.addEventListener('swup:pageView', event => {
    dataLayer.push({
        'event': 'VirtualPageview',
        'virtualPageURL': window.location.pathname,
        'virtualPageTitle' : document.title
    });
});

// load scripts for replaced elements
document.addEventListener('swup:contentReplaced', event => {
    swup.options.elements.forEach((selector) => {
        // load scripts for all elements with 'selector'
    })
});
```

**Note:** example with enabling scripts above assumes using component based approach, like the one used by [Gia framework](https://github.com/giantcz/gia).

### List of all events
* **swup:willReplaceContent** - triggers right before the content of page is replaced
* **swup:contentReplaced** - triggers right after the content of page is replaced
* **swup:pageView** - similar as previous, except it is once triggered on load
* **swup:hoverLink** - triggers when link is hovered
* **swup:clickLink** - triggers when link is clicked
* **swup:animationOutDone** - triggers when transition of all animated elements is done (after click of link and before content is replaced)
* **swup:pagePreloaded** - triggers when the preload of some page is done
* **swup:pageLoaded** - triggers when loading of some page is done (differs from previous only by the source of event - hover/click)
* **swup:scrollStart** - triggers when built in scroll is started
* **swup:scrollDone** - triggers when built in scroll is done
* **swup:animationInDone** - triggers when transition of all animated elements is done (after content is replaced)
* **swup:pageRetrievedFromCache** - triggers when page is retrieved from cache and no request is necessary
* **swup:submitForm** - triggers when form is submitted trough swup (right before submission)
* **swup:enabled** - triggers when swup instance is created or re-enabled after call of `destroy()`
* **swup:disabled** - triggers on `destroy()`

## Plugins
Some functionality is only necessary in certain projects.
For this reason, swup has support for plugins.

### Plugin Installation
```javascript
import Swup from 'swup'
import pluginName from 'swup/plugins/pluginName'
```
or
```html
<script src="./dist/swup.js"></script>
<script src="./dist/plugins/pluginName.js"></script>
```

and enable plugin at initialisation of swup by including it in options:

```javascript
var options = {
    plugins: [
        pluginName
    ]
}
var swup = new Swup(options)
```

Plugins may also have some default options.
To rewrite default options of plugin, use swup's `usePlugin` function to enable plugin.

```javascript
var swup = new Swup();
swup.usePlugin(pluginName, {option: "value of option"});
```

### swupMergeHeadPlugin
Merge Head Plugin replaces the html tags in head on each content replace (`swup:contentReplaced` event).
Plugin has one option `runScripts`. If the options is set to `true`, script tags placed into head are executed (code inside of the tag as well as linked by `src` attribute).
Option defaults to `false`.

### swupGaPlugin
Google Analytics Plugin triggers `pageview` event on `swup:contentReplaced` (on each page change).
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere.
However, page view event is by default triggered in [Javascripts tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_javascript_tracking_snippet).
Simplified code run by this plugin on `swup:contentReplaced`:

```javascript
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

### swupGtmPlugin
Google Tag Manager Plugin triggers `VirtualPageview` event on `swup:contentReplaced` (on each page change) which can be associated with a page view within GTM.
Event object also includes `virtualPageURL` holding the url of the page and `virtualPageTitle` holding the title of the page.
Note that this event is not triggered at the first load, so the first page view must be triggered elsewhere.
Simplified code run by this plugin on `swup:contentReplaced`:

```javascript
window.dataLayer.push({
    'event': 'VirtualPageview',
    'virtualPageURL': window.location.pathname + window.location.search,
    'virtualPageTitle': document.title
});
```

## API
The instance of the swup can be imported and used across your sites JavaScript to enable some additional features.
When debug mode (see [options](#options) section) is enabled, instance is also available in `window` object as `window.swup`.
We can access some of the information used by swup such as used options:
```javascript
swup.options.elements.forEach((selector) => {
    // do something for each container element
})
swup.options.cache; // true/false
```

or change options
```javascript
// enable cache
swup.options.cache = true;
```

or remove page from cache
```javascript
// enable cache
swup.cache.remove('/your-url');
```

or use built in functions
```javascript
// navigates to /someRoute with the animations and all... (can be used to submit forms)
swup.loadPage({
    url: "/someRoute", // route of request (defaults to current url)
    method: "GET", // method of request (defaults to "GET")
    data: data, // data passed into XMLHttpRequest send method
});

// scroll page to some position (2000px form top in this example)
swup.scrollTo(window, 2000);
```
**Note:** `loadPage` function is used to submit forms with swup.
For more information on submitting forms with `XMLHttpRequest`, refer to [Sending forms through JavaScript](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript).

```javascript
// disable swup
swup.destroy();
```
...and much more. Sky is the limit here, explore swup or create an issue for some particular example!

## Contributions
Swup is currently stable and production-ready. Any contributions or suggestions are more than welcome.

**If you'd like to share your work using swup with me or others, please, drop me a link at <a href="mailto:gmarcuk@gmail.com">gmarcuk@gmail.com</a>.**







