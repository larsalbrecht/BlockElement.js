import Blocker from './Blocker'

const BlockerDecorator = require('./BlockerDecorator')
const Message = require('./Message')

module.exports = {
  BlockerDecorator,
  decorators: {
    Message
  },
  Blocker
}
