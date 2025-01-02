import { injectable } from 'inversify'
import { io } from 'src'

import { verifyToken } from 'src/helpers/verify-token'

@injectable()
export class ScannerService {
  constructor() {}

  public async isbnScanned({ token, isbn }: { token: string; isbn: string }) {
    const decoded = verifyToken(token)
    if (!decoded) {
      return
    }

    io.to(decoded.email).emit('isbn-scanned', isbn)
  }
}
