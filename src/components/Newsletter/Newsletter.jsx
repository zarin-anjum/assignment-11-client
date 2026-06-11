import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    toast.success("You're subscribed! 🎉");
    reset();
  };

  return (
    <section className="py-16 px-4 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-primary-light dark:bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Mail size={24} className="text-primary" />
          </div>

          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-2">
            Stay in the loop
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Subscribe to our Newsletter
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Get notified about new contests, winners, and platform updates. No spam — just the good stuff.
          </p>

          {submitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50 rounded-xl px-6 py-4 inline-block">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                🎉 You're subscribed! Thanks for joining.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-primary transition-colors"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 text-left">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          )}

          <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;