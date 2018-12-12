'use strict'

const Blocker = require('../src/Blocker')

require('mutationobserver-shim')
global.MutationObserver = window.MutationObserver

describe('Blocker.js', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    Blocker._decorators = null
  })

  it('Create new node on block()', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then((blockerElement) => {
        expect(blockerElement.parentNode).
          toEqual(document.querySelector('body'))
        expect(blockerElement).
          toBeInstanceOf(HTMLElement)
        expect(blockerElement.blockNode).
          toEqual(document.getElementById('root'))
        expect(blockerElement.blockObserver).
          toBeInstanceOf(MutationObserver)
      })
  })

  it('Adds a reference to origin object on block()', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then((blockerElement) => {
        expect(document.getElementById('root').blockNodeWith).
          toEqual(blockerElement)
      })
  })

  it('Removes node on unblock()', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then((blockerElement) => {
        expect(blockerElement.parentNode).
          toEqual(document.querySelector('body'))

        return Blocker.unblock(document.getElementById('root')).
          then(() => {
            expect(document.querySelector('.blocker')).
              toEqual(null)
          })
      })
  })

  it('Create no new node on block() with already blocked element', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then((blockerElement) => {
        return Blocker.block(document.getElementById('root')).
          then((blockerElement2) => {
            expect(blockerElement).
              toEqual(blockerElement2)
          })
      })
  })

  it('Create no new node on block() with invalid element', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('not-available')).
      catch((reason) => {
        expect(reason).
          toEqual('Invalid element')
        expect(document.querySelector('.blocker')).
          toEqual(null)
      })
  })

  it('Unblock no node on unblock() with not blocked element', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.unblock(document.getElementById('root')).
      catch((reason) => {
        expect(reason).
          toEqual('Nothing to unblock')
      })
  })

  it('Unblock no node on unblock() with invalid element', () => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.unblock(document.getElementById('not-available')).
      catch((reason) => {
        expect(reason).
          toEqual('Invalid element')
      })
  })

  it('MutationObserver removes blocker when blocked element is removed', (done) => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('itemToBlock')).
      then((blockerElement) => {
        document.getElementById('itemToBlock').
          remove()
        setTimeout(() => {
          expect(document.querySelector('.blocker')).
            toBe(null)
          done()
        }, 500)
      })
  })

  it('MutationObserver does not removes blocker when blocked element is removed', (done) => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then((blockerElement) => {
        document.getElementById('itemToBlock').
          remove()
        setTimeout(() => {
          expect(document.querySelector('.blocker')).
            not.
            toBe(null)
          done()
        }, 500)
      })
  })

  it('Will return Blocker when call static Blocker.with()', () => {
    expect(Blocker.with()).
      toEqual(Blocker)

  })

  it('Will instance Blocker._decorators when call static Blocker.with([])', () => {
    Blocker.with([])

    expect(Blocker._decorators).
      toEqual({})
  })

  it('Adds decorator to Blocker._decorators when call static Blocker.with([]) with valid decorator', () => {
    let decoratorMock = {
      when: jest.fn(() => {
        return {
          event: '',
          callable: () => null
        }
      })
    }

    const decorator = {
      decorator: decoratorMock
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({'': [decorator]})
  })

  it('Adds two decorator to Blocker._decorators when call static Blocker.with([]) with two valid decorator', () => {
    let decoratorMock = {
      when: jest.fn(() => {
        return {
          event: '',
          callable: () => null
        }
      })
    }

    const decorator = {
      decorator: decoratorMock
    }

    Blocker.with([
      decorator,
      decorator
    ])

    expect(Blocker._decorators).
      toEqual({
        '': [
          decorator,
          decorator
        ]
      })
  })

  it('Adds no decorator to Blocker._decorators when call static Blocker.with([]) with invalid decorator (missing event in decorator.when() result)', () => {
    let decoratorMock = {
      when: jest.fn(() => {
        return {}
      })
    }

    const decorator = {
      decorator: decoratorMock
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({})
  })

  it('Adds no decorator to Blocker._decorators when call static Blocker.with([]) with invalid decorator (missing function decorator.when())', () => {
    let decoratorMock = {}

    const decorator = {
      decorator: decoratorMock
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({})
  })

  it('Adds no decorator to Blocker._decorators when call static Blocker.with([]) with invalid decorator (missing property decorator)', () => {
    const decorator = {}

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({})
  })

  it('Returns given input as is with no decorators set when calling Blocker._hook', () => {
    expect(Blocker._decorators).
      toEqual(null)

    expect(Blocker._hook('', '')).
      toEqual('')
  })

  it('Returns given input (and do not call other decorators) as is with no passing decorators set when calling Blocker._hook', () => {
    const spy = jest.fn(() => {})

    const decorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            event: 'foobar',
            callable: spy
          }
        })
      }
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({'foobar': [decorator]})
    expect(Blocker._hook('', '')).
      toEqual('')
    expect(spy).
      toHaveBeenCalledTimes(0)
  })

  it('Returns changed input (and call only the passing decorators) passing (and no passing) decorators set when calling Blocker._hook', () => {
    const notPassingSpy = jest.fn(() => {return ''})
    const passingSpy = jest.fn(() => {return 'foobar'})

    const notPassingDecorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            event: 'foobar',
            callable: notPassingSpy
          }
        })
      }
    }

    const passingDecorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            event: '',
            callable: passingSpy
          }
        })
      }
    }

    Blocker.with([
      passingDecorator,
      notPassingDecorator
    ])

    expect(Blocker._decorators).
      toEqual({
        '': [passingDecorator],
        'foobar': [notPassingDecorator]
      })
    expect(Blocker._hook('', '')).
      toEqual('foobar')
    expect(passingSpy).
      toHaveBeenCalledTimes(1)
    expect(notPassingSpy).
      toHaveBeenCalledTimes(0)

  })
})


