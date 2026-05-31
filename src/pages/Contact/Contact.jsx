import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const inputClass =
  "w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#534AB7] transition-colors";
const labelClass =
  "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "support@contesthub.com",
    color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    color: "bg-green-50 dark:bg-green-900/20 text-green-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1234 567890",
    color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
  },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    toast.success("Message sent! We'll get back to you soon.");
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16 px-4">
      <Helmet>
        <title>ContestHub – Contact</title>
      </Helmet>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-medium px-4 py-1.5 rounded-full bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7] dark:text-purple-300 mb-4"
          >
            Get in touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-3"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto"
          >
            Have a question, feedback, or just want to say hi? We'd love to hear
            from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 flex items-center gap-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">
                    {label}
                  </p>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">
                    {value}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Map placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden h-40 flex items-center justify-center"
            >
              <div className="text-center text-slate-400 dark:text-slate-500">
                <MapPin size={28} className="mx-auto mb-2" />
                <p className="text-xs">Dhaka, Bangladesh</p>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="john@example.com"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Subject</label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  placeholder="How can we help?"
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 20,
                      message: "Message must be at least 20 characters",
                    },
                  })}
                  rows={5}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
