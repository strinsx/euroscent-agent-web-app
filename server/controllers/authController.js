

import User from '../models/userSchema.js';



export const registerUser = async(req, res)=> {
    try {
        const user = await User.create(req.body)
        res.status(200).json({message: "Successful!"})
    } catch (error) {
       res.status(500).json({message: error}) 
    }
}

export const loginUser = async(req, res)=> {
    res.json({message: 'Login Sucessfully!'})
}

