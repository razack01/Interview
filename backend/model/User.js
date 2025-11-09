import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImages: [{ type: String }], // multiple images stored as array
});

export default mongoose.model("User", userSchema);