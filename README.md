# metalsmith-less

A Metalsmith plugin to compile less


### Usage

You must supply your own less (and any plugins you want)

```bash
$ npm install --save less
$ npm install --save metalsmith-lesser
```

```javascript
const Metalsmith = require('metalsmith');
const less = require('metalsmith-lesser');

Metalsmith(__dirname)
  //...
  .use(less())
  //.build(...

```

### Options

```javascript

var options = {
  copySource: false,
  lessOptions: {
    // passthrough to less.render(_, options)
  }
}

```


### Less plugins

```bash
$ npm install --save less-plugin-autoprefix
```

```javascript
const Metalsmith  = require('metalsmith');
const Autoprefix  = require('less-plugin-autoprefix');
const less        = require('metalsmith-lesser');

Metalsmith(__dirname)
  //...
  .use(less({
    copySource: false,
    lessOptions: {
      plugins: [new Autoprefix({browsers: ["last 2 versions"]})]
    }
  }))
  //.build(...


```