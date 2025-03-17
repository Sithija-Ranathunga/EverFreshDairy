import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/InventoryUser.js';

//register
export const register = async (req,res) =>{
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return res.json({success: false, message: 'Missing Details'})
    }

    try{
         const existingUser = await userModel.findOne({email})

         if(existingUser){
            return res.json({success:false, message: "User alreeady exists."})
         }
    

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new userModel({name, email, password:hashedPassword});
    await user.save();

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'});

    res.cookie('token',token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 *24 * 60 * 60 * 1000
    });

    return res.json({success:true, message: "Register is succefull"});

    }catch(error){
        return res.json({success:false, message:error.message})
    }
}

//login
export const login = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success: false, message: 'Email and password are required'})

    }

    try{

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: 'Invalid email'})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 *24 * 60 * 60 * 1000
        });

        return res.json({success: true});

    }catch(error){
        return res.json({success: false, message: error.message})
    }
}

//log out
export const logout = async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
           
        });

        return res.json({success: true, message: "Logged out"})
    }catch(error){
        return res.json({ success: false, message: error.message})
    }
}

//Get the use data
export const getUserData = async(req,res)=>{
    try{
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false, message: 'User is not found'})
        }

        res.json({
            success:true,
            userData:{
                name: user.name,
                email: user.email
            }
        })

    }catch(error){
        return res.json({success:false, message:error.message})
    }
}