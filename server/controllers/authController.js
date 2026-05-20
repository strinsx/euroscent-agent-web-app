
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js';
import jwt from 'jsonwebtoken'



export const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const rounds = 10;

        const hashedPassword = await bcrypt.hash(password, rounds);

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            })
        }

        const user = await User.create({
            username,
            password: hashedPassword,
        })

        res.status(200).json({ message: "Successful!" })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) {
            res.status(404).json({ message: 'User Not Found!' })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid Credentials!' });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        )

        res.status(200).json({
            message: 'Login Successful!',
            token,
            user:{
                id: user._id,
                username: user.username
            }
        })
    } catch (error) {

        console.error(error);
        res.status(500).json({
            message: 'Server Error!',
        })


    }


}

