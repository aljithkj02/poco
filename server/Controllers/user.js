import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Models/user.js';

const generateAccessToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_CLIENT_SECRET, { expiresIn: "12h" });
    return token;
}
const generateRefreshToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_CLIENT_SECRET, { expiresIn: "7d" });
    return token;
}

export const signupHandler = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: 'User with this email already exist!'
            })
        }
        if (!email.includes('@') || !email.includes('.com')) {
            return res.status(404).json({
                status: false,
                message: 'Email is not valid!'
            })
        }
        if (password.includes(' ')) {
            return res.status(404).json({
                status: false,
                message: 'User password should not contains empty space!!'
            })
        }
        if (password.length < 6) {
            return res.status(404).json({
                status: false,
                message: 'User password should be atleast 6 characters!!'
            })
        }

        const hash = bcrypt.hashSync(password, 10);
        const user = await User.create({ name, email, password: hash });
        const userObj = {
            _id: user._id,
            email: user._email
        }
        const token = generateAccessToken(userObj);
        const refreshToken = generateRefreshToken(userObj);
        res.status(200).json({
            status: true,
            token,
            refreshToken,
            message: 'Successfuly signedup'
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User doesn't exist!"
            })
        }

        if (!bcrypt.compareSync(password, existingUser.password)) {
            return res.status(401).json({
                status: false,
                message: "Incorrect password!"
            })
        }
        const userObj = {
            _id: existingUser._id,
            email: existingUser.email
        }
        const token = generateAccessToken(userObj);
        const refreshToken = generateRefreshToken(userObj);
        res.status(200).json({
            status: true,
            token,
            refreshToken,
            message: 'Successfuly loggedin!'
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const refreshTokenHandler = async (req, res) => {
    try {
        const authorization = req.headers.authorization;
        const refreshToken = authorization && authorization.split(' ').pop();
        if (!refreshToken) {
            return res.status(401).json({
                status: false,
                message: 'No refresh token provided'
            })
        }
        jwt.verify(refreshToken, process.env.JWT_CLIENT_SECRET, (err, data) => {
            if (err) return res.status(401).json({
                statue: false,
                message: err.message
            })
            const user = User.findOne({ _id: data._id });
            if (!user) {
                return res.status(401).json({
                    status: false,
                    message: 'Invalid refresh token'
                })
            }

            const userObj = {
                _id: user._id,
                email: user.email
            }

            const token = generateAccessToken(userObj);
            res.status(200).json({
                status: true,
                token,
                message: 'Successfuly generated new token!'
            })

        })
    } catch (err) {
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}