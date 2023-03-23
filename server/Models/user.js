import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

export default User;