import bcrypt from "bcryptjs";
import User from "../model/User.js"; // Mongoose model


// REGISTER USER  WITH FILE UPLOAD
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Please choose a different email.",
      });
    }

    // ✅ Store all uploaded file names
    const uploadedFiles = req.files?.map((file) => file.filename) || [];

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      profileImages: uploadedFiles,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImages: newUser.profileImages,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};