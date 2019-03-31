import * as express from 'express'
import serverless from 'serverless-http'
import Router from 'express-promise-router'

const app = express()
const router = Router()

router.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' })
})

app.use('/', router)

export const main = serverless(app)