import { injectable } from 'inversify'
import { Socket } from 'socket.io'
import { io } from 'src'

import { verifyToken } from 'src/helpers/verify-token'

@injectable()
export class AuthSocketService {
  constructor() {}

  public authenticate(socket: Socket) {
    return (token: string) => {
      const decoded = verifyToken(token)
      if (!decoded) {
        return
      }

      console.log('Authenticated user:', decoded.email)
      socket.join(decoded.email)
      io.to(decoded.email).emit('authenticated')
    }
  }
}
