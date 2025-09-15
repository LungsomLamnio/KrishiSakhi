const jwt = require("jsonwebtoken");
const axios = require("axios");

const otpStore = {}; // For demo; use DB or cache for production

// Generate 6-digit OTP (optional if you use MSG91 auto-generated OTP)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP controller using MSG91 API
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    console.error("sendOtp error: Phone number missing in request body");
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    // You can omit generateOTP() if you want MSG91 to generate OTP automatically via templates
    // Below demonstrates sending OTP via MSG91 API (auto-generated OTP method)

    const response = await axios.post(
      "https://api.msg91.com/api/v5/otp",
      {
        template_id: process.env.MSG91_TEMPLATE_ID, // Your approved template ID in MSG91 dashboard
        mobile: phone,
      },
      {
        headers: {
          authkey: process.env.MSG91_API_KEY, // Your MSG91 token from dashboard
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`OTP request sent successfully to ${phone}`, response.data);
    return res.json({
      success: true,
      message: "OTP sent",
      response: response.data,
    });
  } catch (error) {
    if (error.response) {
      console.error("MSG91 API error response:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      console.error("MSG91 no response error:", error.request);
    } else {
      console.error("MSG91 error:", error.message);
    }
    return res
      .status(500)
      .json({ error: "Failed to send OTP", detail: error.message });
  }
};

// Verify OTP controller
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ error: "Phone and OTP are required" });

  try {
    // Verify OTP via MSG91 API
    const response = await axios.post(
      "https://api.msg91.com/api/v5/otp/verify",
      {
        mobile: phone,
        otp: otp,
      },
      {
        headers: {
          authkey: process.env.MSG91_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.type === "success") {
      // OTP is valid
      const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token });
    } else {
      // Verification failed
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    if (error.response) {
      console.error("MSG91 API error response:", error.response.data);
    } else if (error.request) {
      console.error("MSG91 no response error:", error.request);
    } else {
      console.error("MSG91 error:", error.message);
    }
    return res
      .status(500)
      .json({ error: "Failed to verify OTP", detail: error.message });
  }
};
