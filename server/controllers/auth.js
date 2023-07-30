const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/* Register User */
export const register = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
    
    const salt= await bcrypt.genSalt();
    const passwordhash= await bcrypt.hash(password, salt);

    const newuser=new User({
        firstName,
            lastName,
            email,
            password:passwordhash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random()*10000),
            impressions:Math.floor(Math.random()*10000)

    });
    const savedUser=await newUser.save();
    res.status(201).json(savedUser);
}


    catch(err)
    {
        res.status(500).json({ message: err.message  })
    }
};

/* LOGIN */ 
export const login=async(req,res) => {
    try {
        const {email,password}=req.body;
        const User=await User.findOne({email:email});
        if (!user) return res.status(400).json({msg: "User does not exist"});
        
        const isMatch= await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

        const token=jwt.sign({id:user_id},process.env.JTW_SECRET);
        delete user.password;
        res.status(200).json({token,user});

    }

    catch (err) {
        {
            res.status(500).json({ message: err.message })
        }
    }
}