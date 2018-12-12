'use strict'

const Blocker = require('../src/Blocker')
const Message = require('../src/Message')

require('mutationobserver-shim')
global.MutationObserver = window.MutationObserver

describe('BlockElement.js with Decorators', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('Create new node with decorator on block() with Message', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.with([
        {
          decorator: Message,
          options: 'foo'
        }
      ]).
      block(document.getElementById('root')).
      then((blockerElement) => {

        expect(blockerElement.parentNode).
          toEqual(document.querySelector('body'))

        expect(blockerElement.querySelector('.message').textContent).
          toEqual('foo')

        expect(blockerElement).
          toBeInstanceOf(HTMLElement)

        expect(blockerElement.blockNode).
          toEqual(document.getElementById('root'))

        expect(blockerElement.blockObserver).
          toBeInstanceOf(MutationObserver)
      })
  })

  it('Create new node with invalid decoratorlist on block() with Message', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.with('invalid').
      block(document.getElementById('root')).
      then((blockerElement) => {

        expect(blockerElement.parentNode).
          toEqual(document.querySelector('body'))

        expect(blockerElement.querySelector('.message')).
          toEqual(null)

        expect(blockerElement).
          toBeInstanceOf(HTMLElement)

        expect(blockerElement.blockNode).
          toEqual(document.getElementById('root'))

        expect(blockerElement.blockObserver).
          toBeInstanceOf(MutationObserver)
      })
  })

})


