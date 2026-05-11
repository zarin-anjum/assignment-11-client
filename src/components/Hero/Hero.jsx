import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const POPULAR_TAGS = [
  "Image Design",
  "Article Writing",
  "Business Ideas",
  "Gaming Review",
  "Movie Review",
];

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/all-contests?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleTagClick = (tag) => {
    navigate(`/all-contests?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-100 dark:bg-slate-900">
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          backgroundImage: `linear-gradient(#534AB715 1px, transparent 1px), linear-gradient(90deg, #534AB715 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-[#534AB7]/20 text-[#534AB7] dark:text-purple-300 mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            50+ active contests this month
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-4"
        >
          Compete.{" "}
          <span className="relative inline-block">
            <span className="text-[#534AB7]">Create.</span>
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6 Q50 2 100 5 Q150 8 198 4"
                stroke="#534AB7"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </span>{" "}
          Win.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Join contests in design, writing, gaming & more — showcase your talent
          and earn real prizes.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex items-center max-w-lg mx-auto rounded-xl overflow-hidden border-2 border-[#534AB7]/30 hover:border-[#534AB7]/60 focus-within:border-[#534AB7] bg-white dark:bg-slate-800 shadow-md shadow-[#534AB7]/10 transition-colors mb-4"
        >
          <Search size={17} className="ml-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by contest type e.g. Design, Writing..."
            className="flex-1 px-3 py-3.5 text-sm bg-transparent outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="bg-[#534AB7] hover:bg-[#3C3489] text-white px-6 py-3.5 text-sm font-medium transition-colors shrink-0"
          >
            Search
          </button>
        </motion.form>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
            Popular:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-[#534AB7] hover:text-[#534AB7] dark:hover:text-purple-300 bg-white dark:bg-slate-800 transition-colors"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-slate-300 dark:text-slate-600"
          >
            <ArrowDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
