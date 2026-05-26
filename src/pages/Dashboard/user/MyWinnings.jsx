import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { Loader2, Trophy } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyWinnings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winnings = [], isLoading } = useQuery({
    queryKey: ["myWinnings", user?.email],
    queryFn: () => axiosSecure.get("/users/winnings").then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-[#534AB7]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          My Winnings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {winnings.length} contest{winnings.length !== 1 ? "s" : ""} won
        </p>
      </div>

      {winnings.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">🏆</p>
          <p className="text-sm font-medium">No wins yet — keep competing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {winnings.map((contest) => (
            <div
              key={contest._id}
              className="bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-700/50 rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-400 to-yellow-300" />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Trophy size={18} className="text-amber-500" />
                </div>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                  Winner
                </span>
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
                {contest.contestName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                {contest.type}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xs text-slate-400 dark:text-slate-500">Prize</span>
                <span className="text-sm font-bold text-amber-500">
                  ${contest.prizeMoney}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWinnings;