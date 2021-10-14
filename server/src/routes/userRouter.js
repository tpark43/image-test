import dotenv from 'dotenv';
import { Router } from 'express';
import { authenticate } from '../middlewares/authentication';
import { validateUser } from '../middlewares/validation';
import { UserService } from '../services/UserService';

dotenv.config();
export const userRouter = Router();

const userService = new UserService(process.env.JWT_SECRET);

userRouter.post('/register', validateUser, async (req, res, next) => {
    try {
        if(req.user) {
            return res.json({
                message: 'already registered!'
            })
        }
        const user = await userService.register(req.body);
        if(process.env.AUTH === 'jwt') {
            res.cookie('token', user.token);
        }
        res.json(user);
    } catch(err) {
        next(new Error(err));
    }
});

userRouter.patch('/login', validateUser, async (req, res, next) => {
    try {
        if(req.user) {
            return res.json({
                message: 'already logged in!'
            })
        }
        const user = await userService.login(req.body);
        if(process.env.AUTH === 'session') {
            return res.json({
                sessionId: user.sessions[user.sessions.length - 1]._id,
                name: user.name
            });
        }
        res.cookie('token', user.token);
        return res.json(user);
    } catch(err) {
        next(new Error(err));
    }
});

userRouter.patch('/logout', authenticate, async (req, res, next) => {
    try {
        if(!req.user) {
            throw new Error('Invalid sessionId');
        }
        if(process.env.AUTH === 'session') {
            await userService.logout(req.user, req.headers.sessionid); // header provides only small letters, SessionID => sessionid
        } else {
            res.cookie.token = undefined;
        }
        res.json({
            message: 'logout'
        });
    } catch(err) {
        next(new Error(err));
    }
});