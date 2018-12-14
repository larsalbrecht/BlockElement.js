'use strict'

const Blocker = require('../src/Blocker')

require('mutationobserver-shim')
global.MutationObserver = window.MutationObserver

describe('Blocker.js', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    Blocker._decorators = null
    Blocker._rootNode = null
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
      then(() => {
        const timeout = 500

        document.getElementById('itemToBlock').
          remove()

        setTimeout(() => {
          expect(document.querySelector('.blocker')).
            toBe(null)
          done()
        }, timeout)
      })
  })

  it('MutationObserver does not removes blocker when blocked element is removed', (done) => {
    document.body.innerHTML =
      '<div id="root">' +
      '  <div id="itemToBlock"></div>' +
      '</div>'

    return Blocker.block(document.getElementById('root')).
      then(() => {
        const timeout = 500

        document.getElementById('itemToBlock').
          remove()

        setTimeout(() => {
          expect(document.querySelector('.blocker')).
            not.
            toBe(null)
          done()
        }, timeout)
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
    const decorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: () => {
              return null
            },
            event: ''
          }
        })
      }
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({'': [decorator]})
  })

  it('Adds two decorator to Blocker._decorators when call static Blocker.with([]) with two valid decorator', () => {
    const decorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: () => {
              return null
            },
            event: ''
          }
        })
      }
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
    const decorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: () => {
              return {}
            }
          }
        })
      }
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({})
  })

  it('Adds no decorator to Blocker._decorators when call static Blocker.with([]) with invalid decorator (missing function decorator.when())', () => {
    const decorator = {
      decorator: {}
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
    const notPassingSpyCallTimes = 0

    const notPassingSpy = jest.fn((input) => {
      return input
    })

    const decorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: notPassingSpy,
            event: 'foobar'
          }
        })
      }
    }

    Blocker.with([decorator])

    expect(Blocker._decorators).
      toEqual({'foobar': [decorator]})
    expect(Blocker._hook('', '')).
      toEqual('')
    expect(notPassingSpy).
      toHaveBeenCalledTimes(notPassingSpyCallTimes)
  })

  it('Returns changed input (and call only the passing decorators) passing (and no passing) decorators set when calling Blocker._hook', () => {
    const passingSpyCallTimes = 1
    const notPassingSpyCallTimes = 0

    const notPassingSpy = jest.fn(() => {
      return ''
    })
    const passingSpy = jest.fn(() => {
      return 'foobar'
    })

    const notPassingDecorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: notPassingSpy,
            event: 'foobar'
          }
        })
      }
    }
    const passingDecorator = {
      decorator: {
        when: jest.fn(() => {
          return {
            callable: passingSpy,
            event: ''
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
      toHaveBeenCalledTimes(passingSpyCallTimes)
    expect(notPassingSpy).
      toHaveBeenCalledTimes(notPassingSpyCallTimes)

  })

  it('Will return Blocker when call static Blocker.onNode()', () => {
    expect(Blocker.onNode()).
      toEqual(Blocker)
  })

  it('Will instance Blocker._rootNode when call static Blocker.onNode(HTMLElement)', () => {
    const node = document.createElement('div')

    Blocker.onNode(node)

    expect(Blocker._rootNode).
      toEqual(node)
  })

  it('Will add blocker to given node when call static Blocker.onNode(HTMLElement) and then Blocker.block(HTMLElement)', () => {
    const node = document.createElement('div')

    node.innerHTML = '<div id="testNode"></div>'
    Blocker.onNode(node)

    Blocker.block(node.querySelector('#testNode')).
      then((blockerElement) => {
        expect(node.querySelector('.blocker')).
          toEqual(blockerElement)
      })
  })

  it('Will reset Blocker._rootNode when calling static Blocker.block(HTMLElement) with second argument true (default)', () => {
    const node = document.createElement('div')

    node.innerHTML = '<div id="testNode"></div>'
    Blocker.onNode(node)

    Blocker.block(node.querySelector('#testNode'), true).
      then(() => {
        expect(Blocker._rootNode).
          not.
          toEqual(node)
      })
  })

  it('Will not reset Blocker._rootNode when calling static Blocker.block(HTMLElement) with second argument false', () => {
    const node = document.createElement('div')

    node.innerHTML = '<div id="testNode"></div>'
    Blocker.onNode(node)

    Blocker.block(node.querySelector('#testNode'), false).
      then(() => {
        expect(Blocker.hasOwnProperty('_rootNode')).
          toBeTruthy()
        expect(Blocker._rootNode).
          toEqual(node)
      })
  })

})


