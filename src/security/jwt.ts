import { sign, verify } from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config/tokens';

export function createToken(payload: object): string {
    const token = sign(
        payload,
        PRIVATE_KEY,
        { 
            expiresIn: '1h'
        }
    );

    return token;
}

export function verifyToken(token: any): any {
    try {
        const payload = verify(token, PRIVATE_KEY);
        return payload;
    } catch(e) {
        return {};
    }
}