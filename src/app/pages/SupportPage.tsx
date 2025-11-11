"use client";

import { useState } from "react";
import * as motion from "motion/react-client"

import { emailData, phoneData, faqData } from "../animations";
import { pageVariant, cardVariant } from "../animations";

// Interfaces for data types
interface EmailData {
  id: number;
  title: string;
  text: string;
  email: string;
}

interface PhoneData {
  id: number;
  title: string;
  text: string;
  phone: string;
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
}

export default function SupportPage() {
    const [activeTab, setActiveTab] = useState<"faq" | "email" | "phone">("faq"); // "faq" | "email" | "phone"
    const [openFaq, setOpenFaq] = useState<number | null>(null); // id of the opened FAQ

    /* -------------------------------------------------
        Enhanced Tab selector
        ------------------------------------------------- */
    const renderTabs = () => (
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            {([
                { key: "faq", label: "FAQ", icon: "❓", description: "Quick Answers" },
                { key: "email", label: "Email", icon: "📧", description: "Write to Us" },
                { key: "phone", label: "Phone", icon: "📞", description: "Call Support" }
            ] as const).map((tab) => (
                <motion.button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                        relative overflow-hidden px-4 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base
                        ${activeTab === tab.key
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl"
                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                        }
                    `}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Background shimmer effect for active tab */}
                    {activeTab === tab.key && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                    )}

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="text-2xl mb-2">{tab.icon}</span>
                        <span className="text-lg font-bold mb-1">{tab.label}</span>
                        <span className={`text-sm ${activeTab === tab.key ? 'text-blue-100' : 'text-gray-500'}`}>
                            {tab.description}
                        </span>
                    </div>
                </motion.button>
            ))}
        </div>
    );

    /* -------------------------------------------------
        Enhanced FAQ accordion with more animations
        ------------------------------------------------- */
    const renderFAQ = () => (
        <div className="max-w-4xl mx-auto">
            <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h3
                    className="text-2xl font-bold text-gray-800 mb-2"
                    animate={{
                        textShadow: [
                            "0 0 0px rgba(59, 130, 246, 0)",
                            "0 0 10px rgba(59, 130, 246, 0.3)",
                            "0 0 0px rgba(59, 130, 246, 0)"
                        ]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    Frequently Asked Questions
                </motion.h3>
                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Find quick answers to common questions
                </motion.p>
            </motion.div>

            <div className="space-y-4">
                {faqData.map(({ id, question, answer }: FAQData, index) => {
                    const isOpen = openFaq === id;
                    return (
                        <motion.div
                            key={id}
                            variants={cardVariant}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                            whileHover={{ scale: 1.01 }}
                        >
                            <motion.button
                                aria-expanded={isOpen}
                                onClick={() => setOpenFaq(isOpen ? null : id)}
                                className="w-full flex justify-between items-center p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:bg-gray-50 transition-colors duration-200"
                                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.02)" }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="flex items-center">
                                    <motion.div
                                        className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 360
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.span
                                            className="text-blue-600 font-bold text-sm"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                color: isOpen ? '#7c3aed' : '#2563eb'
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            {id}
                                        </motion.span>
                                    </motion.div>
                                    <motion.span
                                        className="font-semibold text-gray-800 text-lg"
                                        animate={{
                                            color: isOpen ? '#1e40af' : '#374151'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {question}
                                    </motion.span>
                                </div>

                                <motion.div
                                    animate={{
                                        rotate: isOpen ? 180 : 0,
                                        scale: isOpen ? 1.1 : 1
                                    }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                    className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors duration-200"
                                >
                                    <motion.svg
                                        className="w-4 h-4 text-blue-600"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        animate={{
                                            stroke: isOpen ? '#7c3aed' : '#2563eb'
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </motion.svg>
                                </motion.div>
                            </motion.button>

                            <motion.div
                                initial={false}
                                animate={{
                                    height: isOpen ? "auto" : 0,
                                    opacity: isOpen ? 1 : 0
                                }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                    opacity: { duration: 0.2 }
                                }}
                                className="overflow-hidden"
                            >
                                <motion.div
                                    className="px-6 pb-6"
                                    initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <motion.div
                                        className="w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 mb-4"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        style={{ originX: 0 }}
                                    />
                                    <motion.p
                                        className="text-gray-600 leading-relaxed text-base"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {answer}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Enhanced Help section */}
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.div
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-lg"
                    whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.h4
                        className="text-xl font-bold text-gray-800 mb-3"
                        animate={{
                            textShadow: [
                                "0 0 0px rgba(31, 41, 55, 0)",
                                "0 0 8px rgba(31, 41, 55, 0.2)",
                                "0 0 0px rgba(31, 41, 55, 0)"
                            ]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        Still need help?
                    </motion.h4>
                    <motion.p
                        className="text-gray-600 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Can't find what you're looking for? Our support team is here to help.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <motion.button
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg shadow-lg text-sm sm:text-base"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Contact Support
                        </motion.button>
                        <motion.button
                            className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 sm:px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "#f9fafb"
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Live Chat
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );

    /* -------------------------------------------------
        Enhanced Email / Phone cards
        ------------------------------------------------- */
    const renderCards = (data: EmailData[] | PhoneData[], type: "email" | "phone") => (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {type === "email" ? "Email Support Channels" : "Phone Support Lines"}
                </h3>
                <p className="text-gray-600">
                    {type === "email" ? "Reach out to our specialists via email" : "Speak directly with our support team"}
                </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item, index) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariant}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 flex flex-col h-full border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
                    >
                        {/* Header with enhanced icon */}
                        <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                <svg
                                    className="w-6 h-6 text-blue-600"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    {type === "email" ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    )}
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-1"></div>
                            </div>
                        </div>

                        <p className="text-gray-600 flex-1 mb-6 leading-relaxed">{item.text}</p>

                        {/* Contact button */}
                        <div className="mt-auto">
                            {type === "email" ? (
                                <a
                                    href={`mailto:${(item as EmailData).email}`}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email: {(item as EmailData).email}
                                </a>
                            ) : (
                                <a
                                    href={`tel:${(item as PhoneData).phone}`}
                                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call: {(item as PhoneData).phone}
                                </a>
                            )}
                        </div>

                        {/* Availability indicator */}
                        <div className="flex items-center justify-center mt-4 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            Available now
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Additional help section */}
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Need Immediate Assistance?</h4>
                    <p className="text-gray-600 mb-6">For urgent matters, our priority support line is available 24/7</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <div className="bg-white rounded-lg px-6 py-3 shadow-md border border-red-200">
                            <div className="text-red-600 font-bold text-lg">EMERGENCY: +1 (555) 911-HELP</div>
                            <div className="text-gray-500 text-sm">Available 24/7 for urgent situations</div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    /* -------------------------------------------------
       Main render (banner + content)
       ------------------------------------------------- */
    return (
        <motion.main
            /*  <--  NO top/bottom padding here – banner goes to the very top  -->  */
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100"
            variants={pageVariant}
            initial="hidden"
            animate="visible"
        >
            {/* -------------------------------------------------
          1️⃣  Blue‑to‑purple banner (full‑width, no surrounding padding)
          ------------------------------------------------- */}
            <div className="relative h-[300px] gradient-hero mb-12">
                <div className="absolute inset-0 bg-black opacity-30"></div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl font-bold mb-4">Support</h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        className="text-xl max-w-3xl"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        We're here to help! Choose how you'd like to get in touch or explore
                        the FAQ.
                    </motion.p>
                </div>
            </div>

            {/* -------------------------------------------------
          2️⃣  Inner content – now we give it its own vertical padding
          ------------------------------------------------- */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page title (kept for SEO & screen‑readers) */}
                <motion.h1
                    className="text-4xl font-extrabold text-gray-800 text-center mb-6"
                    variants={cardVariant}
                >
                    Support Center
                </motion.h1>

                {/* Tab navigation */}
                {renderTabs()}

                {/* Tab content */}
                <section>
                    {activeTab === "faq" && renderFAQ()}
                    {activeTab === "email" && renderCards(emailData, "email")}
                    {activeTab === "phone" && renderCards(phoneData, "phone")}
                </section>
            </div>
        </motion.main>
    );
}