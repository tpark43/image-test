import { User } from '../models/User';
import Cryptr from 'cryptr'
import { verify } from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
    if(process.env.AUTH === 'session') {
        const { sessionid: sessionId } = req.headers;
        console.log({sessionId})
        if(!sessionId || !mongoose.isValidObjectId(sessionId)) {
            return next();
        }
        const user = await User.findOne({
            "sessions._id": sessionId
        });//.select('+password');
        
        if(!user) {
            return next();
        }
        req.user = user;
        return next();
    }
    const { authorization } = req.headers;
    console.log("cookie:", req.cookies);
    // const token = authorization.split(' ')[1];
    const { token } = req.cookies;

    if(!token) {
        return next();
    }
    try {
        const { id } = verify(new Cryptr(process.env.JWT_SECRET).decrypt(token), process.env.JWT_SECRET);
        const user = await User.findById(id);//.select('+password');
        if(!user) {
            return next();
        }
        req.user = user;    
    } catch(err) {
        return next(err);
    };
    return next();
};