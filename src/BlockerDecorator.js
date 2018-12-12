module.exports = class BlockerDecorator {

  constructor () {
    if (new.target === BlockerDecorator) {
      throw new TypeError('Cannot construct Abstract instances directly')
    }
  }

  /**
   *
   * @returns {{callable: (function(HTMLElement, JSON): HTMLElement), event: string}}
   */
  static when () {
    throw new TypeError('Must override method BlockerDecorator.when')
  }
}
