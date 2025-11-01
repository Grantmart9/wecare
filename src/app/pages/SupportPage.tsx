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
       Tab selector
       ------------------------------------------------- */
    const renderTabs = () => (
        <div className="flex gap-4 mb-8 justify-center">
            {(["faq", "email", "phone"] as const).map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
            px-4 py-2 rounded-md font-medium transition-colors
            ${activeTab === tab
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }
          `}
                >
                    {tab.toUpperCase()}
                </button>
            ))}
        </div>
    );

    /* -------------------------------------------------
       FAQ accordion
       ------------------------------------------------- */
    const renderFAQ = () => (
        <div className="space-y-4">
            {faqData.map(({ id, question, answer }: FAQData) => {
                const isOpen = openFaq === id;
                return (
                    <motion.div
                        key={id}
                        variants={cardVariant}
                        initial="hidden"
                        animate="visible"
                        className="bg-white rounded-lg shadow-sm overflow-hidden"
                    >
                        <button

                            aria-expanded={isOpen}
                            onClick={() => setOpenFaq(isOpen ? null : id)}
                            className="w-full flex justify-between items-center p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                        >
                            <span className="font-semibold text-gray-800">{question}</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                                    } text-gray-500`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 text-gray-600"
                            >
                                {answer}
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );

    /* -------------------------------------------------
       Email / Phone cards
       ------------------------------------------------- */
    const renderCards = (data: EmailData[] | PhoneData[], type: "email" | "phone") => (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item) => (
                <motion.div
                    key={item.id}
                    variants={cardVariant}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-xl shadow-md p-5 flex flex-col h-full"
                >
                    {/* Header (icon + title) */}
                    <div className="flex items-center mb-4">
                        <svg
                            className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            {type === "email" ? (
                                // envelope‑like
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 12H8m8 0l-4-4m0 8l-4-4"
                                />
                            ) : (
                                // phone‑like
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5h18M3 10h18M3 15h18M3 20h18"
                                />
                            )}
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800">
                            {item.title}
                        </h3>
                    </div>

                    <p className="text-gray-600 flex-1 mb-4">{item.text}</p>

                    {type === "email" ? (
                        <a
                            href={`mailto:${(item as EmailData).email}`}
                            className="mt-auto text-blue-600 hover:underline font-medium"
                        >
                            Email: {(item as EmailData).email}
                        </a>
                    ) : (
                        <a
                            href={`tel:${(item as PhoneData).phone}`}
                            className="mt-auto text-blue-600 hover:underline font-medium"
                        >
                            Call: {(item as PhoneData).phone}
                        </a>
                    )}
                </motion.div>
            ))}
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
            <div className="relative h-[300px] bg-gradient-to-r from-blue-600 to-purple-700 mb-12">
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