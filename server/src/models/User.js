import { model, Schema } from 'mongoose';
import { hash, genSalt, compare } from 'bcryptjs';

const userSchema = new Schema({
    name: { type: String, required: [true, 'required'], minlength: 4 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    sessions: [
        {
            createdAt: {type: Date}
        }
    ]
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = (password, hashedPassword) => {
    return compare(password, hashedPassword);
}

export const User = model('user', userSchema);