'use strict'

const BlockerDecorator = require('./BlockerDecorator')

module.exports = class Message extends BlockerDecorator {

  /**
   *
   * @returns {{callable: (function(HTMLElement, JSON): HTMLElement), event: string}}
   */
  static when () {
    return {
      event: 'BLOCKER_INNER_HTML_AFTER_OVERLAY',
      callable: Message.onAfterOverlay
    }
  }

  /**
   *
   * @param blockerElementInnerHTML {string}
   * @param message {string}
   * @returns {string}
   */
  static onAfterOverlay (blockerElementInnerHTML, message) {
    if ('string' === typeof message) {
      blockerElementInnerHTML += '<div class="message">' + message + '</div>'
    }

    return blockerElementInnerHTML
  }
}
