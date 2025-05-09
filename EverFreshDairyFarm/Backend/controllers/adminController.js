import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Admin Register (Only for initial setup - should be protected)
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(409).json({ 
        success: false, 
        message: "Admin already exists." 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new Admin({ name, email, password: hashedPassword });
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({ 
      success: true, 
      message: "Admin created successfully",
      token 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: "Email and password are required" 
    });
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const adminDetails = {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      token,
    };

    return res.status(200).json({ 
      success: true, 
      admin: adminDetails 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Admin Data
export const getAdminData = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");

    if (!admin) {
      return res.status(404).json({ 
        success: false, 
        message: "Admin not found" 
      });
    }

    return res.status(200).json({ success: true, admin });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin Auth Middleware
export const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token") || req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "No token, authorization denied" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return res.status(401).json({ 
        success: false, 
        message: "Admin privileges required" 
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: "Token is not valid" 
    });
  }
};