import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";
import ContestCard from "../ContestCard/ContestCard";

const TABS = [
  "All",
  "Image Design",
  "Article Writing",
  "Business Ideas",
  "Gaming Review",
  "Movie Review",
];

const PopularContests = () => {
  const [activeTab, setActiveTab] = useState("All");

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["popularContests"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/contests?sort=popular&limit=6`)
        .then((r) => r.data),
  });

  const filtered =
    activeTab === "All"
      ? contests
      : contests.filter((c) => c.type === activeTab);

  const tabClass = {
    active: "bg-[#534AB7] text-white shadow-sm",
    inactive:
      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#EEEDFE] hover:text-[#534AB7] dark:hover:bg-[#534AB7]/20",
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
              Trending now
            </p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Popular contests
            </h2>
          </div>
          <Link
            to="/all-contests"
            className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
          >
            Show all <ChevronRight size={16} />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? tabClass.active
                  : tabClass.inactive
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-sm">
              Failed to load contests. Please try again.
            </p>
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm">No contests found for this category.</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((contest) => (
              <ContestCard key={contest._id} contest={contest} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularContests;
