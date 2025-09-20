"use client"
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import * as motion from "motion/react-client"
import avatar from "../images/avatar.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LoginIcon from '@mui/icons-material/Login';
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, API_KEY } from "../supabase";
import { useTheme } from "../layout";

const supabase = createClient(SUPABASE_URL, API_KEY);

const DashboardPage = ({ handlePage, scrollToTop }) => {
  const [DashPage, setDashPage] = useState("none");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonations, setTotalDonations] = useState(0);
  const [donationsLoading, setDonationsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [themeSaving, setThemeSaving] = useState(false);
  const [themeMessage, setThemeMessage] = useState(null);

  // Get theme context
  const { themeMode, setThemeMode, theme } = useTheme();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Fetch total donations count
  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        setDonationsLoading(true);
        const { count, error } = await supabase
          .from('donations')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error('Error fetching donations count:', error);
          setTotalDonations(0);
        } else {
          setTotalDonations(count || 0);
        }
      } catch (error) {
        console.error('Unexpected error fetching donations:', error);
        setTotalDonations(0);
      } finally {
        setDonationsLoading(false);
      }
    };

    if (user) {
      fetchTotalDonations();
    }
  }, [user]);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        } else {
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Unexpected error fetching user profile:', error);
        setUserProfile(null);
      } finally {
        setProfileLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
      // Load theme preference
      loadThemePreference().then(savedTheme => {
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
          setThemeMode(savedTheme);
        }
      });
    } else {
      setUserProfile(null);
      setProfileLoading(false);
    }
  }, [user]);

  // Update user profile in Supabase
  const updateUserProfile = async (updatedData) => {
    try {
      setIsSaving(true);
      setSaveMessage(null);

      const { data, error } = await supabase
        .from('users')
        .update({
          name: updatedData.name,
          email: updatedData.email,
          phone: `${updatedData.countryCode}${updatedData.phone}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        setSaveMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
        return false;
      } else {
        setUserProfile(data);
        setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
        return true;
      }
    } catch (error) {
      console.error('Unexpected error updating profile:', error);
      setSaveMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Save theme preference to Supabase
  const saveThemePreference = async (theme) => {
    try {
      setThemeSaving(true);
      setThemeMessage(null);

      // First, check if user preferences exist
      const { data: existingPrefs, error: fetchError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error fetching user preferences:', fetchError);
        setThemeMessage({ type: 'error', text: 'Failed to save theme preference.' });
        return false;
      }

      let result;
      if (existingPrefs) {
        // Update existing preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .update({
            theme: theme,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating theme preference:', error);
          setThemeMessage({ type: 'error', text: 'Failed to save theme preference.' });
          return false;
        }
        result = data;
      } else {
        // Create new preferences
        const { data, error } = await supabase
          .from('user_preferences')
          .insert({
            user_id: user.id,
            theme: theme,
            email_notifications: true, // default values
            push_notifications: false,
            sms_notifications: false,
            language: 'en'
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating user preferences:', error);
          setThemeMessage({ type: 'error', text: 'Failed to save theme preference.' });
          return false;
        }
        result = data;
      }

      setThemeMessage({ type: 'success', text: 'Theme preference saved!' });
      return true;
    } catch (error) {
      console.error('Unexpected error saving theme:', error);
      setThemeMessage({ type: 'error', text: 'An unexpected error occurred.' });
      return false;
    } finally {
      setThemeSaving(false);
    }
  };

  // Load theme preference from Supabase
  const loadThemePreference = async () => {
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('theme')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('Error loading theme preference:', error);
        return null;
      }

      return data?.theme || null;
    } catch (error) {
      console.error('Unexpected error loading theme:', error);
      return null;
    }
  };

  // Handle theme change
  const handleThemeChange = async (newTheme) => {
    setThemeMode(newTheme);
    const success = await saveThemePreference(newTheme);
    if (success) {
      setTimeout(() => {
        setThemeMessage(null);
      }, 3000);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        // Redirect to home page after logout
        handlePage('Home');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const getAccountDetails = () => {
    if (!userProfile) {
      return {
        "name": "Loading...",
        "membership_start_date": "Loading...",
        "personal_information": {
          "email": "Loading...",
          "phone": "Loading..."
        },
        "donation_history": {
          "total_donations": 0,
          "recent_activity": 0
        }
      };
    }

    return {
      "name": userProfile.name || "Unknown User",
      "membership_start_date": userProfile.membership_start_date ?
        new Date(userProfile.membership_start_date).getFullYear().toString() : "Unknown",
      "personal_information": {
        "email": userProfile.email || "No email provided",
        "phone": userProfile.phone || "No phone provided"
      },
      "donation_history": {
        "total_donations": totalDonations,
        "recent_activity": 24 // This could be calculated from actual activity data
      }
    };
  };

  const handleDashPage = (selected) => { setDashPage(selected) }

  const DetailsPage = () => {
    const [edit, setEdit] = useState("ProfileView")

    const handleProfile = () => { setEdit("ProfileEdit") }

    const ProfileEdit = () => {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryCode: '+27'
      });

      // Country codes data
      const countryCodes = [
        { code: '+27', name: 'South Africa', flag: '🇿🇦', placeholder: 'XX XXX XXXX' },
        { code: '+1', name: 'United States', flag: '🇺🇸', placeholder: 'XXX XXX XXXX' },
        { code: '+44', name: 'United Kingdom', flag: '🇬🇧', placeholder: 'XXXX XXXXXX' },
        { code: '+91', name: 'India', flag: '🇮🇳', placeholder: 'XXXXX XXXXX' },
        { code: '+61', name: 'Australia', flag: '🇦🇺', placeholder: 'XXX XXX XXX' },
        { code: '+49', name: 'Germany', flag: '🇩🇪', placeholder: 'XXX XXXXXXXX' },
        { code: '+33', name: 'France', flag: '🇫🇷', placeholder: 'X XX XX XX XX' },
        { code: '+81', name: 'Japan', flag: '🇯🇵', placeholder: 'XX XXXX XXXX' },
        { code: '+86', name: 'China', flag: '🇨🇳', placeholder: 'XXX XXXX XXXX' },
        { code: '+7', name: 'Russia', flag: '🇷🇺', placeholder: 'XXX XXX XX XX' }
      ];

      // Phone number formatting helper
      const formatPhoneNumber = (phone) => {
        if (!phone) return '';

        // Remove all non-digit characters
        const cleaned = phone.replace(/\D/g, '');

        // If it starts with 27 or +27, format as South African number
        if (cleaned.startsWith('27')) {
          const number = cleaned.startsWith('27') ? cleaned.substring(2) : cleaned.substring(3);
          if (number.length >= 9) {
            return `+27 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, 9)}`;
          } else if (number.length >= 7) {
            return `+27 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5)}`;
          } else if (number.length >= 2) {
            return `+27 ${number.substring(0, 2)} ${number.substring(2)}`;
          } else {
            return `+27 ${number}`;
          }
        }

        // If it doesn't start with country code, assume South African number
        if (cleaned.length >= 9) {
          return `+27 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 9)}`;
        } else if (cleaned.length >= 7) {
          return `+27 ${cleaned.substring(0, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5)}`;
        } else if (cleaned.length >= 2) {
          return `+27 ${cleaned.substring(0, 2)} ${cleaned.substring(2)}`;
        } else {
          return `+27 ${cleaned}`;
        }
      };

      // Update form data when userProfile loads
      useEffect(() => {
        if (userProfile) {
          const phoneNumber = userProfile.phone || '';
          // Extract country code from phone number if present
          let countryCode = '+27'; // default to South Africa
          let phoneOnly = phoneNumber;

          for (const country of countryCodes) {
            if (phoneNumber.startsWith(country.code)) {
              countryCode = country.code;
              phoneOnly = phoneNumber.substring(country.code.length);
              break;
            }
          }

          setFormData({
            name: userProfile.name || '',
            email: userProfile.email || '',
            phone: phoneOnly,
            countryCode: countryCode
          });
        }
      }, [userProfile]);

      const handleInputChange = (field, value) => {
        if (field === 'countryCode') {
          setFormData(prev => ({
            ...prev,
            [field]: value,
            phone: '' // Clear phone when country changes
          }));
        } else if (field === 'phone') {
          // Clean the input for storage (remove formatting)
          const cleaned = value.replace(/\D/g, '');
          setFormData(prev => ({
            ...prev,
            [field]: cleaned
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [field]: value
          }));
        }
      };

      const validatePhoneNumber = (phone, countryCode) => {
        const cleaned = phone.replace(/\D/g, '');

        // Phone number length validation based on country code
        const phoneNumberLengths = {
          '+27': 9,  // South Africa
          '+1': 10,  // United States
          '+44': 10, // United Kingdom
          '+91': 10, // India
          '+61': 9,  // Australia
          '+49': 10, // Germany (landline) or 11 (mobile)
          '+33': 9,  // France
          '+81': 10, // Japan
          '+86': 11, // China
          '+7': 10   // Russia
        };

        const expectedLength = phoneNumberLengths[countryCode] || 10;
        return cleaned.length === expectedLength;
      };

      const handleSave = async () => {
        // Basic validation
        if (!formData.name.trim()) {
          setSaveMessage({ type: 'error', text: 'Name is required' });
          return;
        }

        if (!formData.email.trim()) {
          setSaveMessage({ type: 'error', text: 'Email is required' });
          return;
        }

        if (!validatePhoneNumber(formData.phone, formData.countryCode)) {
          const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
          const countryName = selectedCountry ? selectedCountry.name : 'selected country';
          const phoneNumberLengths = {
            '+27': 9, '+1': 10, '+44': 10, '+91': 10, '+61': 9,
            '+49': 10, '+33': 9, '+81': 10, '+86': 11, '+7': 10
          };
          const expectedLength = phoneNumberLengths[formData.countryCode] || 10;

          setSaveMessage({
            type: 'error',
            text: `Please enter a valid ${countryName} phone number (${expectedLength} digits)`
          });
          return;
        }

        const success = await updateUserProfile(formData);
        if (success) {
          // Clear any previous error messages after 3 seconds
          setTimeout(() => {
            setSaveMessage(null);
          }, 3000);
        }
      };

      return (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col items-center mb-8">
                <Image src={avatar} alt="Profile" className="mx-auto rounded-full w-32 h-32 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800">{getAccountDetails().name}</h2>
                <p className="text-gray-600">Member since {getAccountDetails().membership_start_date}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mb-4"
                    disabled={profileLoading}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mb-4"
                    disabled={profileLoading}
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      disabled={profileLoading}
                      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium min-w-[140px]"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <TextField
                      fullWidth
                      variant="outlined"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mb-4"
                      disabled={profileLoading}
                      placeholder={countryCodes.find(c => c.code === formData.countryCode)?.placeholder || 'Phone number'}
                      helperText={`Enter your ${countryCodes.find(c => c.code === formData.countryCode)?.name || 'selected country'} phone number`}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center mt-8">
                {saveMessage && (
                  <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${saveMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                    {saveMessage.text}
                  </div>
                )}
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={isSaving || profileLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    const ProfileView = () => {
      return (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col items-center mb-8">
                <Image src={avatar} alt="Profile" className="mx-auto rounded-full w-32 h-32 mb-6" />
                {profileLoading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading profile...</p>
                  </div>
                ) : (
                  <>
                    {profileLoading ? (
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600">Loading profile...</p>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800">{getAccountDetails().name}</h2>
                        <p className="text-gray-600">Member since {getAccountDetails().membership_start_date}</p>
                      </>
                    )}
                  </>
                )}
                <Button
                  onClick={() => handleProfile()}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">
                      {profileLoading ? (
                        <span className="text-gray-500">Loading...</span>
                      ) : (
                        getAccountDetails().personal_information.email
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-medium">
                      {profileLoading ? (
                        <span className="text-gray-500">Loading...</span>
                      ) : (
                        getAccountDetails().personal_information.phone
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Donation History</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Total Donations</p>
                    <p className="font-medium">
                      {donationsLoading ? (
                        <span>Loading...</span>
                      ) : (
                        `${totalDonations} item${totalDonations !== 1 ? 's' : ''} donated`
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Recent Activity</p>
                    <p className="font-medium">{getAccountDetails().donation_history.recent_activity} hours ago</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                >
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    return (
      <>
        {edit === "ProfileView" ?
          <><ProfileView /></> :
          <><ProfileEdit /></>}
      </>
    )
  }

  const PasswordPage = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Update Password
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const Dashboard = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Total Donations</h3>
              <p className="text-3xl font-bold text-blue-600">
                {donationsLoading ? (
                  <span className="text-lg">Loading...</span>
                ) : (
                  `${totalDonations} item${totalDonations !== 1 ? 's' : ''}`
                )}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">People Helped</h3>
              <p className="text-3xl font-bold text-green-600">500+</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Rank</h3>
              <p className="text-3xl font-bold text-purple-600">#12</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4">👕</div>
                <div>
                  <p className="font-medium">Clothing Donation</p>
                  <p className="text-gray-600 text-sm">2 days ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+50 pts</div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4">📚</div>
                <div>
                  <p className="font-medium">Book Drive Participation</p>
                  <p className="text-gray-600 text-sm">1 week ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+30 pts</div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4"> volunte</div>
                <div>
                  <p className="font-medium">Volunteered at Shelter</p>
                  <p className="text-gray-600 text-sm">2 weeks ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+100 pts</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const NotificationsPage = () => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Notification Settings</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-gray-600 text-sm">Receive email updates</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-gray-600 text-sm">Receive push notifications</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-gray-600 text-sm">Receive text messages</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const PreferencesPage = () => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">App Preferences</h2>
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-4">Theme</p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    disabled={themeSaving}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${themeMode === 'light'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></div>
                      <div className="w-4 h-4 bg-white border border-gray-300 rounded mr-2"></div>
                      <div className="w-4 h-4 bg-gray-800 rounded"></div>
                    </div>
                    <p className="font-medium">Light</p>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    disabled={themeSaving}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${themeMode === 'dark'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-4 h-4 bg-gray-800 rounded-full mr-2"></div>
                      <div className="w-4 h-4 bg-gray-700 border border-gray-600 rounded mr-2"></div>
                      <div className="w-4 h-4 bg-gray-900 rounded"></div>
                    </div>
                    <p className="font-medium">Dark</p>
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    disabled={themeSaving}
                    className={`p-4 border-2 rounded-lg transition-all duration-200 ${themeMode === 'system'
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-gray-800 rounded-full mr-2"></div>
                      <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-700 border border-gray-300 rounded mr-2"></div>
                      <div className="w-4 h-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded"></div>
                    </div>
                    <p className="font-medium">System</p>
                  </button>
                </div>
                {themeMessage && (
                  <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${themeMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                    {themeMessage.text}
                  </div>
                )}
                {themeSaving && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span className="text-sm text-gray-600">Saving theme preference...</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-medium mb-2">Language</p>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const TermsPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Terms of Service</h2>
            <div className="prose max-w-none">
              <h3>1. Introduction</h3>
              <p>These terms and conditions outline the rules and regulations for the use of our service.</p>

              <h3>2. Intellectual Property</h3>
              <p>Unless otherwise stated, we own the intellectual property rights for all content on this platform.</p>

              <h3>3. Restrictions</h3>
              <p>You are specifically restricted from:</p>
              <ul>
                <li>Publishing any material that is unlawful or fraudulent</li>
                <li>Using our platform in any way that causes or may cause damage</li>
                <li>Using our platform in any way that impacts user access</li>
              </ul>

              <h3>4. Limitation of Liability</h3>
              <p>We shall not be liable for any consequential, incidental, indirect, or special damages.</p>

              <h3>5. Changes to These Terms</h3>
              <p>We reserve the right to modify these terms at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const PolicyPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h2>
            <div className="prose max-w-none">
              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account or donate.</p>

              <h3>2. How We Use Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services.</p>

              <h3>3. Information Sharing and Disclosure</h3>
              <p>We do not share personal information with companies, organizations, or individuals outside of our organization except in the following cases:</p>
              <ul>
                <li>With your consent</li>
                <li>For legal reasons</li>
                <li>To protect rights and property</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>We work hard to protect your personal information. We implement security measures to protect against unauthorized access.</p>

              <h3>5. Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const ProfileSettings = [
    {
      name: "Account",
      buttons: [
        { icon: <PersonIcon fontSize="large" />, name: "Account Details", description: "Manage your personal information", page: "Details" },
        { icon: <LockIcon fontSize="large" />, name: "Password", description: "Change your password", page: "Password" },
        { icon: <DashboardIcon fontSize="large" />, name: "Dashboard", description: "Keep track of your donations", page: "Dashboard" }
      ]
    },
    {
      name: "Notifications",
      buttons: [
        { icon: <NotificationsIcon fontSize="large" />, name: "Notification Settings", description: "Customize your notification preferences", page: "Notifications" }
      ],
      hasToggle: true
    },
    {
      name: "App Settings",
      buttons: [
        { icon: <SettingsIcon fontSize="large" />, name: "App Preferences", description: "Manage your app preferences", page: "Preferences" }
      ]
    },
    {
      name: "Legal",
      buttons: [
        { icon: <DescriptionIcon fontSize="large" />, name: "Terms of Service", description: "View our terms of service", page: "Terms" },
        { icon: <PrivacyTipIcon fontSize="large" />, name: "Privacy Policy", description: "Read our privacy policy", page: "Policy" }
      ]
    }
  ];

  useEffect(() => {
    if (scrollToTop) {
      scrollToTop();
    }
  }, [DashPage, scrollToTop]);

  const handleLoginRedirect = () => {
    handlePage('Login');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen theme-bg-secondary flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="theme-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen theme-bg-secondary transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 py-12 text-center"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">Login Required</h1>
            <p className="text-white text-xl">Please log in to access your profile and dashboard</p>
          </div>
        </motion.div>
        <div className="max-w-md mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <LoginIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to WeCare</h2>
            <p className="text-gray-600 mb-6">
              Sign in to access your dashboard, track your donations, and manage your profile.
            </p>
            <Button
              onClick={handleLoginRedirect}
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full"
            >
              Go to Login Page
            </Button>
            <div className="mt-6 text-sm text-gray-500">
              <p>Click above to access our secure login page with multiple sign-in options</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-bg-secondary pb-8 transition-colors duration-300">
      {DashPage === "none" ?
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 py-12 text-center"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white text-xl">Manage your account settings and preferences</p>
          </div>
        </motion.div> :
        <div className="inline-flex">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.2,
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5,
            }}>
            <div className="flex-inline text-lg text-gray-800 text-left ml-2 font-bold mt-4">
              <Button onClick={() => setDashPage("none")} disableRipple={true}><ArrowBackIcon sx={{ color: "gray.800" }} /></Button> My Profile | {DashPage}
            </div>
          </motion.div>
        </div>}
      {DashPage === "none" ?
        <div className="max-w-4xl mx-auto px-4 py-8">
          {ProfileSettings.map((section, i) => (
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{
                delay: 0.2 * i,
                type: "spring",
                stiffness: 200,
                damping: 40,
                mass: 20,
                duration: 1,
              }}
              key={i}
              className="mb-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-black text-2xl font-bold mb-4">{section.name}</h3>
              <div className="flex flex-col gap-2">
                {section.buttons.map((item, j) => (
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 3 }}
                    transition={{
                      delay: 0.4 * j,
                      type: "spring",
                      stiffness: 200,
                      damping: 40,
                      mass: 8,
                      duration: 0.5,
                    }} key={j}>
                    <Button
                      key={j}
                      disableRipple={true}
                      onClick={() => handleDashPage(item.page)}
                      startIcon={item.icon}
                      className="justify-start text-left w-full py-4"
                      sx={{
                        textTransform: "none",
                        color: "gray.800",
                        '&:hover': {
                          backgroundColor: "gray.50",
                        }
                      }}
                    >
                      <div className="flex flex-col items-start w-full text-left">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className="text-gray-500 text-sm">{item.description}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          ))}
        </div> : null}
      {DashPage === "Details" ? <><DetailsPage /></> : null}
      {DashPage === "Password" ? <><PasswordPage /></> : null}
      {DashPage === "Dashboard" ? <><Dashboard /></> : null}
      {DashPage === "Notifications" ? <><NotificationsPage /></> : null}
      {DashPage === "Preferences" ? <><PreferencesPage /></> : null}
      {DashPage === "Terms" ? <><TermsPage /></> : null}
      {DashPage === "Policy" ? <><PolicyPage /></> : null}
    </div>
  )
}

export default DashboardPage;