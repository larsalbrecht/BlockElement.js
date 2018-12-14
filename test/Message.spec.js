'use strict'

// const BlockElementDecorator = require('../src/BlockElementDecorator')
const Message = require('../src/decorators/Message')

require('mutationobserver-shim')
global.MutationObserver = window.MutationObserver

describe('Message.js', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('Adds div.message when message is type string onAfterOverlay', () => {
    const actual = Message.onAfterOverlay('', 'foo')

    expect(actual).
      toEqual('<div class="message">foo</div>')
  })

  it('Adds no div.message when message is not type string onAfterOverlay', () => {
    const actual = Message.onAfterOverlay('', [])

    expect(actual).
      toEqual('')
  })

  it('Returns configuration', () => {
    const actual = Message.when()

    expect(actual).
      toEqual({
        callable: Message.onAfterOverlay,
        event: 'BLOCKER_INNER_HTML_AFTER_OVERLAY'
      })
  })
})


