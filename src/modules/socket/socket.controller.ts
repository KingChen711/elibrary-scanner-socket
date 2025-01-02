import { AuthSocketService } from './auth-socket.service'
import { ScannerService } from './scanner.service'
import { inject, injectable } from 'inversify'
import { Socket } from 'socket.io'

@injectable()
export class SocketController {
  constructor(
    @inject(AuthSocketService) private readonly authSocketService: AuthSocketService,
    @inject(ScannerService) private readonly scannerService: ScannerService
  ) {}

  public handleConnection(socket: Socket) {
    console.log('A user connected')

    socket.on('message', (message: string) => console.log('message: ', message))

    socket.on('authenticate', () => this.authSocketService.authenticate(socket))

    socket.on('isbn-scanned', this.scannerService.isbnScanned)
  }
}
