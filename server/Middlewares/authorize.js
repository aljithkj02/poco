import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const authorize = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        const token = authorization && authorization.split(' ').pop();
        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Invalid authorization'
            })
        }
        jwt.verify(token, process.env.JWT_CLIENT_SECRET, (err, data) => {
            if (err) return res.status(401).json({
                statue: false,
                message: err.message
            })
            const user = User.findOne({ _id: data._id });
            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid token'
                })
            }
            req.user = user;
            next();
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export default authorize;