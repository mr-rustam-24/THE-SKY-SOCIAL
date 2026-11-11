
import db from '../db.js';

const OTP_EXPIRY_MINUTES = Number(process.env.OTP_EXPIRY_MINUTES || 10);

export async function generateAndSaveOtp(phone) {
  await db.read();


  db.data.otps = db.data.otps.filter((o) => o.phone !== phone);


  const otpCode = String(Math.floor(1000 + Math.random() * 9000));
  
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000).toISOString();
  const id = Date.now();


  db.data.otps.push({
    id,
    phone,
    otp_code: otpCode,
    expires_at: expiresAt,
    used: false
  });
  await db.write();


  console.log(`📱 [DEMO OTP] Phone: ${phone} | OTP: ${otpCode}`);

  return otpCode;
}

//  Yaha pe OTP verify 
export async function verifyOtp(phone, otpCode) {
  await db.read();

 
  const record = db.data.otps
    .filter((o) => o.phone === phone && o.otp_code === String(otpCode) && !o.used)
    .sort((a, b) => b.id - a.id)[0];

  if (!record) {
    return { valid: false, reason: 'Invalid OTP. Please check and try again.' };
  }

  
  if (new Date(record.expires_at) < new Date()) {
    return { valid: false, reason: 'Your OTP has expired. Please request a new OTP.' };
  }

 
  record.used = true;
  await db.write();

  return { valid: true };
}