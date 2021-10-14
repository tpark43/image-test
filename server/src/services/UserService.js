import Cryptr from 'cryptr'
import { sign } from 'jsonwebtoken';
import { User } from '../models/User';

export class UserService {
    
    constructor(key) {
        this.user = User;
        this.key = key;
        this.cryptr = new Cryptr(key);
    }

    generateToken({ id, name }) {
        const token = sign({
                id, name
            }, this.key, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
        return this.cryptr.encrypt(token);
    }

    async register(user) {
        if(process.env.AUTH === 'session') {
            user.sessions = [
                { createdAt: new Date() }
            ];
        } 
        user = await new this.user(user).save();
        if(process.env.AUTH === 'jwt') {
            return { token: this.generateToken({
                id: user._id,
                name: user.username
            })};
        }
        return user;
    }

    async login(user) {
        const dbUser = await this.user.findOne({
            username: user.username
        }).select('+password');
        if(!dbUser) {
            throw new Error('Invalid input');
        }
        const isAuth = await dbUser.matchPassword(user.password, dbUser.password);
        if(!isAuth) {
            throw new Error('Invalid input');
        }
        if(process.env.AUTH === 'session') {
            dbUser.sessions.push({
                createdAt: new Date()
            });
        }
        user = await dbUser.save();
        user.password = undefined;
        if(process.env.AUTH === 'jwt') {
            return { token: this.generateToken({
                id: user._id,
                name: user.username
            }) };
        }
        return user;
    }

    async logout(user, sessionId) {
        await this.user.updateOne({
            _id: user.id
        }, {
            $pull: {
                sessions: {
                    _id: sessionId
                }
            }
        });
    }
}