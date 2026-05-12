import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ContestCard from "../../components/ContestCard/ContestCard";
import { Search } from "lucide-react";

const TABS = [
  "All",
  "Image Design",
  "Article Writing",
  "Business Ideas",
  "Gaming Review",
  "Movie Review",
];

//Mock Data
const MOCK_CONTESTS = [
  {
    _id: "1",
    contestName: "Brand Identity Challenge",
    type: "Image Design",
    description: "Redesign a fictional startup's full visual identity — logo, colors, and typography.",
    prizeMoney: 500,
    entryFee: 10,
    deadline: "2026-06-15",
    participantsCount: 248,
    image: "",
  },
  {
    _id: "2",
    contestName: "Tech Future Essay Contest",
    type: "Article Writing",
    description: "Write a compelling article on AI's impact on society in 2030 and beyond.",
    prizeMoney: 300,
    entryFee: 5,
    deadline: "2026-06-20",
    participantsCount: 183,
    image: "",
  },
  {
    _id: "3",
    contestName: "Startup Pitch Competition",
    type: "Business Ideas",
    description: "Present your most innovative business idea to win seed funding and mentorship.",
    prizeMoney: 1000,
    entryFee: 15,
    deadline: "2026-06-25",
    participantsCount: 120,
    image: "",
  },
  {
    _id: "4",
    contestName: "Gaming Review Cup",
    type: "Gaming Review",
    description: "Write the best review for any game released in the past year. Judged on depth and style.",
    prizeMoney: 200,
    entryFee: 5,
    deadline: "2026-05-30",
    participantsCount: 95,
    image: "",
  },
  {
    _id: "5",
    contestName: "Logo Design Sprint",
    type: "Image Design",
    description: "Create a memorable logo for a fictional eco-friendly brand in under 48 hours.",
    prizeMoney: 400,
    entryFee: 10,
    deadline: "2026-06-10",
    participantsCount: 210,
    image: "",
  },
  {
    _id: "6",
    contestName: "Movie Critique Challenge",
    type: "Movie Review",
    description: "Craft an insightful critique of any classic film. Judged on originality and analysis.",
    prizeMoney: 150,
    entryFee: 5,
    deadline: "2026-06-18",
    participantsCount: 67,
    image: "",
  },
  {
    _id: "7",
    contestName: "Social Media Strategy",
    type: "Business Ideas",
    description: "Develop a 30-day social media growth strategy for a small business of your choice.",
    prizeMoney: 600,
    entryFee: 12,
    deadline: "2026-07-01",
    participantsCount: 88,
    image: "",
  },
  {
    _id: "8",
    contestName: "Indie Game Review Fest",
    type: "Gaming Review",
    description: "Shine a spotlight on an underrated indie game with a detailed and passionate review.",
    prizeMoney: 250,
    entryFee: 5,
    deadline: "2026-06-22",
    participantsCount: 112,
    image: "",
  },
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
    searchParams.get("search") || ""
  );

  const filtered = useMemo(() => {
    let result = MOCK_CONTESTS;

    if (activeTab !== "All") {
      result = result.filter((c) => c.type === activeTab);
    }

    const q = searchParams.get("search") || "";
    if (q) {
      result = result.filter(
        (c) =>
          c.type.toLowerCase().includes(q.toLowerCase()) ||
          c.contestName.toLowerCase().includes(q.toLowerCase())
      );
    }

    return result;
  }, [activeTab, searchParams]);

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

  const activeSearch = searchParams.get("search");

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
            {filtered.length} contest{filtered.length !== 1 ? "s" : ""} available
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
              Showing results for{" "}
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

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-sm font-medium">No contests found</p>
            <p className="text-xs mt-1">Try a different search or category</p>
          </div>
        )}

        {filtered.length > 0 && (
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