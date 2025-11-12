"use client"
import React, { useState } from "react";
import { Button, TextField, Alert, Divider } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GoogleIcon from '@mui/icons-material/Google';
import LockResetIcon from '@mui/icons-material/LockReset';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import * as motion from "motion/react-client";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "../supabase";
import { useTheme } from "../layout";

const supabase = createClient(SUPABASE_URL, API_KEY);

// Interfaces
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

// Move form components outside to prevent re-creation on every render
interface LoginFormProps {
  loginData: LoginData;
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

const LoginForm = ({ loginData, handleLoginChange, handleLogin, loading, showPassword, setShowPassword }: LoginFormProps) => (
  <motion.div
    key="login-form"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <form onSubmit={handleLogin} className="grid grid-flow-row gap-4">
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        size="small"
        value={loginData.email}
        onChange={handleLoginChange}
        required
        disabled={loading}
        variant="outlined"
        className="mb-4"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#3b82f6',
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        size="small"
        type={showPassword ? 'text' : 'password'}
        value={loginData.password}
        onChange={handleLoginChange}
        required
        disabled={loading}
        variant="outlined"
        className="mb-4"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                className="text-gray-600 hover:text-gray-900"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#3b82f6',
            },
          },
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        startIcon={<LoginIcon />}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        sx={{
          backgroundColor: '#1d4ed8',
          '&:hover': {
            backgroundColor: '#1e40af',
          },
          textTransform: 'none',
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  </motion.div>
);

interface RegisterFormProps {
  registerData: RegisterData;
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
}

const RegisterForm = ({ registerData, handleRegisterChange, handleRegister, loading, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }: RegisterFormProps) => (
  <motion.div
    key="register-form"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <form onSubmit={handleRegister} className="grid grid-flow-row gap-4">
      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={registerData.name}
        onChange={handleRegisterChange}
        required
        disabled={loading}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#22c55e',
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={registerData.email}
        onChange={handleRegisterChange}
        required
        disabled={loading}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#22c55e',
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={registerData.password}
        onChange={handleRegisterChange}
        required
        disabled={loading}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                className="text-gray-600 hover:text-gray-900"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#22c55e',
            },
          },
        }}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={registerData.confirmPassword}
        onChange={handleRegisterChange}
        required
        disabled={loading}
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                className="text-gray-600 hover:text-gray-900"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#22c55e',
            },
          },
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        startIcon={<PersonAddIcon />}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        sx={{
          backgroundColor: '#16a34a',
          '&:hover': {
            backgroundColor: '#15803d',
          },
          textTransform: 'none',
        }}
      >
        {loading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  </motion.div>
);

interface ForgotPasswordFormProps {
  forgotEmail: string;
  setForgotEmail: (email: string) => void;
  handleForgotPassword: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const ForgotPasswordForm = ({ forgotEmail, setForgotEmail, handleForgotPassword, loading }: ForgotPasswordFormProps) => (
  <motion.div
    key="forgot-form"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <form onSubmit={handleForgotPassword} className="space-y-4">
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={forgotEmail}
        onChange={(e) => setForgotEmail(e.target.value)}
        required
        disabled={loading}
        variant="outlined"
        helperText="Enter your email address to receive a password reset link"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#d1d5db',
            },
            '&:hover fieldset': {
              borderColor: '#9ca3af',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8b5cf6',
            },
            '& input': {
              color: '#111827',
            },
            '& input::placeholder': {
              color: '#6b7280',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#374151',
            '&.Mui-focused': {
              color: '#8b5cf6',
            },
          },
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        startIcon={<EmailIcon />}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        sx={{
          backgroundColor: '#7c3aed',
          '&:hover': {
            backgroundColor: '#6d28d9',
          },
          textTransform: 'none',
        }}
      >
        {loading ? "Sending..." : "Send Reset Email"}
      </Button>
    </form>
  </motion.div>
);

interface LoginPageProps {
  handlePage: (page: string) => void;
  scrollToTop?: () => void;
}

const LoginPage = ({ handlePage, scrollToTop }: LoginPageProps) => {
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login"); // 'login', 'register', 'forgot'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<Message>({ type: '', text: '' });

  // Get theme context
  const { themeMode } = useTheme();

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const clearMessage = () => {
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
        clearMessage();
      } else {
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        setTimeout(() => handlePage('Dashboard'), 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      clearMessage();
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (registerData.password !== registerData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      clearMessage();
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      clearMessage();
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerData.email,
        password: registerData.password,
        options: {
          data: {
            name: registerData.name,
          }
        }
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
        clearMessage();
      } else if (data.user) {
        // Create user record in public.users table after successful signup
        try {
          const { error: userError } = await supabase
            .from("users")
            .upsert([{
              id: data.user.id,
              email: registerData.email,
              name: registerData.name
            }], { onConflict: 'id' });

          if (userError) {
            console.error("Error creating user record:", userError);
            // Don't fail the registration if user profile creation fails
          }
        } catch (userErr) {
          console.error("Error in user creation:", userErr);
          // Don't fail the registration if user profile creation fails
        }

        setMessage({
          type: 'success',
          text: 'Registration successful! Please check your email to verify your account.'
        });
        setTimeout(() => setMode('login'), 3000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setMessage({ type: 'error', text: errorMessage });
      clearMessage();
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
        clearMessage();
      } else {
        setMessage({
          type: 'success',
          text: 'Password reset email sent! Please check your inbox.'
        });
        setTimeout(() => setMode('login'), 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      clearMessage();
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) {
        setMessage({ type: 'error', text: error.message });
        clearMessage();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      clearMessage();
    }
  };


  return (
    <div className={`min-h-screen theme-bg-secondary transition-colors duration-300 ${themeMode === 'dark' ? 'dark' : ''}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="gradient-hero py-8 text-center"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center">
        
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="text-white text-lg">
              {mode === 'login' && 'Sign in to access your account'}
              {mode === 'register' && 'Join the WeCare community'}
              {mode === 'forgot' && 'Recover your account access'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="theme-bg-primary rounded-2xl shadow-lg p-8"
        >
          {/* Mode Tabs */}
          {mode !== 'forgot' && (
            <div className="flex mb-6 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${mode === 'login'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-200'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-semibold transition-all duration-200 ${mode === 'register'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-200'
                  }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Alert Messages */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Alert
                severity={message.type === 'error' ? 'error' : 'success'}
                onClose={() => setMessage({ type: '', text: '' })}
              >
                {message.text}
              </Alert>
            </motion.div>
          )}

          {/* Forms */}
          {mode === 'login' && (
            <LoginForm
              loginData={loginData}
              handleLoginChange={handleLoginChange}
              handleLogin={handleLogin}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
          {mode === 'register' && (
            <RegisterForm
              registerData={registerData}
              handleRegisterChange={handleRegisterChange}
              handleRegister={handleRegister}
              loading={loading}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          )}
          {mode === 'forgot' && (
            <ForgotPasswordForm
              forgotEmail={forgotEmail}
              setForgotEmail={setForgotEmail}
              handleForgotPassword={handleForgotPassword}
              loading={loading}
            />
          )}

          {/* Divider and Google Login */}
          {mode !== 'forgot' && (
            <>
              <Divider className="my-6">OR</Divider>

              <Button
                onClick={handleGoogleLogin}
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                disabled={loading}
                className="py-3 border-gray-400 text-gray-800 hover:bg-gray-100 font-medium"
                sx={{
                  borderColor: '#9ca3af',
                  '&:hover': {
                    backgroundColor: '#f3f4f6',
                    borderColor: '#6b7280',
                  },
                  textTransform: 'none',
                }}
              >
                Continue with Google
              </Button>
            </>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            {mode === 'login' && (
              <button
                onClick={() => setMode('forgot')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                Forgot your password?
              </button>
            )}

            {mode === 'forgot' && (
              <button
                onClick={() => setMode('login')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
              >
                Back to Sign In
              </button>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;