import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Trophy } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const CallToAction = () => {
  const { user } = useAuth();

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#2D2678] dark:bg-[#1E1A5E] rounded-3xl px-8 py-14 text-center overflow-hidden"
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Trophy size={26} className="text-amber-400" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to showcase your talent?
            </h2>
            <p className="text-sm text-purple-200/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of creators competing in design, writing, gaming, and more.
              Enter a contest today and win real prizes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {user ? (
                <Link
                  to="/all-contests"
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-slate-100 transition-colors"
                >
                  Browse Contests <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-primary font-semibold text-sm hover:bg-slate-100 transition-colors"
                  >
                    Get Started Free <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/all-contests"
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-colors border border-white/20"
                  >
                    Browse Contests
                  </Link>
                </>
              )}
            </div>

            <p className="text-xs text-purple-300/60 mt-6">
              No credit card required to browse · Join free today
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;