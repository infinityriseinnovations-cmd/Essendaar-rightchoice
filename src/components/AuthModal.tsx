import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  KeyRound, 
  RefreshCw,
  AlertCircle,
  Check
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    openAuthModal,
    loginCustomer,
    registerCustomer,
    sendEmailOtp,
    verifyEmailOtp,
    loginAdmin,
    setCurrentRoute
  } = useStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'admin'>(authModalTab);
  
  // Login states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [loginOtpSent, setLoginOtpSent] = useState(false);
  const [loginOtpCode, setLoginOtpCode] = useState(['', '', '', '', '', '']);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Register states
  const [regStep, setRegStep] = useState<'form' | 'otp'>('form');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regBuyerType, setRegBuyerType] = useState<'retail' | 'business'>('retail');
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regGstin, setRegGstin] = useState('');
  const [regOtpCode, setRegOtpCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [generatedDemoOtp, setGeneratedDemoOtp] = useState('123456');
  const [regError, setRegError] = useState<string | null>(null);
  const [regSuccess, setRegSuccess] = useState<string | null>(null);

  // Admin login states
  const [adminEmail, setAdminEmail] = useState('info@rightchoiceindia.com');
  const [adminPin, setAdminPin] = useState('');
  const [adminError, setAdminError] = useState<string | null>(null);

  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setActiveTab(authModalTab);
    setLoginError(null);
    setLoginSuccess(null);
    setRegError(null);
    setRegSuccess(null);
    setAdminError(null);
  }, [authModalTab, isAuthModalOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if ((regStep === 'otp' || loginOtpSent) && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [regStep, loginOtpSent, resendTimer]);

  if (!isAuthModalOpen) return null;

  // Handle Customer Login
  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (loginMethod === 'otp' && !loginOtpSent) {
      if (!loginIdentifier) {
        setLoginError('Please enter your email or phone number.');
        return;
      }
      const res = sendEmailOtp(loginIdentifier);
      setGeneratedDemoOtp(res.otp);
      setLoginOtpSent(true);
      setResendTimer(30);
      return;
    }

    if (loginMethod === 'otp' && loginOtpSent) {
      const enteredOtp = loginOtpCode.join('');
      if (enteredOtp.length < 6) {
        setLoginError('Please enter the complete 6-digit OTP.');
        return;
      }
      const verifyRes = verifyEmailOtp(loginIdentifier, enteredOtp);
      if (!verifyRes.success) {
        setLoginError(verifyRes.message);
        return;
      }
    }

    const res = loginCustomer(loginIdentifier, loginPassword);
    if (res.success) {
      setLoginSuccess(res.message);
      setTimeout(() => {
        closeAuthModal();
        setCurrentRoute('customer-dashboard');
      }, 700);
    } else {
      setLoginError(res.message);
    }
  };

  // Quick Demo Customer Login
  const handleQuickDemoCustomer = (email: string) => {
    const res = loginCustomer(email);
    if (res.success) {
      setLoginSuccess(res.message);
      setTimeout(() => {
        closeAuthModal();
        setCurrentRoute('customer-dashboard');
      }, 600);
    }
  };

  // Handle Step 1 of Customer Register (Send OTP)
  const handleStartRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim()) {
      setRegError('Please provide your Full Name, Email Address, and Phone Number.');
      return;
    }

    // Basic email format check
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setRegError('Please provide a valid email address.');
      return;
    }

    const res = sendEmailOtp(regEmail);
    setGeneratedDemoOtp(res.otp);
    setRegStep('otp');
    setResendTimer(30);
    setRegOtpCode(['', '', '', '', '', '']);
  };

  // Handle Step 2 of Customer Register (Verify OTP & Create Account)
  const handleVerifyRegisterOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    const enteredOtp = regOtpCode.join('');
    if (enteredOtp.length < 6) {
      setRegError('Please enter the 6-digit verification code.');
      return;
    }

    const verifyRes = verifyEmailOtp(regEmail, enteredOtp);
    if (!verifyRes.success) {
      setRegError(verifyRes.message);
      return;
    }

    const registerRes = registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone.startsWith('+91') ? regPhone : `+91 ${regPhone}`,
      buyerType: regBuyerType,
      companyName: regBuyerType === 'business' ? regCompanyName : undefined,
      gstin: regBuyerType === 'business' ? regGstin : undefined
    });

    if (registerRes.success) {
      setRegSuccess(registerRes.message);
      setTimeout(() => {
        closeAuthModal();
        setCurrentRoute('customer-dashboard');
      }, 800);
    } else {
      setRegError(registerRes.message);
    }
  };

  // Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);

    const res = loginAdmin(adminEmail, adminPin);
    if (res.success) {
      closeAuthModal();
      setCurrentRoute('admin');
    } else {
      setAdminError(res.message);
    }
  };

  const handleDemoAdmin = () => {
    loginAdmin('info@rightchoiceindia.com', 'Cc6100358');
    closeAuthModal();
    setCurrentRoute('admin');
  };

  // OTP Box Key Handling
  const handleOtpChange = (index: number, value: string, isRegister = true) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const codeArr = isRegister ? [...regOtpCode] : [...loginOtpCode];
    codeArr[index] = digit;

    if (isRegister) {
      setRegOtpCode(codeArr);
    } else {
      setLoginOtpCode(codeArr);
    }

    // Move to next input if digit typed
    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent, isRegister = true) => {
    const codeArr = isRegister ? regOtpCode : loginOtpCode;
    if (e.key === 'Backspace' && !codeArr[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleAutoFillOtp = (isRegister = true) => {
    const digits = '123456'.split('');
    if (isRegister) {
      setRegOtpCode(digits);
    } else {
      setLoginOtpCode(digits);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Header Bar */}
        <div className="bg-[#0A2540] text-white p-5 flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-900/60 border border-sky-700/60 flex items-center justify-center text-secondary-fixed">
              {activeTab === 'admin' ? <Lock className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-base font-headline font-bold">
                {activeTab === 'admin' ? 'Essendaar Admin Portal' : activeTab === 'register' ? 'Create Customer Account' : 'Customer Sign In'}
              </h2>
              <p className="text-xs text-slate-300">
                {activeTab === 'admin' 
                  ? 'Operations & Mangadu Plant Dispatch Gateway'
                  : 'Track orders, invoices & claim 18% GST input credit'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setLoginError(null);
            }}
            className={`flex-1 py-3 px-2 text-center transition-colors cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#00355f] border-b-2 border-[#00355f]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setRegStep('form');
              setRegError(null);
            }}
            className={`flex-1 py-3 px-2 text-center transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#00355f] border-b-2 border-[#00355f]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register with OTP
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setAdminError(null);
            }}
            className={`flex-1 py-3 px-2 text-center transition-colors cursor-pointer flex items-center justify-center gap-1 ${
              activeTab === 'admin'
                ? 'bg-white text-rose-700 border-b-2 border-rose-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>⚙️ Admin</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* ========================================================== */}
          {/* TAB 1: CUSTOMER LOGIN */}
          {/* ========================================================== */}
          {activeTab === 'login' && (
            <div className="space-y-4 animate-in fade-in">
              
              {loginSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{loginSuccess}</span>
                </div>
              )}

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Login Method Toggle: Password vs OTP */}
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('password');
                    setLoginOtpSent(false);
                    setLoginError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all ${
                    loginMethod === 'password' ? 'bg-white text-[#00355f] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginMethod('otp');
                    setLoginError(null);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-center font-bold transition-all flex items-center justify-center gap-1 ${
                    loginMethod === 'otp' ? 'bg-white text-[#00355f] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Email OTP Login</span>
                </button>
              </div>

              <form onSubmit={handleCustomerLogin} className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address or Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. finance@svsschool.edu.in or 98400 24561"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs font-medium"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                {loginMethod === 'password' && (
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] text-xs"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                )}

                {loginMethod === 'otp' && loginOtpSent && (
                  <div className="space-y-2 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 animate-in fade-in">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#00355f]">Enter 6-Digit Email OTP</span>
                      <span className="text-[11px] text-slate-500">Demo Code: {generatedDemoOtp}</span>
                    </div>

                    <div className="flex gap-2 justify-center py-1">
                      {loginOtpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputsRef.current[idx] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value, false)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e, false)}
                          className="w-10 h-11 text-center text-base font-black rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#00355f]"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAutoFillOtp(false)}
                        className="text-[#00355f] font-bold hover:underline"
                      >
                        Auto-fill Code (123456)
                      </button>

                      {resendTimer > 0 ? (
                        <span>Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            sendEmailOtp(loginIdentifier);
                            setResendTimer(30);
                          }}
                          className="text-[#00355f] font-bold hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend OTP</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#00355f] hover:bg-[#0f4c81] text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <span>
                    {loginMethod === 'otp' && !loginOtpSent ? 'Send Email OTP' : 'Sign In to My Account'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Demo Customer Sign-In Buttons */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  ⚡ 1-Click Demo Accounts (Instant Test)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoCustomer('finance@svsschool.edu.in')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#00355f] hover:bg-[#eff4ff] text-left transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-[#00355f] shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-slate-800 block truncate">Siva Kumar (B2B School)</span>
                      <span className="text-[10px] text-slate-500 truncate">SVS Matriculation School</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoCustomer('vijay.k@gmail.com')}
                    className="p-2.5 rounded-xl border border-slate-200 hover:border-[#00355f] hover:bg-[#eff4ff] text-left transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-[#006e2d] shrink-0" />
                    <div className="truncate">
                      <span className="font-bold text-slate-800 block truncate">Vijayaraghavan K</span>
                      <span className="text-[10px] text-slate-500 truncate">Retail Home Customer</span>
                    </div>
                  </button>
                </div>
              </div>

              <p className="text-center text-slate-500 text-[11px]">
                New customer?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('register');
                    setRegStep('form');
                  }}
                  className="text-[#00355f] font-bold hover:underline"
                >
                  Create an account with Email OTP
                </button>
              </p>

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: CUSTOMER REGISTER WITH EMAIL OTP VALIDATION */}
          {/* ========================================================== */}
          {activeTab === 'register' && (
            <div className="space-y-4 animate-in fade-in">
              
              {regSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{regSuccess}</span>
                </div>
              )}

              {regError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{regError}</span>
                </div>
              )}

              {regStep === 'form' ? (
                <form onSubmit={handleStartRegister} className="space-y-3.5">
                  
                  {/* Account Type Choice */}
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1.5">
                      Account Type *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setRegBuyerType('retail')}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          regBuyerType === 'retail'
                            ? 'border-[#00355f] bg-[#eff4ff] ring-1 ring-[#00355f]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <User className="w-4 h-4 text-[#00355f]" />
                        <span className="font-bold text-slate-800 text-xs">Retail / Personal</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRegBuyerType('business')}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          regBuyerType === 'business'
                            ? 'border-[#00355f] bg-[#eff4ff] ring-1 ring-[#00355f]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <Building2 className="w-4 h-4 text-[#00355f]" />
                        <span className="font-bold text-slate-800 text-xs">B2B / School / GST</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senthil Kumar"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Email Address (For OTP) *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="e.g. senthil@gmail.com"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                        />
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="98400 12345"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>

                  {regBuyerType === 'business' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-in fade-in">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Company / School Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ABC Matriculation School"
                          value={regCompanyName}
                          onChange={(e) => setRegCompanyName(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f]"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          GSTIN (15 Digits)
                        </label>
                        <input
                          type="text"
                          placeholder="33AABCT9821F1ZX"
                          value={regGstin}
                          onChange={(e) => setRegGstin(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#00355f] uppercase font-mono"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Proceed &amp; Send Email Verification OTP</span>
                  </button>

                  <p className="text-center text-slate-500 text-[11px]">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-[#00355f] font-bold hover:underline"
                    >
                      Sign In here
                    </button>
                  </p>
                </form>
              ) : (
                /* Step 2: Email OTP Input Screen */
                <form onSubmit={handleVerifyRegisterOtp} className="space-y-4 animate-in fade-in">
                  
                  <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-center space-y-1.5">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#00355f] text-white flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0A2540]">Email Verification OTP Sent</h3>
                    <p className="text-xs text-slate-600">
                      We sent a 6-digit verification code to <span className="font-bold text-[#00355f]">{regEmail}</span>
                    </p>
                    <div className="inline-block mt-1 px-3 py-1 bg-white border border-sky-300 rounded-full text-[11px] font-bold text-sky-900">
                      Demo Code: <span className="font-mono text-emerald-700">{generatedDemoOtp}</span>
                    </div>
                  </div>

                  {/* 6 Digit OTP Inputs */}
                  <div className="space-y-2">
                    <div className="flex gap-2 justify-center">
                      {regOtpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          ref={(el) => (otpInputsRef.current[idx] = el)}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value, true)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e, true)}
                          className="w-11 h-12 text-center text-xl font-black rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00355f]"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAutoFillOtp(true)}
                        className="text-[#00355f] font-bold hover:underline"
                      >
                        Auto-fill Code ({generatedDemoOtp})
                      </button>

                      {resendTimer > 0 ? (
                        <span className="text-slate-500">Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            sendEmailOtp(regEmail);
                            setResendTimer(30);
                          }}
                          className="text-[#00355f] font-bold hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Resend OTP</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#006e2d] hover:bg-[#14532D] text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verify Email &amp; Complete Registration</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegStep('form')}
                      className="w-full py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer"
                    >
                      ← Back to edit phone / email
                    </button>
                  </div>

                </form>
              )}

            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: ADMIN PORTAL LOGIN */}
          {/* ========================================================== */}
          {activeTab === 'admin' && (
            <div className="space-y-4 animate-in fade-in">
              
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block">Internal Operations &amp; Dispatch Access</span>
                  <span className="text-[11px] text-rose-700">
                    Restricted to Essendaar Mangadu manufacturing managers, inventory controllers, and GST invoice staff.
                  </span>
                </div>
              </div>

              {adminError && (
                <div className="p-3 bg-rose-100 border border-rose-300 text-rose-900 rounded-xl flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                  <span>{adminError}</span>
                </div>
              )}

              <form onSubmit={handleAdminLogin} className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Admin Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-rose-700"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Admin Password / Security Credential (Cc6100358 or PIN: 9787) *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="Enter Password (e.g. Cc6100358 or 9787)"
                      value={adminPin}
                      onChange={(e) => setAdminPin(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 focus:outline-none focus:border-rose-700"
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0A2540] hover:bg-slate-900 text-white font-headline font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Unlock Admin Operations Portal</span>
                </button>
              </form>

              {/* Instant 1-Click Demo Admin button */}
              <div className="pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>⚡ Quick 1-Click Admin Access (info@rightchoiceindia.com)</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer Trust Bar */}
        <div className="bg-slate-50 border-t border-slate-200 py-2.5 px-5 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary-fixed" />
            <span>256-Bit SSL Encrypted Verification</span>
          </div>
          <span>Essendaar Suppliers · Mangadu, Chennai</span>
        </div>

      </div>
    </div>
  );
};
