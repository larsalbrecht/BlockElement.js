# BlockElement

* NPM

[![](https://img.shields.io/npm/l/@lars.albrecht/block-element.svg)](https://www.npmjs.com/package/@lars.albrecht/block-element)

* GitHub

[![](https://img.shields.io/github/license/larsalbrecht/block-element.svg)](https://github.com/larsalbrecht/block-element)


## Description
With BlockElement you can block a HTML-Element, so it is not use- or clickable (the real behaviour relies on your css). You can use build-in decorators to modify the blocker output. You can also create own decorators easily.

## Install
With npm installed, run

```bash
npm install @lars.albrecht/block-element --save
```

## Usage
### Web
You can use the library on your webpage. Just add a script-tag with BlockElement.web.js to your webpage (header is preferred).

See web-example.html in the lib directory, to see a demonstration.

* Add ```<script src="./node_modules/@lars.albrecht/block-element/lib/BlockElement.web.min.js" charset="utf-8"></script>``` to your html-file.
* Add ```BlockElement.Blocker.block(document.getElementById('textContainer'))``` to your scripts.

For the IE11 you need the following polyfills:
* Promise
* Array.from

#### Vue.js / React.js / Angular.js
* Add ```import BlockerElement from '@lars.albrecht/block-element'``` to your component (imports BlockElement.web.min.js).
* Add ```BlockElement.Blocker.block(document.getElementById('textContainer'))``` to your component.

### General API
#### Block an element
```javascript
BlockElement.Blocker.block(document.getElementById('myElem'))
```

#### Block an element that is not in document

You can create a new element and use this as root for your blocker. The blocker will then be added to the given element instead of ```document.body````.
```javascript
const myNode = document.createElement('div')
BlockElement.Blocker.onNode('myNode').block(myNode.querySelector('#myElem'))
```

#### (Vue.js) Block an element with $ref
```javascript
    BlockerElement.Blocker.
      block(this.$refs.container.querySelector('#list')).
      then((blockerElement) => {
        // do something with the blocker-element
      }).catch((reason) => {
        // do something with the string reason
      })
```

#### (React.js) Block an element with ref
```javascript
    BlockerElement.Blocker.
      block(this.refs.container.querySelector('#list')).
      then((blockerElement) => {
        // do something with the blocker-element
      }).catch((reason) => {
        // do something with the string reason
      })
```

#### Use of decorators:
You can use the Blocker with decorators. A decorator can manipulate the Blocker-element.

```javascript
BlockElement.Blocker.with([{decorator: BlockElement.decorators.Message}]).block(document.getElementById('my-elem'))
```

## Built-In-Decorators
### BlockElement.decorators.Message
* Options
  * The message that should be shown
  
This decorator appends a div with a custom message.

## Custom Decorators
You can write custom decorators. 
* A decorator must extends BlockerDecorator
* A decorator must override the static method "when":
```javascript 
  static when () {
    return {
      event: <event-name>,
      callable: <method-to-be-called>
    }
  }
```
* The callable must be a function. This function becomes two properties:
  * content
    * This is the custom to the event that is fired. See [Events](#events)
    * This must be the result of the function.
  * options
    * This is the custom to the decorator that is called. Every decorator can (or can not) have options.

### Example ES5 decorator
```javascript
// create function as constructor
function CustomDecorator () {}

// extends with BlockElement.BlockerDecorator
CustomDecorator.prototype = Object.create(BlockElement.BlockerDecorator.prototype)

/**
* Static function that returns an event (to listen for) and a callable that should be called when the event occured.
* 
* @returns {{callable: Function, event: string}}
*/
CustomDecorator.when = function () {
  return {
    event: 'BLOCKER_INNER_HTML_AFTER_OVERLAY',
    callable: this.callOnMe
  }
}

/**
* Custom callable function. Will be called with the content and - if given - the options.
* @param content {*}
* @returns {*}
*/
CustomDecorator.callOnMe = function (content) {
  console.log('custom decorator!')

  return content
}
```

## Hooks
Currently there a 4 hooks:
* ```BLOCKER_INNER_HTML_BEFORE_OVERLAY``` | Blocker.innerHTML
  * Will be called before the overlay is added to the inner html of the Blocker.
* ```BLOCKER_INNER_HTML_AFTER_OVERLAY``` | Blocker.innerHTML
  * Will be called after the overlay is added to the inner html of the Blocker.
* ```DOCUMENT_BODY_BEFORE_APPEND``` | document.body
  * Will be called before the element is added to the body.
* ```DOCUMENT_BODY_AFTER_APPEND``` | document.body
  * Will be called after the element is added to the body.

When an hook is called, the decorators callable-function (defined in the result of when() as "callable") will be called with the given hook-content and with the user options.

## Development
### Used libraries
* Babel 7 - (https://babeljs.io/)
* ESLint 5 - (https://eslint.org/)
* Jest 23 - (https://jestjs.io/)
* webpack 4 - (https://webpack.js.org/)

### Workflow
* Install dependencies
  * ```npm install```
* Run file-watcher
  * ```npm run watch```
* Edit files
* Run eslint to check for linting errors and tests to check for test errors
  * ```npm run check```
* or both as single task:
  * Run eslint to check for linting errors
    * ```npm run lint```
  * Run tests to check for test errors
    * ```npm run test```
* Build production files
  * ```npm run build```

### Generated Files
#### Development
In development mode, the following files will be created in /lib:
* BlockElement.web.js
* web-example.html

In development mode, the following files will be created in /lib:
* BlockElement.web.min.js
* web-example.html
