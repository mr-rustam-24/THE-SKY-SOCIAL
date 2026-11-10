

import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { generateAndSaveOtp, verifyOtp } from '../utils/otp.js';

export const AuthController = {

  async register(req, res) {
    try {
      const { name, phone, email = '', password } = req.body;

      if (!name || !name.trim()) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'Name is required.' } });
      }

      const cleanPhone = String(phone || '').replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'A valid 10-digit phone number is required.' } });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'Password must be at least 6 characters long.' } });
      }

      
      const existingUser = await UserModel.findByPhone(cleanPhone);
      if (existingUser) {
        return res.status(409).json({ data: null, error: { code: 'ALREADY_EXISTS', message: 'An account with this phone number already exists.' } });
      }

   
      const hashedPassword = await bcrypt.hash(password, 10);

     
      const newUser = await UserModel.create({
        name,
        phone: cleanPhone,
        email,
        password: hashedPassword
      });

   
      const token = generateToken({ id: newUser.id, phone: newUser.phone });
      const safeUser = { id: newUser.id, name: newUser.name, phone: newUser.phone, email: newUser.email };

      return res.status(201).json({ data: { user: safeUser, token }, error: null });
    } catch (error) {
      console.error('Register Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Registration failed. Please try again.' } });
    }
  },

 
  async login(req, res) {
    try {
      const { phone_or_email, password } = req.body;

      if (!phone_or_email || !password) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'Phone/Email and password are required.' } });
      }

      const user = await UserModel.findByEmailOrPhone(phone_or_email);
      if (!user) {
        return res.status(401).json({ data: null, error: { code: 'WRONG_CREDENTIALS', message: 'No account found with these details.' } });
      }

      if (!user.password) {
        return res.status(400).json({ data: null, error: { code: 'USE_OTP', message: 'This account was created via OTP. Please sign in with OTP.' } });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ data: null, error: { code: 'WRONG_CREDENTIALS', message: 'Incorrect password.' } });
      }

      const token = generateToken({ id: user.id, phone: user.phone });
      const safeUser = { id: user.id, name: user.name, phone: user.phone, email: user.email };

      return res.json({ data: { user: safeUser, token }, error: null });
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Login failed. Please try again.' } });
    }
  },

  async sendOtp(req, res) {
    try {
      const cleanPhone = String(req.body.phone || '').replace(/\D/g, '');

      if (cleanPhone.length < 10) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'A valid 10-digit phone number is required.' } });
      }

      const otpCode = await generateAndSaveOtp(cleanPhone);

      return res.json({
        data: { message: 'OTP sent successfully.', demo_otp: otpCode },
        error: null
      });
    } catch (error) {
      console.error('Send OTP Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Failed to send OTP.' } });
    }
  },

  async verifyOtp(req, res) {
    try {
      const cleanPhone = String(req.body.phone || '').replace(/\D/g, '');
      const { otp_code } = req.body;

      if (!cleanPhone || !otp_code) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_INPUT', message: 'Phone and OTP code are required.' } });
      }

      const result = await verifyOtp(cleanPhone, String(otp_code));
      if (!result.valid) {
        return res.status(400).json({ data: null, error: { code: 'INVALID_OTP', message: result.reason } });
      }

    
      let user = await UserModel.findByPhone(cleanPhone);
      if (!user) {
        user = await UserModel.create({
          name: `Guest ${cleanPhone.slice(-4)}`,
          phone: cleanPhone
        });
      }

      const token = generateToken({ id: user.id, phone: user.phone });
      const safeUser = { id: user.id, name: user.name, phone: user.phone, email: user.email };

      return res.json({ data: { user: safeUser, token }, error: null });
    } catch (error) {
      console.error('Verify OTP Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'OTP verification failed.' } });
    }
  },


  async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ data: null, error: { code: 'NOT_FOUND', message: 'User not found.' } });
      }

      return res.json({
        data: { id: user.id, name: user.name, phone: user.phone, email: user.email, created_at: user.created_at },
        error: null
      });
    } catch (error) {
      console.error('Get Profile Error:', error);
      return res.status(500).json({ data: null, error: { code: 'SERVER_ERROR', message: 'Could not fetch profile.' } });
    }
  }
};