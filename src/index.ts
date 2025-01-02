import 'dotenv/config'

import 'reflect-metadata'

import 'express-async-errors'

import corsMiddleware from './middleware/cors.middleware'
import errorHandlingMiddleware from './middleware/error-handling.middleware'
import multerErrorHandlingMiddleware from './middleware/multer-error-handling.middleware'
import { SocketController } from './modules/socket/socket.controller'
import bodyParser from 'body-parser'
import express from 'express'
import helmet from 'helmet'
import http from 'http'
import morgan from 'morgan'
import { Server, Socket } from 'socket.io'

import { container } from './config/inversify.config'

import NotFoundException from './helpers/errors/not-found.exception'
import { ok } from './helpers/utils'

//!Just for development
const DELAY = 0

const app = express()

app.use((_req, _res, next) => {
  setTimeout(next, DELAY)
})

app.use(helmet())
app.use(morgan('dev'))
app.use(express.static('public'))

app.use(bodyParser.json())
app.use(corsMiddleware)

// app.use('/api/users', userRoute)

app.get('/', (req, res) => {
  return ok(res, { message: 'hello world' })
})

app.all('*', () => {
  throw new NotFoundException()
})

app.use(multerErrorHandlingMiddleware)
app.use(errorHandlingMiddleware)

const server = http.createServer(app)
const PORT = process.env.PORT || 6000

export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const bootstrap = async () => {
  server.listen(PORT, () => {
    const socketController = container.get(SocketController)
    io.on('connection', (socket: Socket) => socketController.handleConnection(socket))

    console.log(`Listening on port ${PORT}!!!`)
  })
}

bootstrap()
