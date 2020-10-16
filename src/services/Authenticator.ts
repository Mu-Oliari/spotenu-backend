import * as jwt from 'jsonwebtoken';
import { USER_TYPE } from '../model/UserModel';

export class Authenticator {
    private static EXPIRES_IN = "24h"; 
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            { 
                id: input.id,
                type: input.type
            },
            process.env.JWT_KEY as string,  
            { 
                expiresIn: Authenticator.EXPIRES_IN 
            }
        );
        return token;
    };

    public getData(token: string): AuthenticationData{
        const payload = jwt.verify(token, process.env.JWT_KEY as string ) as any;
        const result: AuthenticationData = 
        { 
            id: payload.id,
            type: payload.type
        };

        return result;
    };
};

interface AuthenticationData{
    id: string
    type: USER_TYPE
};