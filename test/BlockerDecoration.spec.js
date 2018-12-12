'use strict'

const BlockerDecorator = require('../src/BlockerDecorator')

describe('BlockerDecorator.js', () => {
  it('Throws Error on create new instance', () => {
    function newInstance () {
      new BlockerDecorator()
    }

    expect(() => {
      newInstance()
    }).
      toThrowError('Cannot construct Abstract instances directly')
  })

  it('Throws no Error on create new instance with delegated class', () => {
    {
      class DelegatedBlockerDecorator extends BlockerDecorator {
        constructor () {
          super()
        }
      }
    }

    function newInstance () {
      new DelegatedBlockerDecorator()
    }

    expect(() => {
      newInstance()
    }).
      not.
      toThrowError('Cannot construct Abstract instances directly')
  })

  it('Throws Error when call static BlockerDecorator.when()', () => {
    function callStaticWhen () {
      BlockerDecorator.when()
    }

    expect(() => {
      callStaticWhen()
    }).
      toThrowError('Must override method BlockerDecorator.when')
  })

  it('Throws no Error when call static BlockerDecorator on delegated class', () => {
    {
      class DelegatedBlockerDecorator extends BlockerDecorator {
        static when () {
        }
      }
    }
    
    function callStaticWhen () {
      DelegatedBlockerDecorator.when()
    }

    expect(() => {
      callStaticWhen()
    }).
      not.
      toThrowError('Must override method BlockerDecorator.when')
  })
})


