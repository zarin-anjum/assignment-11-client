import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { Loader2, Clock } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["participatedContests", user?.email],
    queryFn: () => axiosSecure.get(`/users/participated`).then((r) => r.data),
  });

  const totalParticipated = contests.length;
  const ongoingContests = contests.filter(
    (c) => new Date(c.deadline) > new Date(),
  ).length;
  const endedContests = contests.filter(
    (c) => new Date(c.deadline) < new Date(),
  ).length;

  const { data: winnings = [] } = useQuery({
    queryKey: ["myWinnings", user?.email],
    queryFn: () => axiosSecure.get("/users/winnings").then((r) => r.data),
  });

  const totalWins = winnings.length;
  const winRate =
    totalParticipated > 0
      ? Math.round((totalWins / totalParticipated) * 100)
      : 0;

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
          My Participated Contests
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {contests.length} contest{contests.length !== 1 ? "s" : ""} joined
        </p>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Participated",
            value: totalParticipated,
            color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
            icon: "🎯",
          },
          {
            label: "Total Wins",
            value: totalWins,
            color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
            icon: "🏆",
          },
          {
            label: "Ongoing",
            value: ongoingContests,
            color: "bg-green-50 dark:bg-green-900/20 text-green-600",
            icon: "⏳",
          },
          {
            label: "Win Rate",
            value: `${winRate}%`,
            color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
            icon: "📊",
          },
        ].map(({ label, value, color, icon }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${color}`}
            >
              {icon}
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {value}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {contests.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">🎯</p>
          <p className="text-sm font-medium">No contests joined yet</p>
          <Link
            to="/all-contests"
            className="text-xs text-[#534AB7] hover:underline mt-2 inline-block"
          >
            Browse contests →
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Contest
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Type
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Entry Fee
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Deadline
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {contests
                  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                  .map((contest) => {
                    const isEnded = new Date(contest.deadline) < new Date();
                    return (
                      <tr
                        key={contest._id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">
                          <Link
                            to={`/contest/${contest._id}`}
                            className="hover:text-[#534AB7] transition-colors"
                          >
                            {contest.contestName}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          {contest.type}
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          ${contest.entryFee}
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {new Date(contest.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              isEnded
                                ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            }`}
                          >
                            {isEnded ? "Ended" : "Ongoing"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyParticipated;
