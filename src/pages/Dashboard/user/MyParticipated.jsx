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
    queryFn: () =>
      axiosSecure
        .get(`/users/participated`)
        .then((r) => r.data),
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
          My Participated Contests
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {contests.length} contest{contests.length !== 1 ? "s" : ""} joined
        </p>
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
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Contest</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Entry Fee</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Deadline</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {contests
                  .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                  .map((contest) => {
                    const isEnded = new Date(contest.deadline) < new Date();
                    return (
                      <tr key={contest._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">
                          <Link to={`/contest/${contest._id}`} className="hover:text-[#534AB7] transition-colors">
                            {contest.contestName}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">{contest.type}</td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">${contest.entryFee}</td>
                        <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {new Date(contest.deadline).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            isEnded
                              ? "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                              : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          }`}>
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