if (process.env.NODE_ENV === 'producton') {
  module.exports = require('./security_prod.js')
} else {
  module.exports = require('./securtiy_dev.js')
}
