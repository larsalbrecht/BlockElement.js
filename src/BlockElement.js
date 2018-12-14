import Blocker from './Blocker'

const BlockerDecorator = require('./BlockerDecorator')
const Message = require('./decorators/Message')

module.exports = {
  Blocker,
  BlockerDecorator,
  decorators: {
    Message
  }
}
