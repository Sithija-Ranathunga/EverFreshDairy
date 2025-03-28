import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/InventoryUser.js';

//register
export const register = async (req,res) =>{
    const {name, email, password, workExperience, NIC } = req.body;

    if(!name || !email || !password || !workExperience || !NIC){
        return res.status(400).json({success: false, message: 'Missing Details'})
    }

    try{
         const existingUser = await userModel.findOne({email})

         if(existingUser){
            return res.status(409).json({success:false, message: "User alreeady exists."})
         }
    

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new userModel({name, email, password:hashedPassword, workExperience, NIC});
    await user.save();

    

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

       /* res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });*/

        const userDetails ={
      id:user._id,
      name:user.name,
      email:user.email,
      NIC: user.NIC,
      workExperience:user.workExperience,
      token

        }

        return res.status(200).json({success:true,userDetails});

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
export const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findOne({_id:req.user.id});

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json(user);

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

  } catch {
    res.status(500).json({ success:false});
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

//Check if user is authenticated

export const isAuthenicated = async(req,res)=>{
    try{
         return res.json({ success: true});
    }catch(error){
        res.json({success: false, message: error.message})
    }
}

// Get logged-in user's profile
export const getUserProfile = async (req, res) => {
    try {
      const user = await userModel.findById(req.body.userId).select("-password"); // Exclude password
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.status(200).json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export const isAuthenticated = async(req,res)=>{
    try{
      return res.json({success:true});
    }catch(error){
        res.json({success:false,message:error.message})
    }

}
