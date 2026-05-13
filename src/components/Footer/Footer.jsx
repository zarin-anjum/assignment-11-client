import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-[#534AB7] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-base">C</span>
              </div>
              <span className="text-lg font-bold text-white">ContestHub</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs mb-6">
              The modern platform for creative contests. Compete in design,
              writing, gaming & more — and win real prizes.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#534AB7] flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-white transition-colors">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-[#534AB7] flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400 group-hover:text-white transition-colors">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Pages
            </p>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Contests", path: "/all-contests" },
                { name: "Leaderboard", path: "/leaderboard" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
              Categories
            </p>
            <ul className="space-y-3">
              {[
                "Image Design",
                "Article Writing",
                "Business Ideas",
                "Gaming Review",
                "Movie Review",
              ].map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/all-contests?search=${encodeURIComponent(cat)}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">
            Copyright © 2025 ContestHub. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with React · Node.js · MongoDB
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;