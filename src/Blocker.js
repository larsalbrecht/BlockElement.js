'use strict'

module.exports = class Blocker {

  /**
   *
   * @param elem {HTMLElement}
   * @returns {Promise<any>}
   */
  static block (elem) {
    return new Promise((resolve, reject) => {
      if (!elem) {
        // no elem given
        reject('Invalid element')
      }

      if (elem.hasOwnProperty('blockNodeWith') && elem.blockNodeWith) {
        // already blocked
        resolve(elem.blockNodeWith)
      }

      const originHeight = elem.offsetHeight
      const originWidth = elem.offsetWidth
      const originPositionTop = window.scrollY + elem.getBoundingClientRect().top
      const originPositionLeft = window.scrollX + elem.getBoundingClientRect().left

      const blockerContainer = document.createElement('div')

      const observer = new MutationObserver((mutationsList, observer) => {
        mutationsList.forEach((mutationRecord) => {
          mutationRecord.removedNodes.forEach((node) => {
            if (node === elem) {
              observer.disconnect()
              blockerContainer.remove()
            }
          })
        })
      })

      // Start observing the target node for configured mutations
      observer.observe(elem.parentNode, {
        attributes: true,
        childList: true,
        subtree: true
      })

      blockerContainer.blockNode = elem // backreference
      blockerContainer.blockObserver = observer
      blockerContainer.classList.add('blocker')
      blockerContainer.style.position = 'absolute'
      blockerContainer.style.height = originHeight + 'px'
      blockerContainer.style.width = originWidth + 'px'
      blockerContainer.style.top = originPositionTop + 'px'
      blockerContainer.style.left = originPositionLeft + 'px'
      blockerContainer.innerHTML = Blocker._hook('BLOCKER_INNER_HTML_BEFORE_OVERLAY', blockerContainer.innerHTML)
      blockerContainer.innerHTML = '<div class="overlay"></div>'
      blockerContainer.innerHTML = Blocker._hook('BLOCKER_INNER_HTML_AFTER_OVERLAY', blockerContainer.innerHTML)

      // save reference in origin
      elem.blockNodeWith = blockerContainer

      document.body = Blocker._hook('DOCUMENT_BODY_BEFORE_APPEND', document.body)
      document.body.appendChild(blockerContainer)
      document.body = Blocker._hook('DOCUMENT_BODY_AFTER_APPEND', document.body)

      // reset decorators
      Blocker._decorators = {}

      resolve(blockerContainer)
    })
  }

  /**
   * List of decorators in format:
   * ```
   * [
   *  {decorator: <DecoratorName>, options: <DecoratorSpecificOption>}
   * ]
   * ```
   * @param decorators {{decorator: BlockerDecorator, options: <any>}[]}
   * @returns {Blocker}
   */
  static with (decorators) {
    if (!Array.isArray(decorators)) {
      return Blocker
    }
    Blocker._decorators = {}
    decorators.forEach((decorator) => {
      if (decorator.hasOwnProperty('decorator') && decorator.decorator.hasOwnProperty('when') && decorator.decorator.when().
        hasOwnProperty('event') && decorator.decorator.when().
        hasOwnProperty('callable')) {
        const eventName = decorator.decorator.when().event
        if (!Blocker._decorators.hasOwnProperty(eventName)) {
          Blocker._decorators[eventName] = []
        }
        Blocker._decorators[eventName].push(decorator)
      }
    })

    return Blocker
  }

  /**
   *
   * @param name {string}
   * @param content <any>
   */
  static _hook (name, content) {
    if (!Blocker._decorators || !Blocker._decorators.hasOwnProperty(name)) {
      return content
    }

    Blocker._decorators[name].forEach((decorator) => {
      content = decorator.decorator.when().
        callable(content, decorator.options)
    })

    return content
  }

  /**
   *
   * @param elem {HTMLElement}
   * @returns {Promise<any>}
   */
  static unblock (elem) {
    return new Promise((resolve, reject) => {
      if (!elem) {
        // no elem given
        reject('Invalid element')
        return
      }

      if (!elem.hasOwnProperty('blockNodeWith') || !elem.blockNodeWith || !elem.blockNodeWith.hasOwnProperty('blockObserver')) {
        // nothing to unblock
        reject('Nothing to unblock')
        return
      }

      elem.blockNodeWith.blockObserver.disconnect() // disconnect observer
      elem.blockNodeWith.remove() // remove element
      elem.blockNodeWith = null // set reference to null

      resolve(elem)
    })
  }
}
