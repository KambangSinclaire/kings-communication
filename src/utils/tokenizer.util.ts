import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export class Tokenizer {

    // static signToken({ user_id, role_id, school_id, year_id, secret, }) {
    //     return jwt.sign(
    //         {
    //             user_id,
    //             role_id,
    //             school_id,
    //             year_id
    //         },
    //         secret,
    //         {
    //             expiresIn: '30mins'
    //         });
    // }

    static verifyToken({ token, secret }) {
        let decodedData: { user_id?: string, role_id?: string, school_id?: string, year_id?: string } = {};
        try {
            decodedData = jwt.verify(token, secret) as any;
            return { status: true, data: { ...decodedData } };
        } catch (error) {
            return {
                status: false,
                message: error?.message,
            };
        }
    }

    /*
    static signIdentity(data: { location: string | any, resource: string | any }) {
        const secret = process.env.APP_KEY ? process.env.APP_KEY : "apikey";
        return jwt.sign(
            {
                role: data.location,
                resource: data.resource
            },
            secret,
            {
                expiresIn: 'never'
            });
    }

    static verifyIdentity(token: string) {
        let decodedData = {};
        const secret = process.env.APP_KEY ? process.env.APP_KEY : "apikey";
        try {
            decodedData = jwt.verify(token, secret);
            return decodedData;
        } catch (error) {
            return error;
        }
    }

    static async hashString(value: string | any) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
    }

    static async compareHashedString(value: string | any, hashedValue: string | any) {
        return await bcrypt.compare(value, hashedValue);
    }

    static encode(payload: string) {
        return Buffer.from(payload).toString('base64');
    }

    */
}