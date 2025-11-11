import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Image from "next/image";
import * as motion from "motion/react-client"
import avatar from "../images/avatar.jpg";
import backButtonImage from "../images/backbutton.png";
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

const supabase = createClient(SUPABASE_URL, API_KEY);

interface DashboardPageProps {
  handlePage: (page: string) => void;
  scrollToTop?: () => void;
}

interface AppUser {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
  };
}

interface Donation {
  id: string;
  category: string;
  quantity?: number;
  created_at: string;
  user_id: string;
}

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  points: number;
  quantity: number;
}

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  membership_start_date?: string;
}

interface SaveMessage {
  type: 'success' | 'error';
  text: string;
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  placeholder: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface ProfileSettingsItem {
  name: string;
  buttons: {
    icon: React.ReactElement;
    name: string;
    description: string;
    page: string;
  }[];
  hasToggle?: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ handlePage, scrollToTop }) => {
    const [DashPage, setDashPage] = useState<string>("none");
    const [user, setUser] = useState<AppUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalDonations, setTotalDonations] = useState<number>(0);
    const [donationsLoading, setDonationsLoading] = useState<boolean>(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [saveMessage, setSaveMessage] = useState<SaveMessage | null>(null);
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const [activityLoading, setActivityLoading] = useState<boolean>(true);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    const [userRank, setUserRank] = useState<number>(0);
    const [rankLoading, setRankLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(5);

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

        // Fetch recent activity data
        const fetchRecentActivity = async () => {
            try {
                setActivityLoading(true);

                // Fetch user's donations from the last 30 days
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                const { data: donations, error } = await supabase
                    .from('donations')
                    .select('*')
                    .eq('user_id', user!.id)
                    .gte('created_at', thirtyDaysAgo.toISOString())
                    .order('created_at', { ascending: false })
                    .limit(50);

                if (error) {
                    console.error('Error fetching recent activity:', error);
                    setRecentActivity([]);
                    setTotalPoints(0);
                } else {
                    // Transform donations into activity format and calculate points
                    const activities: Activity[] = donations.map((donation: Donation) => {
                        const points = calculatePoints(donation);
                        return {
                            id: donation.id,
                            type: donation.category,
                            description: getActivityDescription(donation),
                            date: donation.created_at,
                            points: points,
                            quantity: donation.quantity || 1
                        };
                    });

                    setRecentActivity(activities);

                    // Calculate total points
                    const total = activities.reduce((sum, activity) => sum + activity.points, 0);
                    setTotalPoints(total);
                }
            } catch (error) {
                console.error('Unexpected error fetching recent activity:', error);
                setRecentActivity([]);
                setTotalPoints(0);
            } finally {
                setActivityLoading(false);
            }
        };

        // Fetch all users' total points for rank calculation
        const fetchUserRankings = async () => {
            try {
                setRankLoading(true);

                // Fetch all donations from all users
                const { data: allDonations, error } = await supabase
                    .from('donations')
                    .select('user_id, category, quantity, created_at');

                if (error) {
                    console.error('Error fetching user rankings:', error);
                    setUserRank(0);
                    return;
                }

                if (!allDonations || allDonations.length === 0) {
                    setUserRank(1); // First user gets rank 1
                    return;
                }

                // Calculate total points for each user
                const userPointsMap: { [key: string]: number } = {};

                allDonations.forEach((donation: any) => {
                    const userId = donation.user_id;
                    const points = calculatePoints(donation);

                    if (userPointsMap[userId]) {
                        userPointsMap[userId] += points;
                    } else {
                        userPointsMap[userId] = points;
                    }
                });

                // Convert to array and sort by points descending
                const userRankings = Object.entries(userPointsMap)
                    .map(([userId, points]) => ({ userId, points }))
                    .sort((a, b) => b.points - a.points);

                // Find current user's rank
                const currentUserIndex = userRankings.findIndex(rankingUser => rankingUser.userId === user?.id);
                const rank = currentUserIndex !== -1 ? currentUserIndex + 1 : userRankings.length + 1;

                setUserRank(rank);
            } catch (error) {
                console.error('Unexpected error fetching user rankings:', error);
                setUserRank(0);
            } finally {
                setRankLoading(false);
            }
        };

        // Calculate points based on donation category and quantity
        const calculatePoints = (donation: Donation): number => {
            const quantity = donation.quantity || 1;
            switch (donation.category?.toLowerCase()) {
                case 'goods':
                case 'clothing':
                case 'books':
                case 'food':
                    return quantity * 50; // 50 points per item
                case 'service':
                case 'volunteer':
                    return quantity * 100; // 100 points per hour/service
                case 'cash':
                case 'money':
                    return quantity * 30; // 30 points per unit of currency
                default:
                    return quantity * 25; // Default 25 points per item
            }
        };

        // Get human-readable activity description
        const getActivityDescription = (donation: Donation): string => {
            const category = donation.category?.toLowerCase();
            const quantity = donation.quantity || 1;

            if (category === 'cash' || category === 'money') {
                return `Cash Donation of ${quantity} unit${quantity !== 1 ? 's' : ''}`;
            } else if (category === 'service' || category === 'volunteer') {
                return `Volunteered ${quantity} hour${quantity !== 1 ? 's' : ''}`;
            } else {
                return `${donation.category || 'Item'} Donation${quantity > 1 ? ` (${quantity} items)` : ''}`;
            }
        };

        if (user) {
            fetchTotalDonations();
            fetchRecentActivity();
            fetchUserRankings();
        }
    }, [user]);

    // Reset pagination when new activity data is loaded
    useEffect(() => {
        setCurrentPage(1);
    }, [recentActivity]);

    // Fetch user profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setProfileLoading(true);
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', user!.id)
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
        } else {
            setUserProfile(null);
            setProfileLoading(false);
        }
    }, [user]);

    // Update user profile in Supabase
    const updateUserProfile = async (updatedData: FormData): Promise<boolean> => {
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
                .eq('id', user!.id)
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

    const getAccountDetails = (): {
        name: string;
        membership_start_date: string;
        personal_information: { email: string; phone: string };
        donation_history: { total_donations: number; recent_activity: number };
    } => {
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

    const handleDashPage = (selected: string) => { setDashPage(selected) }

    // Get appropriate icon for activity type
    const getActivityIcon = (activityType: string): string => {
        const type = activityType?.toLowerCase();
        switch (type) {
            case 'clothing':
            case 'goods':
                return '👕';
            case 'books':
                return '📚';
            case 'food':
            case 'meals':
                return '🍽️';
            case 'cash':
            case 'money':
                return '💰';
            case 'service':
            case 'volunteer':
                return '🤝';
            case 'electronics':
                return '📱';
            default:
                return '📦';
        }
    };

    // Get relative time string
    const getTimeAgo = (dateString: string): string => {
        const now = new Date();
        const date = new Date(dateString);
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) {
            return 'just now';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 604800) {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else {
            const weeks = Math.floor(diffInSeconds / 604800);
            return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        }
    };

    // Pagination helpers
    const getPaginatedActivities = (): Activity[] => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return recentActivity.slice(startIndex, endIndex);
    };

    const getTotalPages = (): number => {
        return Math.ceil(recentActivity.length / itemsPerPage);
    };

    const handleNextPage = () => {
        if (currentPage < getTotalPages()) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const DetailsPage = () => {
        const [edit, setEdit] = useState<string>("ProfileView")

        const handleProfile = () => { setEdit("ProfileEdit") }

        const ProfileEdit = () => {
            const [formData, setFormData] = useState<FormData>({
                name: '',
                email: '',
                phone: '',
                countryCode: '+27'
            });

            // Country codes data
            const countryCodes: CountryCode[] = [
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
            const formatPhoneNumber = (phone: string): string => {
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

            const handleInputChange = (field: string, value: string) => {
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

            const validatePhoneNumber = (phone: string, countryCode: string): boolean => {
                const cleaned = phone.replace(/\D/g, '');

                // Phone number length validation based on country code
                const phoneNumberLengths: { [key: string]: number } = {
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
                    const phoneNumberLengths: { [key: string]: number } = {
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
                                        <p className="font-medium">
                                            {activityLoading ? (
                                                <span>Loading...</span>
                                            ) : recentActivity.length > 0 ? (
                                                getTimeAgo(recentActivity[0].date)
                                            ) : (
                                                'No recent activity'
                                            )}
                                        </p>
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
                            <div className="text-4xl mb-4">⭐</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Total Points</h3>
                            <p className="text-3xl font-bold text-green-600">
                                {activityLoading ? (
                                    <span className="text-lg">Loading...</span>
                                ) : (
                                    `${totalPoints} pts`
                                )}
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                            <div className="text-4xl mb-4">🏆</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Community Rank</h3>
                            <p className="text-3xl font-bold text-purple-600">
                                {rankLoading ? (
                                    <span className="text-lg">Loading...</span>
                                ) : (
                                    `#${userRank}`
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                        {activityLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading recent activity...</p>
                            </div>
                        ) : recentActivity.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📊</div>
                                <p className="text-gray-600 mb-2">No recent activity</p>
                                <p className="text-gray-500 text-sm">Your donation activities will appear here</p>
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4">
                                    {getPaginatedActivities().map((activity) => (
                                        <div key={activity.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                            <div className="text-blue-600 text-2xl mr-4">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{activity.description}</p>
                                                <p className="text-gray-600 text-sm">
                                                    {new Date(activity.date).toLocaleDateString()} ({getTimeAgo(activity.date)})
                                                </p>
                                            </div>
                                            <div className="text-green-600 font-medium">
                                                +{activity.points} pts
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                {getTotalPages() > 1 && (
                                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                                        <div className="text-sm text-gray-600">
                                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, recentActivity.length)} of {recentActivity.length} activities
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                                variant="outlined"
                                                size="small"
                                                className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Previous
                                            </Button>
                                            <span className="text-sm text-gray-600 px-2">
                                                Page {currentPage} of {getTotalPages()}
                                            </span>
                                            <Button
                                                onClick={handleNextPage}
                                                disabled={currentPage === getTotalPages()}
                                                variant="outlined"
                                                size="small"
                                                className="text-gray-600 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
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
                                <p className="font-medium mb-4">Appearance</p>
                                <div className="modern-card p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-teal-500 rounded-lg flex items-center justify-center">
                                            <div className="w-4 h-4 bg-white rounded-sm"></div>
                                        </div>
                                        <div>
                                            <p className="font-medium">Light Theme</p>
                                            <p className="text-gray-600 text-sm">Clean, modern light interface</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="font-medium mb-2">Language</p>
                                <select className="modern-input w-full">
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

    const ProfileSettings: ProfileSettingsItem[] = [
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
                { icon: <SettingsIcon fontSize="large" />, name: "App Preferences", description: "Language and display settings", page: "Preferences" }
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
                    className="gradient-hero py-12 text-center"
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
                    className="gradient-hero py-12 text-center"
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
                            <Button onClick={() => setDashPage("none")} disableRipple={true}><Image src={backButtonImage} alt="Back" width={24} height={24} /></Button> My Profile | {DashPage}
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