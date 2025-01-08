import { Container } from 'inversify'
import { AuthSocketService } from 'src/modules/socket/auth-socket.service'
import { ScannerService } from 'src/modules/socket/scanner.service'
import { SocketController } from 'src/modules/socket/socket.controller'

const container = new Container()

container.bind(SocketController).toSelf().inRequestScope()
container.bind(AuthSocketService).toSelf().inRequestScope()
container.bind(ScannerService).toSelf().inRequestScope()

export { container }
