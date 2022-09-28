import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:3001/passport');

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

export const UserModel = mongoose.model('User', userSchema);
