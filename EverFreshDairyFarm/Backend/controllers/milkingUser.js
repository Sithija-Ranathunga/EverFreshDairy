import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import userModel from '../models/MilkingUser.js';

//rejister
export const register = async (req,res) => {
    const {name, email, password } = req.body;

    if(!name ||  !email || !password ){
        return res.status(400).json ({success: false, message: 'Missing Details'})
    }

    try{
        const existingUser = await userModel.findOne({email})
        
        if(existingUser){
            return res.status(409).json ({success: false, message: 'User already exists. '})
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

    return res.status(201).json({success:true, message: "Register is succefull"});

    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
       
}

//login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email' });
        }

        const isMatch = bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ success: true, message: 'Login successful' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Get user data
export const getUserData = async (req, res) => {
    try {
        const users = await userModel.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true,user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//get by id
export const getbyIdUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
  
      if (!user) {
        return res.status(404).json({success:false, message: "User not found" });
      }
      res.status(200).json({success:true,user});
  
    } catch (error) {
      res.status(500).json({ success:false,message: error.message });
    }
  };

  //update user data
export const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, req.body);
  
      if (!user) {
        res.status(404).json({ success:false,message: "User Not Update" });
      }
  
      const Updateuser = await userModel.findById(id);
      res.status(200).json({success:true,Updateuser});
  
    } catch {
      res.status(500).json({ success:false,message: error.message });
    }
  };

