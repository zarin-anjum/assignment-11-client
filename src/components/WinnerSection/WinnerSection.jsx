import { useQuery } from "@tanstack/react-query";
import { Trophy, DollarSign, Award, Loader2 } from "lucide-react";
import axios from "axios";

const PLACEHOLDER_WINNERS = [
  { _id: "1", winnerName: "Raihan K.", contestName: "Brand Identity Challenge", prize: "$500", initials: "RK" },
  { _id: "2", winnerName: "Sara J.", contestName: "Tech Future Essay", prize: "$300", initials: "SJ" },
  { _id: "3", winnerName: "Amir M.", contestName: "Startup Pitch 2025", prize: "$1,000", initials: "AM" },
  { _id: "4", winnerName: "Fatima N.", contestName: "Gaming Review Cup", prize: "$200", initials: "FN" },
  { _id: "5", winnerName: "James T.", contestName: "Logo Design Sprint", prize: "$400", initials: "JT" },
];

const STATS = [
  { icon: Award, label: "Total winners", value: "1,240+" },
  { icon: DollarSign, label: "Prize money paid", value: "$48K+" },
  { icon: Trophy, label: "Contests run", value: "320+" },
];

const WinnerSection = () => {
  const { data: winners = PLACEHOLDER_WINNERS, isLoading } = useQuery({
    queryKey: ["winners"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_API_URL}/contests/winners`)
        .then((r) => r.data),
    retry: false,
    onError: () => {},
  });

  const displayWinners = winners.length > 0 ? winners : PLACEHOLDER_WINNERS;

  return (
    <section className="py-16 px-4 bg-[#2D2678] dark:bg-[#1E1A5E] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-medium text-purple-300 uppercase tracking-widest mb-1">
            Hall of fame
          </p>
          <h2 className="text-2xl font-bold text-white mb-1">
            🏆 Hall of Champions
          </h2>
          <p className="text-sm text-purple-200/70">
            Celebrating our top contest winners
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white/10 border border-white/15 rounded-xl p-4 text-center"
            >
              <Icon size={18} className="text-purple-300 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-xs text-purple-200/70 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 size={24} className="animate-spin text-purple-300" />
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {displayWinners.map((winner) => (
              <div
                key={winner._id}
                className="shrink-0 w-44 bg-white/10 border border-white/15 rounded-xl p-4 hover:bg-white/15 transition-colors"
              >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold mb-3">
                  {winner.winnerPhoto ? (
                    <img
                      src={winner.winnerPhoto}
                      alt={winner.winnerName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    winner.initials ||
                    winner.winnerName?.slice(0, 2).toUpperCase()
                  )}
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  {winner.winnerName}
                </p>
                <p className="text-xs text-purple-200/70 mt-0.5 truncate">
                  {winner.contestName}
                </p>
                <p className="text-xs text-amber-300 mt-2 font-medium">
                  {winner.prize} prize
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WinnerSection;