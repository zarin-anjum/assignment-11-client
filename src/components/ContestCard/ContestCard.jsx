import { Link } from "react-router-dom";
import { Users, Clock } from "lucide-react";

const typeConfig = {
  "Image Design": {
    bg: "bg-purple-50 dark:bg-purple-950/30",
    badge: "bg-primary-light text-primary-dark dark:bg-purple-900/50 dark:text-purple-300",
    emoji: "🎨",
  },
  "Article Writing": {
    bg: "bg-green-50 dark:bg-green-950/30",
    badge: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    emoji: "✍️",
  },
  "Business Ideas": {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300",
    emoji: "💡",
  },
  "Gaming Review": {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    emoji: "🎮",
  },
  "Movie Review": {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300",
    emoji: "🎬",
  },
};

const getConfig = (type) =>
  typeConfig[type] || {
    bg: "bg-slate-50 dark:bg-slate-800/50",
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    emoji: "🏆",
  };

const ContestCard = ({ contest }) => {
  const config = getConfig(contest?.type);

  const deadline = contest?.deadline
    ? new Date(contest.deadline).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "TBD";

  return (
    <div className="group border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-white dark:bg-slate-800 flex flex-col">
      <div
        className={`h-28 ${config.bg} flex items-center justify-center relative`}
      >
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
          {config.emoji}
        </span>
        <span
          className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium ${config.badge}`}
        >
          {contest?.type || "General"}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
          {contest?.contestName || "Untitled Contest"}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-1">
          {contest?.description || "No description available."}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <Users size={12} />
              {contest?.participantsCount ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {deadline}
            </span>
          </div>
          <Link to={`/contest/${contest?._id}`}>
            <button className="text-xs px-3 py-1.5 rounded-lg bg-primary-light dark:bg-primary/20 text-primary dark:text-purple-300 font-medium hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors duration-200">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;