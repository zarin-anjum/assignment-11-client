import { motion } from "framer-motion";
import {
  Trophy,
  Users,
  DollarSign,
  Globe,
  Target,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { Helmet } from "react-helmet";

const STATS = [
  {
    icon: Trophy,
    value: "320+",
    label: "Contests Hosted",
    color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
  },
  {
    icon: Users,
    value: "1,200+",
    label: "Active Participants",
    color: "bg-green-50 dark:bg-green-900/20 text-green-600",
  },
  {
    icon: DollarSign,
    value: "$48K+",
    label: "Prize Money Awarded",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
  },
  {
    icon: Globe,
    value: "15+",
    label: "Countries Represented",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Merit-Based",
    desc: "We believe the best work should win. Every contest is judged fairly and transparently by the contest creator.",
    color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
  },
  {
    icon: Zap,
    title: "Fast & Efficient",
    desc: "From contest creation to winner declaration — our platform makes the entire process smooth and quick.",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
  },
  {
    icon: Shield,
    title: "Secure & Trustworthy",
    desc: "All payments are processed securely. Your data is protected with JWT authentication and encrypted storage.",
    color: "bg-green-50 dark:bg-green-900/20 text-green-600",
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "ContestHub is built for creators and participants alike. We celebrate every win and every submission.",
    color: "bg-rose-50 dark:bg-rose-900/20 text-rose-600",
  },
];

const TIMELINE = [
  {
    year: "2024",
    title: "ContestHub Founded",
    desc: "Started with a simple idea — make creative competitions accessible to everyone.",
  },
  {
    year: "2024",
    title: "First 100 Contests",
    desc: "Reached our first milestone with contests spanning design, writing, and gaming.",
  },
  {
    year: "2025",
    title: "$10K in Prizes",
    desc: "Our creators collectively awarded over $10,000 in prize money to winners.",
  },
  {
    year: "2025",
    title: "Going Global",
    desc: "Participants from 15+ countries joined ContestHub, making it a truly global platform.",
  },
];

const Impact = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
      <Helmet>
        <title>ContestHub – Impact</title>
      </Helmet>

      <section className="px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-medium px-4 py-1.5 rounded-full bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7] dark:text-purple-300 mb-4"
          >
            Our story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Making Creative Competitions{" "}
            <span className="text-[#534AB7]">Accessible to All</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto"
          >
            ContestHub was built to give talented individuals a fair stage to
            showcase their skills, win real prizes, and connect with a global
            community of creators.
          </motion.p>
        </div>
      </section>

      <section className="px-4 mb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${color}`}
              >
                <Icon size={22} />
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {value}
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-500">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 mb-16 bg-white dark:bg-slate-800/50 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium text-[#534AB7] uppercase tracking-widest mb-1">
              What we stand for
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
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

      <section className="px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-medium text-[#534AB7] uppercase tracking-widest mb-1">
              How we got here
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Journey
            </h2>
          </div>
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-16 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-8">
              {TIMELINE.map(({ year, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-32 shrink-0 text-right">
                    <span className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] dark:bg-[#534AB7]/20 px-2 py-1 rounded-full">
                      {year}
                    </span>
                  </div>
                  <div className="relative pt-0.5">
                    <div className="absolute -left-6.25 top-1.5 w-3 h-3 rounded-full bg-[#534AB7] border-2 border-white dark:border-slate-900" />
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
