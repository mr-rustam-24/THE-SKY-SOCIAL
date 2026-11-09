import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, Eye, EyeOff, CheckCircle2, ArrowRight, KeyRound, Smartphone, RefreshCw } from 'lucide-react';

// Authentication Modal (Phone OTP, Email/Password Login, and User Registration)
export function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  // Main Tab: 'login' or 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Login Method: 'otp' (Phone + OTP) or 'password' (Email/Phone + Password)
  const [loginMethod, setLoginMethod] = useState('otp');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Flow States
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEnteredOtp, setUserEnteredOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  // Status Alerts
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // 1. Send OTP to Phone Number
  function handleSendOtp(e) {
    if (e) e.preventDefault();
    setErrorMsg('');

    // Clean phone number (strip spaces/dashes)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Generate random 4-digit OTP
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    setUserEnteredOtp('');
    setResendTimer(30);
  }

  // Populate generated OTP code
  function handleAutoFillOtp() {
    setUserEnteredOtp(generatedOtp);
    setErrorMsg('');
  }

  // 2. Verify OTP & Log In
  function handleVerifyOtp(e) {
    e.preventDefault();
    setErrorMsg('');

    if (userEnteredOtp.trim() !== generatedOtp.trim()) {
      setErrorMsg('Invalid OTP. Please check the 4-digit code and try again.');
      return;
    }

    // Check if user already exists with this phone number
    const savedUsers = JSON.parse(localStorage.getItem('restaurant_users') || '[]');
    const existingUser = savedUsers.find((u) => u.phone === phone);

    const loggedInUser = existingUser || {
      name: `User ${phone.slice(-4)}`,
      phone: phone,
      email: `${phone.slice(-4)}@customer.com`
    };

    // Save session in localStorage
    localStorage.setItem('restaurant_active_user', JSON.stringify(loggedInUser));
    setSuccessMsg(`Welcome, ${loggedInUser.name}!`);

    setTimeout(() => {
      onAuthSuccess(loggedInUser);
      onClose();
      resetAll();
    }, 800);
  }

  // 3. Password Login
  function handlePasswordLogin(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter your email/phone and password.');
      return;
    }

    // Check saved users
    const savedUsers = JSON.parse(localStorage.getItem('restaurant_users') || '[]');
    const foundUser = savedUsers.find(
      (u) =>
        (u.email?.toLowerCase() === email.toLowerCase() || u.phone === email) &&
        u.password === password
    );

    let loggedInUser;
    if (foundUser) {
      loggedInUser = { name: foundUser.name, email: foundUser.email, phone: foundUser.phone };
    } else {
      // Default friendly guest login
      const displayName = email.includes('@')
        ? email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
        : `User ${email.slice(-4)}`;
      loggedInUser = { name: displayName, email: email, phone: '+91 98765 43210' };
    }

    localStorage.setItem('restaurant_active_user', JSON.stringify(loggedInUser));
    setSuccessMsg(`Welcome back, ${loggedInUser.name}!`);

    setTimeout(() => {
      onAuthSuccess(loggedInUser);
      onClose();
      resetAll();
    }, 800);
  }

  // 4. Sign Up (Create New Account)
  function handleSignUp(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    const newUser = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase() || `${cleanPhone}@customer.com`,
      password: password
    };

    // Save to registered users list
    const savedUsers = JSON.parse(localStorage.getItem('restaurant_users') || '[]');
    savedUsers.push(newUser);
    localStorage.setItem('restaurant_users', JSON.stringify(savedUsers));

    // Set active session
    const loggedInUser = { name: newUser.name, phone: newUser.phone, email: newUser.email };
    localStorage.setItem('restaurant_active_user', JSON.stringify(loggedInUser));

    setSuccessMsg(`Account created successfully! Welcome, ${newUser.name}!`);

    setTimeout(() => {
      onAuthSuccess(loggedInUser);
      onClose();
      resetAll();
    }, 900);
  }

  // Quick Demo credentials
  function handleFillDemo() {
    setEmail('aditya@example.com');
    setPassword('password123');
    setErrorMsg('');
  }

  function resetAll() {
    setName('');
    setPhone('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setOtpSent(false);
    setGeneratedOtp('');
    setUserEnteredOtp('');
    setErrorMsg('');
    setSuccessMsg('');
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl text-gray-900 my-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean, User-Friendly Header (No Skypiea Branding) */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900">
              {authMode === 'login' ? 'Welcome Back' : 'Create an Account'}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {authMode === 'login'
                ? 'Sign in to manage table reservations & orders'
                : 'Enter your details to create your account'}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login / Sign Up */}
        <div className="flex border-b border-gray-200 bg-white text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-center transition-all cursor-pointer ${
              authMode === 'login'
                ? 'text-amber-600 border-b-2 border-amber-600 font-extrabold bg-amber-50/30'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-3 text-center transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'text-amber-600 border-b-2 border-amber-600 font-extrabold bg-amber-50/30'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Main Body */}
        <div className="p-6">
          
          {/* Success Banner */}
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 1: LOGIN (Phone OTP or Password) */}
          {/* ============================================================ */}
          {authMode === 'login' && (
            <div className="space-y-4">
              
              {/* Login Method Toggle: Phone OTP vs Password */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setErrorMsg('');
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    loginMethod === 'otp'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Phone & OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setErrorMsg('');
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    loginMethod === 'password'
                      ? 'bg-white text-gray-900 shadow-2xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Password</span>
                </button>
              </div>

              {/* OPTION A: PHONE & OTP LOGIN */}
              {loginMethod === 'otp' && (
                <div>
                  {!otpSent ? (
                    // Step 1: Enter Phone Number
                    <form onSubmit={handleSendOtp} className="space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            placeholder="Enter 10-digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900 font-medium"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>Send OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-[11px] text-gray-400 text-center">
                        We'll generate a 4-digit verification code for instant login.
                      </p>
                    </form>
                  ) : (
                    // Step 2: Enter & Verify OTP
                    <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                      
                      {/* OTP Notification Banner with Auto-fill helper */}
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
                        <div>
                          <span className="font-bold block">Demo OTP: {generatedOtp}</span>
                          <span className="text-[11px] text-amber-700">Sent to +91 {phone}</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAutoFillOtp}
                          className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] rounded transition-colors cursor-pointer shadow-2xs"
                        >
                          Auto-Fill
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Enter 4-Digit OTP
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={4}
                          placeholder="••••"
                          value={userEnteredOtp}
                          onChange={(e) => setUserEnteredOtp(e.target.value)}
                          className="w-full text-center tracking-[0.5em] font-mono text-xl py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900 font-bold"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Verify & Sign In</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>

                      {/* Resend or Change Number */}
                      <div className="flex items-center justify-between text-xs pt-1 text-gray-500">
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="hover:text-amber-700 font-bold cursor-pointer"
                        >
                          ← Change Number
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSendOtp(null)}
                          className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend OTP</span>
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              )}

              {/* OPTION B: PASSWORD LOGIN */}
              {loginMethod === 'password' && (
                <form onSubmit={handlePasswordLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Email or Mobile Number
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        placeholder="name@example.com or phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={handleFillDemo}
                        className="text-[11px] font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
                      >
                        Fill Demo
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: SIGN UP (Create Account) */}
          {/* ============================================================ */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Create Password (min. 6 chars)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Bottom Switcher */}
          <div className="mt-5 pt-3.5 border-t border-gray-100 text-center text-xs text-gray-500">
            {authMode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setErrorMsg('');
                  }}
                  className="font-bold text-amber-700 hover:text-amber-900 cursor-pointer underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMsg('');
                  }}
                  className="font-bold text-amber-700 hover:text-amber-900 cursor-pointer underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
