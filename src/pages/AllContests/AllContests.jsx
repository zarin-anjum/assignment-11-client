import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2 } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ContestCard from "../../components/ContestCard/ContestCard";

const TABS = [
  "All",
  "Image Design",
  "Article Writing",
  "Business Ideas",
  "Gaming Review",
  "Movie Review",
];

const tabClass = {
  active: "bg-[#534AB7] text-white shadow-sm",
  inactive:
    "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-[#EEEDFE] hover:text-[#534AB7] dark:hover:bg-[#534AB7]/20",
};

const AllContests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("All");
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const axiosPublic = useAxiosPublic();

  const activeSearch = searchParams.get("search") || "";

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allContests", activeSearch],
    queryFn: () =>
      axiosPublic
        .get(
          `/contests${activeSearch ? `?search=${encodeURIComponent(activeSearch)}` : ""}`,
        )
        .then((r) => r.data),
  });

  const filtered = useMemo(() => {
    if (activeTab === "All") return contests;
    return contests.filter((c) => c.type === activeTab);
  }, [activeTab, contests]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
      setActiveTab("All");
    } else {
      setSearchParams({});
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({});
    setSearchInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-xs font-medium text-[#534AB7] uppercase tracking-widest mb-1">
            Browse
          </p>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            All Contests
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filtered.length} contest{filtered.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-md mb-8 rounded-xl overflow-hidden border-2 border-[#534AB7]/30 hover:border-[#534AB7]/60 focus-within:border-[#534AB7] bg-white dark:bg-slate-800 shadow-sm transition-colors"
        >
          <Search size={16} className="ml-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name or type..."
            className="flex-1 px-3 py-3 text-sm bg-transparent outline-none text-slate-800 dark:text-white placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="bg-[#534AB7] hover:bg-[#3C3489] text-white px-5 py-3 text-sm font-medium transition-colors shrink-0"
          >
            Search
          </button>
        </form>

        {activeSearch && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Results for{" "}
              <span className="font-medium text-[#534AB7]">
                "{activeSearch}"
              </span>
            </span>
            <button
              onClick={() => {
                setSearchParams({});
                setSearchInput("");
              }}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 transition-colors"
            >
              ✕ Clear
            </button>
          </div>
        )}

        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`text-xs px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab ? tabClass.active : tabClass.inactive
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-24">
            <Loader2 size={28} className="animate-spin text-[#534AB7]" />
          </div>
        )}

        {isError && (
          <div className="text-center py-24 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-sm font-medium">Failed to load contests.</p>
            <p className="text-xs mt-1">Make sure your server is running.</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="text-center py-24 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm font-medium">No contests found</p>
            <p className="text-xs mt-1">Try a different search or category</p>
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
    </div>
  );
};

export default AllContests;
