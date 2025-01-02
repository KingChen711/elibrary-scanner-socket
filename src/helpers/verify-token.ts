import jwt, { JwtPayload } from 'jsonwebtoken'

export interface DecodedToken extends JwtPayload {
  email: string // Adjust based on your token payload
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as DecodedToken
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}
