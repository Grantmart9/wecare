import { useState } from "react";
import * as motion from "motion/react-client"

/* -------------------------- MUI -------------------------- */
import {
    Box,
    Container,
    TextField,
    Button,
    Paper,
    Typography,
    Alert,
    CircularProgress,
    Divider,
    Stack,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";

/* -------------------------------------------------
   Form interfaces and validation
   ------------------------------------------------- */
interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

/* -------------------------------------------------
   Form state management and validation
   ------------------------------------------------- */
function useContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would typically send the data to your backend
            console.log('Form submitted:', formData);

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        errors,
        isSubmitting,
        submitStatus,
        handleInputChange,
        handleSubmit
    };
}


/* -------------------------------------------------
    Contact‑Us page
    ------------------------------------------------- */
export default function ContactUs() {
    const {
        formData,
        errors,
        isSubmitting,
        submitStatus,
        handleInputChange,
        handleSubmit
    } = useContactForm();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* -------------------------------------------------
         Enhanced Hero Banner
         ------------------------------------------------- */}
            <div className="relative h-[400px] md:h-[500px] gradient-hero overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-24 h-24 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white bg-opacity-5 rounded-full animate-pulse delay-500"></div>
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    {/* Main title */}
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                        className="mb-6"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Contact Us
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto"></div>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl md:text-2xl max-w-4xl leading-relaxed"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Have a question, suggestion, or just want to say hello?
                        We're here to listen and help make a difference together.
                    </motion.p>

                    {/* Quick contact options */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 border border-white border-opacity-30">
                            <span className="text-gray-600 font-medium">📧 Email us anytime</span>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 border border-white border-opacity-30">
                            <span className="text-gray-600 font-medium">📞 Call for support</span>
                        </div>
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 border border-white border-opacity-30">
                            <span className="text-gray-600 font-medium">💬 Live chat available</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* -------------------------------------------------
         Enhanced Main Content
         ------------------------------------------------- */}
            <motion.main
                className="relative -mt-20 z-10 pb-20"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.15 },
                    },
                }}
            >
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20"></div>
                </div>

                <Container maxWidth="lg" className="relative z-10">
                    <div className="flex flex-col items-center space-y-8">

                        {/* ----- Enhanced Contact Information Cards ----- */}
                        <motion.div
                            className="w-full max-w-6xl"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <motion.div
                                className="text-center mb-12"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.div
                                    className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-lg border border-blue-100 mb-6"
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Get in Touch</span>
                                </motion.div>

                                <motion.h2
                                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 pt-8"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Multiple Ways to <motion.span
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{ backgroundSize: '200% 200%' }}
                                    >
                                        Connect
                                    </motion.span>
                                </motion.h2>

                                <motion.p
                                    className="text-lg text-gray-600 max-w-2xl mx-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Choose the method that works best for you. We're here to help and answer any questions.
                                </motion.p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {/* Email Card */}
                                <motion.div
                                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-blue-200 cursor-pointer group"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -3,
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 360
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                animate={{
                                                    rotate: [0, 10, -10, 0]
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Email className="text-blue-600 text-3xl" />
                                            </motion.div>
                                        </motion.div>
                                        <motion.h3
                                            className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Email Support
                                        </motion.h3>
                                        <motion.p
                                            className="text-gray-600 mb-6 leading-relaxed"
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Send us a detailed message and we'll respond within 24 hours with a comprehensive answer.
                                        </motion.p>
                                        <motion.div
                                            className="bg-blue-50 rounded-lg p-4 border border-blue-100"
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "#eff6ff"
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                className="font-semibold text-blue-700"
                                                animate={{
                                                    color: ['#1e40af', '#3b82f6', '#1e40af']
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                hello@wecare.org
                                            </motion.div>
                                            <div className="text-sm text-blue-600 mt-1">Response within 24 hours</div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Phone Card */}
                                <motion.div
                                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-green-200 cursor-pointer group"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -3,
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: -360
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, -5, 5, 0]
                                                }}
                                                transition={{
                                                    duration: 2.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <Phone className="text-green-600 text-3xl" />
                                            </motion.div>
                                        </motion.div>
                                        <motion.h3
                                            className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Phone Support
                                        </motion.h3>
                                        <motion.p
                                            className="text-gray-600 mb-6 leading-relaxed"
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Speak directly with our support team for immediate assistance and personalized help.
                                        </motion.p>
                                        <motion.div
                                            className="bg-green-50 rounded-lg p-4 border border-green-100"
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "#f0fdf4"
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                className="font-semibold text-green-700"
                                                animate={{
                                                    color: ['#166534', '#16a34a', '#166534']
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                +1 (555) 123-4567
                                            </motion.div>
                                            <div className="text-sm text-green-600 mt-1">Mon-Fri 9AM-6PM EST</div>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Location Card */}
                                <motion.div
                                    className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 hover:border-purple-200 cursor-pointer group"
                                    whileHover={{
                                        scale: 1.02,
                                        y: -3,
                                        transition: { duration: 0.3 }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-center">
                                        <motion.div
                                            className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 360
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <motion.div
                                                animate={{
                                                    y: [0, -3, 0],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <LocationOn className="text-purple-600 text-3xl" />
                                            </motion.div>
                                        </motion.div>
                                        <motion.h3
                                            className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            Visit Our Office
                                        </motion.h3>
                                        <motion.p
                                            className="text-gray-600 mb-6 leading-relaxed"
                                            initial={{ opacity: 0.8 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Come visit us in person for face-to-face discussions and community events.
                                        </motion.p>
                                        <motion.div
                                            className="bg-purple-50 rounded-lg p-4 border border-purple-100"
                                            whileHover={{
                                                scale: 1.02,
                                                backgroundColor: "#faf5ff"
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <motion.div
                                                className="font-semibold text-purple-700"
                                                animate={{
                                                    color: ['#7c2d12', '#a855f7', '#7c2d12']
                                                }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                123 Care Street
                                            </motion.div>
                                            <div className="text-sm text-purple-600 mt-1">Compassion City, CC 12345</div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* ----- Enhanced Contact Form ----- */}
                        <motion.div
                            className="w-full max-w-4xl"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 shadow-md mb-6">
                                        <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Send Message</span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                        We'd Love to <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Hear From You</span>
                                    </h2>

                                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                        Fill out the form below and we'll get back to you as soon as possible with helpful information.
                                    </p>
                                </div>

                                {/* Status Messages */}
                                {submitStatus === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6"
                                    >
                                        <Alert severity="success" className="rounded-xl border border-green-200">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-white text-lg">✓</span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">Message Sent Successfully!</div>
                                                    <div className="text-sm">We'll get back to you within 24 hours.</div>
                                                </div>
                                            </div>
                                        </Alert>
                                    </motion.div>
                                )}

                                {submitStatus === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6"
                                    >
                                        <Alert severity="error" className="rounded-xl border border-red-200">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                                    <span className="text-white text-lg">!</span>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">Something went wrong</div>
                                                    <div className="text-sm">Please try again or contact us directly.</div>
                                                </div>
                                            </div>
                                        </Alert>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Name *</label>
                                            <TextField
                                                fullWidth
                                                placeholder="Your full name"
                                                value={formData.name}
                                                onChange={handleInputChange("name")}
                                                error={!!errors.name}
                                                helperText={errors.name}
                                                variant="outlined"
                                                disabled={isSubmitting}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: 'rgba(59, 130, 246, 0.02)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-semibold text-gray-700">Email *</label>
                                            <TextField
                                                fullWidth
                                                type="email"
                                                placeholder="your.email@example.com"
                                                value={formData.email}
                                                onChange={handleInputChange("email")}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                variant="outlined"
                                                disabled={isSubmitting}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        borderRadius: '12px',
                                                        backgroundColor: 'rgba(59, 130, 246, 0.02)',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                        },
                                                        '&.Mui-focused': {
                                                            backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Subject *</label>
                                        <TextField
                                            fullWidth
                                            placeholder="What's this about?"
                                            value={formData.subject}
                                            onChange={handleInputChange("subject")}
                                            error={!!errors.subject}
                                            helperText={errors.subject}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(59, 130, 246, 0.02)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Message *</label>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={handleInputChange("message")}
                                            error={!!errors.message}
                                            helperText={errors.message}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(59, 130, 246, 0.02)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                    },
                                                    '&.Mui-focused': {
                                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                                    }
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Enhanced Submit Button */}
                                    <div className="flex justify-center pt-4">
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={isSubmitting}
                                                startIcon={
                                                    isSubmitting ? <CircularProgress size={24} /> : <Send />
                                                }
                                                sx={{
                                                    py: 2,
                                                    px: 8,
                                                    fontSize: "1.2rem",
                                                    fontWeight: "bold",
                                                    borderRadius: "16px",
                                                    minWidth: "250px",
                                                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                                                    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                                                    '&:hover': {
                                                        background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                                                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                                                        transform: "translateY(-2px)",
                                                    },
                                                    '&:disabled': {
                                                        background: "#9CA3AF",
                                                        boxShadow: "none",
                                                    }
                                                }}
                                            >
                                                {isSubmitting ? "Sending Message..." : "Send Message"}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>

                                {/* Additional help text */}
                                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                                    <p className="text-gray-600 text-sm">
                                        Need immediate help? Call us at <span className="font-semibold text-blue-600">+1 (555) 123-4567</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </motion.main>
        </div>
    );
}