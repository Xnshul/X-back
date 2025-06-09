import * as JWT from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export class JWTService {
  static generateTokenUser(userId: string): string {
    return JWT.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
  }

  static verifyToken(token: string): any {
    try {
      return JWT.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
