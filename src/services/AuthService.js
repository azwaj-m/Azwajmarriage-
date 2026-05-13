// ⚡ الٹرا لو ریم آتھ سروس اسمارٹ لوکل ڈیمو انجن

export const AuthService = {
  // فون اور پاس ورڈ سے لاگ ان کا لوکل فال بیک
  loginWithPhoneAndPassword: async (phoneNumber, password) => {
    console.log("🔒 Local Auth: Login attempt with", phoneNumber);
    
    // سیکنڈ کا فرضی ڈیلے تاکہ لوڈنگ اینیمیشن نظر آئے
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ڈیمو لاگ ان کے لیے کوئی بھی نمبر اور پاس ورڈ قبول کر لے گا
    return {
      uid: 'u101',
      displayName: 'شاہ زیب خان',
      phoneNumber: phoneNumber,
      email: 'user@azwaj.com',
      premiumStatus: true,
      city: 'Karachi',
      age: 28
    };
  },

  // چیک کرنا کہ نمبر پہلے سے موجود ہے یا نہیں
  checkIfPhoneExists: async (phoneNumber) => {
    // رجسٹریشن ٹیسٹ کرنے کے لیے ہم فرض کرتے ہیں کہ نمبر نیا ہے
    return false;
  },

  // فرضی او ٹی پی بھیجنا
  sendOTP: async (phoneNumber) => {
    console.log("📩 Local Auth: OTP Sent to", phoneNumber);
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  },

  // فرضی او ٹی پی کی تصدیق کرنا
  verifyOTP: async (otpCode) => {
    console.log("🔑 Local Auth: Verifying OTP", otpCode);
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      uid: 'u102',
      phoneNumber: '+923001234567'
    };
  },

  // فائر اسٹور میں فرضی ڈیٹا سیو کرنا
  saveUserToFirestore: async (user, additionalData) => {
    return {
      ...user,
      displayName: additionalData.displayName || 'نیا صارف',
      premiumStatus: true
    };
  },

  // گوگل لاگ ان کا فرضی فال بیک
  loginWithGoogle: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      uid: 'google_u103',
      displayName: 'گوگل صارف',
      email: 'google.user@gmail.com',
      premiumStatus: true
    };
  },

  // ریکیپچا کا فرضی سیٹ اپ تاکہ کریش نہ ہو
  setupRecaptcha: (containerId) => {
    console.log("🤖 Recaptcha Container Initialized Mode:", containerId);
    return true;
  },

  // صارف کا ڈیٹا اپ ڈیٹ کرنا
  updateUserProfile: async (uid, updatedData) => {
    console.log("🔒 Local Service: Updating profile for", uid, updatedData);
    return {
      success: true,
      message: "Profile updated successfully locally",
      data: updatedData
    };
  },

  // لاگ ان اسٹیٹ چیک کرنے کا فال بیک
  getCurrentUser: () => {
    return {
      uid: 'u101',
      displayName: 'شاہ زیب خان',
      email: 'user@azwaj.com',
      premiumStatus: true
    };
  }
};

// دونوں طریقوں سے ایکسپورٹ کر رہے ہیں تاکہ کسی بھی امپورٹ اسٹائل میں ایرر نہ آئے
export const updateUserProfile = AuthService.updateUserProfile;
export const getCurrentUser = AuthService.getCurrentUser;

export default AuthService;
