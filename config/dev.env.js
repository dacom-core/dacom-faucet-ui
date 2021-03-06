'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  registrator:'"http://localhost:1111/php-registrator/"',
  APP: '"Travelchain"',
  mode: "'0'",
})
