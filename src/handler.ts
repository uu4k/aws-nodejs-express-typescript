const serverless = require('serverless-http')
const express = require('express')
const app = express()

app.get('/', function(_req, res) {
  res.json({ message: 'Hello World!' })
})

module.exports.main = serverless(app)
