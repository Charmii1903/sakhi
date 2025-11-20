import userModel from "../models/userModel.js";


// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.body.userId; 
//       const user = await userModel.findById(userId, '-password'); // Exclude password field

//       if (!user) {
//           return res.json({ success: false, message: 'User not found' });
//       }

//       res.json({ success: true, data: user });
//   } catch (error) {
//       console.log(error);
//       res.json({ success: false, message: error.message });
//   }
// };
export const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId, '-password');
    if (!user) return res.json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { userId, name, email, phone, address } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone, address },
      { new: true } // This ensures it returns updated data
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated", user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
