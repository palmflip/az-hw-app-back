import * as express from 'express'
import * as http from 'http'

import { configureTerminus } from './configureTerminus'

const app = express()

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  require('dns').lookup(require('os').hostname(), function(err, add, fam) {
    res.send({ data: `(updated at ${process.env.LAST_RESTART}) My IP address is:, ` + add })
  })
})

app.get('/something', (req, res) => {
  res.send('something else')
})

const server = http.createServer(app)

configureTerminus(server, {
  delayBeforeShutdown: process.env.BEFORE_SHUTDOWN_DELAY
    ? Number(process.env.BEFORE_SHUTDOWN_DELAY)
    : undefined,
})

server.listen(5000, () => {
  console.log(`Server started on port 5000, PID: ${process.pid} `)
})
