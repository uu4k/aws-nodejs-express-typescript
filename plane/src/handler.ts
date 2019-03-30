import { Request, Response } from 'express'

const serverless = require('serverless-http')
const express = require('express')
const app = express()

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

module.exports.main = serverless(app)
