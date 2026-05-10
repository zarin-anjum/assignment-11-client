import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
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
    <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="inline-block text-xs font-medium px-4 py-1.5 rounded-full bg-primary-light dark:bg-primary/20 text-primary dark:text-purple-300 mb-6">
            🏆 50+ active contests this month
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4"
        >
          Compete.{" "}
          <span className="text-primary">Create.</span>{" "}
          Win.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
          className="text-base text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto"
        >
          Join contests in design, writing, gaming & more — showcase your
          talent and earn real prizes.
        </motion.p>

        {/* Search bar */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex items-center gap-0 max-w-lg mx-auto rounded-xl overflow-hidden border-2 border-primary/40 hover:border-primary focus-within:border-primary bg-white dark:bg-slate-800 shadow-sm transition-colors mb-4"
        >
          <Search
            size={18}
            className="ml-4 text-slate-400 shrink-0"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by contest type e.g. Design, Writing..."
            className="flex-1 px-3 py-3.5 text-sm bg-transparent outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3.5 text-sm font-medium transition-colors shrink-0"
          >
            Search
          </button>
        </motion.form>

        {/*Popular Tags*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <span className="text-xs text-slate-400 dark:text-slate-500 self-center">
            Popular:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="text-xs px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary dark:hover:text-purple-300 transition-colors"
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;