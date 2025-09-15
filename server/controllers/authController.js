const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

// Send OTP controller using Twilio Verify
exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    console.error("sendOtp error: Phone number missing in request body");
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const verification = await client.verify
      .services(verifyServiceSid)
      .verifications.create({ to: `+91${phone}`, channel: "sms" }); // Assuming Indian phone numbers

    if (verification.status === "pending") {
      console.log(`OTP sent successfully to ${phone}`);
      return res.json({ success: true, message: "OTP sent" });
    } else {
      console.error("Twilio OTP sending failed", verification);
      return res.status(500).json({ error: "Failed to send OTP" });
    }
  } catch (error) {
    console.error("Twilio API error:", error);
    return res
      .status(500)
      .json({ error: "Failed to send OTP", detail: error.message });
  }
};

// Verify OTP controller using Twilio Verify
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone and OTP are required" });
  }

  try {
    const verification_check = await client.verify
      .services(verifyServiceSid)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (verification_check.status === "approved") {
      // OTP verified, issue JWT token
      const token = jwt.sign({ phone }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Twilio API error during verification:", error);
    return res
      .status(500)
      .json({ error: "Failed to verify OTP", detail: error.message });
  }
};
