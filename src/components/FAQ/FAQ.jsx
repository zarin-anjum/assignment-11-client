import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I participate in a contest?",
    a: "Simply browse the All Contests page, click on a contest you like, and click the Register button. You'll be taken to a secure payment page to pay the entry fee. After successful payment, you're registered and can submit your work.",
  },
  {
    q: "How are winners decided?",
    a: "Winners are declared by the contest creator after the submission deadline passes. The creator reviews all submitted tasks and selects one winner. The winner's name and photo are then displayed publicly on the contest page.",
  },
  {
    q: "Can I edit my contest after submitting it?",
    a: "Yes, but only before an admin approves it. Once your contest is approved, editing is disabled. Make sure all details are correct before submission.",
  },
  {
    q: "How do I become a Contest Creator?",
    a: "Register a normal account first, then contact an admin to have your role upgraded to Creator. Once upgraded, you'll have access to the Creator Dashboard where you can add and manage contests.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes — all payments are processed through Stripe's secure hosted checkout page. ContestHub never stores your card details. Stripe is PCI-DSS compliant and used by millions of businesses worldwide.",
  },
  {
    q: "What happens if a contest gets rejected by admin?",
    a: "If your contest is rejected, it won't appear on the public listings. You can delete it and create a new one with the required changes. Admin may provide a reason for rejection.",
  },
];

const FAQItem = ({ q, a, isOpen, onClick }) => (
  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 text-left bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
    >
      <span className="text-sm font-medium text-slate-800 dark:text-white pr-4">
        {q}
      </span>
      <ChevronDown
        size={16}
        className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed bg-slate-100 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            {a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
            Got questions?
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;