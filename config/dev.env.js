'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  registrator:'"https://registrator.dacom.io/"',
  APP: '"Decentralized Autonomous Community"',
  mode: "'0'",
})
