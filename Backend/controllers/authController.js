const User = require('../models/User');

// Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare passwords directly (not secure for real apps)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Respond with user data
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginUser
};
