import { Request, Response } from 'express'
const serverless = require('serverless-http')
const express = require('express')
const app = express()
const router = require('express-promise-router')()

router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

app.use('/', router)

module.exports.main = serverless(app)
