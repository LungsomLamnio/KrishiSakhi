export async function sendOtp(phone) {
  const response = await fetch("http://localhost:3000/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  const data = await response.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error || "Failed to send OTP");
  }
}

export async function verifyOtp(phone, otp) {
  const response = await fetch("http://localhost:3000/auth/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, otp }),
  });
  const data = await response.json();
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error || "Invalid OTP");
  }
}
