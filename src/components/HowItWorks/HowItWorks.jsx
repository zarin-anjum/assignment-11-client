import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    emoji: "🔍",
    title: "Browse contests",
    desc: "Explore contests by category — design, writing, gaming, and more.",
    color: "bg-primary-light dark:bg-primary/20 text-primary dark:text-purple-300",
  },
  {
    step: "02",
    emoji: "💳",
    title: "Register & pay",
    desc: "Pay a small entry fee to register. All fees go into the prize pool.",
    color: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300",
  },
  {
    step: "03",
    emoji: "🚀",
    title: "Submit your work",
    desc: "Upload your submission before the deadline and wait for the results.",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
  },
  {
    step: "04",
    emoji: "🏆",
    title: "Win prizes",
    desc: "Winners are declared by the creator. Get recognized and rewarded.",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-300",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
            Simple process
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            How it works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, emoji, title, desc, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 relative"
            >
              <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 dark:text-slate-600">
                {step}
              </span>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${color}`}
              >
                {emoji}
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;