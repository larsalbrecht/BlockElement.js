# BlockElement

## Description
With BlockElement you can block a HTML-Element, so it is not use- or clickable (the real behaviour relies on your css).

## Install
With npm installed, run
```bash
npm install @lars.albrecht/block-element --save
```

## Usage
See index.html in the root directory, to see a demonstration.


### Block an element:
```javascript
BlockElement.Blocker.block(document.getElementById('myElem'))
```

### Use of decorators:
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

### Example ES5
```javascript
function CustomDecorator () {}

CustomDecorator.prototype = Object.create(BlockElement.BlockerDecorator.prototype)

CustomDecorator.when = function () {
  return {
    event: 'BLOCKER_INNER_HTML_AFTER_OVERLAY',
    callable: this.callOnMe
  }
}

CustomDecorator.callOnMe = function (content) {
  console.log('custom decorator!')

  return content
}
```


## Events
Currently there a 4 events:
* BLOCKER_INNER_HTML_BEFORE_OVERLAY | Blocker.innerHTML
  * Will be called before the overlay is added to the inner html of the Blocker.
* BLOCKER_INNER_HTML_AFTER_OVERLAY | Blocker.innerHTML
  * Will be called after the overlay is added to the inner html of the Blocker.
* DOCUMENT_BODY_BEFORE_APPEND | document.body
  * Will be called before the element is added to the body.
* DOCUMENT_BODY_AFTER_APPEND | document.body
  * Will be called after the element is added to the body.
