// Animation variants
export const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const pageVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Data interfaces
export interface EmailData {
  id: number;
  title: string;
  text: string;
  email: string;
}

export interface PhoneData {
  id: number;
  title: string;
  text: string;
  phone: string;
}

export interface FAQData {
  id: number;
  question: string;
  answer: string;
}

// data/index.ts
export const emailData: EmailData[] = [
  {
    id: 1,
    title: "General Support",
    text: "For help with account issues, technical assistance, or general questions.",
    email: "support@example.com",
  },
  {
    id: 2,
    title: "Donations",
    text: "Reach out if you'd like to make a one‑time or recurring contribution.",
    email: "donate@example.com",
  },
  {
    id: 3,
    title: "Partnerships",
    text: "Interested in collaborating with us? Let's connect via email.",
    email: "partners@example.com",
  },
];

export const phoneData: PhoneData[] = [
  {
    id: 1,
    title: "Customer Support",
    text: "Mon – Fri, 9 am – 6 pm – quick help with urgent issues.",
    phone: "+1 234 567 8901",
  },
  {
    id: 2,
    title: "Donor Assistance",
    text: "Questions about your donation? Call us directly.",
    phone: "+1 234 567 8902",
  },
  {
    id: 3,
    title: "Media Inquiries",
    text: "Journalists and media partners can reach us here.",
    phone: "+1 234 567 8903",
  },
];

export const faqData: FAQData[] = [
  {
    id: 1,
    question: "What is the purpose of the Support Center?",
    answer:
      "The Support Center is designed to provide assistance with common issues, connect you with our team, and answer frequently asked questions.",
  },
  {
    id: 2,
    question: "How can I donate to the organization?",
    answer:
      "You can donate online through our secure Donate page, or reach out via email/phone if you prefer other options.",
  },
  {
    id: 3,
    question: "Are donations tax‑deductible?",
    answer:
      "Yes, all contributions are tax‑deductible. You will receive a confirmation email with your donation receipt.",
  },
  {
    id: 4,
    question: "Can I volunteer instead of donating money?",
    answer:
      "Absolutely! We welcome volunteers for various programs. Visit our Volunteer page to learn more.",
  },
  {
    id: 5,
    question: "How do I contact support for urgent issues?",
    answer:
      "For urgent matters, we recommend calling our support hotline directly to get immediate assistance.",
  },
];