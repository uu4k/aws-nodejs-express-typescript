import * as express from 'express'
import serverless from 'serverless-http'
import Router from 'express-promise-router'

const app = express()
const router = Router()

import * as aws from 'aws-sdk'

const getDynamoClient = (ip: string): aws.DynamoDB.DocumentClient => {
  let dynamodb = null
  if (ip === '127.0.0.1' || ip === 'localhost') {
    dynamodb = new aws.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  } else {
    dynamodb = new aws.DynamoDB.DocumentClient()
  }
  return dynamodb
}

router.get('/', (_req: express.Request, res: express.Response) => {
  res.json({ message: 'Hello World!' })
})

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const dynamodb = getDynamoClient(req.ip)
  const params: aws.DynamoDB.DocumentClient.GetItemInput = {
    TableName: process.env.STAGE + 'hello',
    Key: {
      id: req.params.id
    }
  }
  const result: AWS.DynamoDB.GetItemOutput = await dynamodb
    .get(params)
    .promise()

  res.json({ hello: result.Item })
})

app.use('/', router)

export const main = serverless(app)
