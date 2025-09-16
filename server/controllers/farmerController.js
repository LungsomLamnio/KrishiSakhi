const Farmer = require("../models/Farmer");

// POST /api/farmers/check-or-create
exports.checkOrCreateFarmer = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone required" });

  try {
    let farmer = await Farmer.findOne({ phone });
    if (farmer) {
      // User exists, just login
      return res.json({ message: "User exists", farmer });
    }
    // Create new farmer with phone only
    farmer = new Farmer({ phone });
    await farmer.save();
    return res.json({ message: "User created", farmer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
