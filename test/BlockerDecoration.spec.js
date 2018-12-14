'use strict'

const DelegatedBlockerDecoratorConstructor = require('./_DelegatedBlockerDecoratorConstructor')
const DelegatedBlockerDecoratorFunctionWhen = require('./_DelegatedBlockerDecoratorFunctionWhen')
const BlockerDecorator = require('../src/BlockerDecorator')

describe('BlockerDecorator.js', () => {
  it('Throws Error on create new instance', () => {
    const newInstance = () => {
      new BlockerDecorator() // eslint-disable-line no-new
    }

    expect(() => {
      newInstance()
    }).
      toThrowError('Cannot construct Abstract instances directly')
  })

  it('Throws no Error on create new instance with delegated class', () => {
    const newInstance = () => {
      new DelegatedBlockerDecoratorConstructor() // eslint-disable-line no-new
    }

    expect(() => {
      newInstance()
    }).
      not.
      toThrowError('Cannot construct Abstract instances directly')
  })

  it('Throws Error when call static BlockerDecorator.when()', () => {
    const callStaticWhen = () => {
      BlockerDecorator.when()
    }

    expect(() => {
      callStaticWhen()
    }).
      toThrowError('Must override method BlockerDecorator.when')
  })

  it('Throws no Error when call static BlockerDecorator on delegated class', () => {
    const callStaticWhen = () => {
      DelegatedBlockerDecoratorFunctionWhen.when()
    }

    expect(() => {
      callStaticWhen()
    }).
      not.
      toThrowError('Must override method BlockerDecorator.when')
  })
})


