import jwt from 'jsonwebtoken';

const generateToken = (userID: number) => {

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT_SECRET is not configured');
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    const token = jwt.sign(
        { userID },
        secret,
        {
            expiresIn: expiresIn as jwt.SignOptions['expiresIn']
        }
    );

    return token;
};



export default generateToken;
