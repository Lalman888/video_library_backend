import  jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "BearerTokcen";
const EXPIRES_IN = process.env.EXPIRES_IN || "1d"; 

export function signJwt(payload: string | object | Buffer) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}