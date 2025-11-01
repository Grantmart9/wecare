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
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* -------------------------------------------------
        1️⃣  Blue‑to‑purple banner (same as other pages)
        ------------------------------------------------- */}
            <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    </motion.div>

                    <motion.p
                        className="text-xl max-w-3xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Have a question, suggestion, or just want to say hi? Fill the form
                        below and we'll get back to you as soon as possible.
                    </motion.p>
                </div>
            </div>

            {/* -------------------------------------------------
        2️⃣  Main content (gradient bg + nice spacing)
        ------------------------------------------------- */}
            <motion.main
                className="py-12"
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
                <Container maxWidth="lg">
                    <div className="flex flex-col items-center space-y-6">

                        {/* ----- Top: Contact Information ----- */}
                        <motion.div
                            className="w-full max-w-2xl"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.85)",
                                    backdropFilter: "blur(8px)",
                                    mb: 4,
                                }}
                            >
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                                    Get in Touch
                                </Typography>
                                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', textAlign: 'center' }}>
                                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                                </Typography>

                                <Box sx={{ mb: 3, pl: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Email sx={{ mr: 2, color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                Email
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                hello@wecare.org
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Phone sx={{ mr: 2, color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                Phone
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                +1 (555) 123-4567
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <LocationOn sx={{ mr: 2, color: 'primary.main' }} />
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                Address
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                123 Care Street<br />
                                                Compassion City, CC 12345
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>

                        {/* ----- Bottom: Contact Form ----- */}
                        <motion.div
                            className="w-full max-w-2xl"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <Paper
                                elevation={6}
                                sx={{
                                    p: 4,
                                    borderRadius: 3,
                                    background: "rgba(255,255,255,0.85)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{ fontWeight: "bold", color: "primary.main", mb: 3 }}
                                >
                                    Send us a Message
                                </Typography>

                                {submitStatus === "success" && (
                                    <Alert severity="success" sx={{ mb: 3 }}>
                                        Thank you for your message! We'll get back to you soon.
                                    </Alert>
                                )}

                                {submitStatus === "error" && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        Something went wrong. Please try again later.
                                    </Alert>
                                )}

                                <Box component="form" onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            value={formData.name}
                                            onChange={handleInputChange("name")}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange("email")}
                                            error={!!errors.email}
                                            helperText={errors.email}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Subject"
                                            value={formData.subject}
                                            onChange={handleInputChange("subject")}
                                            error={!!errors.subject}
                                            helperText={errors.subject}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Message"
                                            multiline
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleInputChange("message")}
                                            error={!!errors.message}
                                            helperText={errors.message}
                                            variant="outlined"
                                            disabled={isSubmitting}
                                        />

                                        {/* Centered Button */}
                                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                size="large"
                                                disabled={isSubmitting}
                                                startIcon={
                                                    isSubmitting ? <CircularProgress size={20} /> : <Send />
                                                }
                                                sx={{
                                                    py: 1.5,
                                                    px: 4,
                                                    fontSize: "1.1rem",
                                                    borderRadius: 2,
                                                    minWidth: "200px",
                                                }}
                                            >
                                                {isSubmitting ? "Sending..." : "Send Message"}
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Paper>
                        </motion.div>
                    </div>
                </Container>
            </motion.main>
        </div>
    );
}