import jwt from 'jsonwebtoken';

// const JWTSecret = 'HH22@77&JHSJHHS09.K-,HHJDSD+SD'

interface TokenPayload {
  userId: string;
  email: string;
}

export class TokenService {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.secret) as TokenPayload;
  }
}