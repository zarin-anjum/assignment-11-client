import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader2, Pencil, Trash2, Eye } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const statusBadge = {
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  approved:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: contests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myContests"],
    queryFn: () => axiosSecure.get("/contests/my").then((r) => r.data),
  });

  const { mutate: deleteContest } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/contests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myContests"]);
      toast.success("Contest deleted");
    },
    onError: () => toast.error("Failed to delete"),
  });

  const totalContests = contests.length;
  const approvedContests = contests.filter(
    (c) => c.status === "approved",
  ).length;
  const pendingContests = contests.filter((c) => c.status === "pending").length;
  const totalSubmissions = contests.reduce(
    (acc, c) => acc + (c.submissions?.length || 0),
    0,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            My Contests
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {contests.length} contest{contests.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link
          to="/dashboard/add-contest"
          className="text-sm px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
        >
          + Add Contest
        </Link>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Contests",
            value: totalContests,
            color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
            icon: "🏆",
          },
          {
            label: "Approved",
            value: approvedContests,
            color: "bg-green-50 dark:bg-green-900/20 text-green-600",
            icon: "✅",
          },
          {
            label: "Pending",
            value: pendingContests,
            color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
            icon: "⏳",
          },
          {
            label: "Total Submissions",
            value: totalSubmissions,
            color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
            icon: "📥",
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

      {contests.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm font-medium">No contests yet</p>
          <Link
            to="/dashboard/add-contest"
            className="text-xs text-primary hover:underline mt-2 inline-block"
          >
            Create your first contest →
          </Link>
        </div>
      )}

      {contests.length > 0 && (
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
                    Deadline
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {contests.map((contest) => (
                  <tr
                    key={contest._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">
                      {contest.contestName}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                      {contest.type}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(contest.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge[contest.status]}`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to="/dashboard/submitted-tasks"
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-[#EEEDFE] text-[#534AB7] hover:bg-[#534AB7] hover:text-white transition-colors font-medium"
                        >
                          <Eye size={13} /> Submissions
                        </Link>

                        {contest.status === "pending" && (
                          <>
                            <Link
                              to={`/dashboard/edit-contest/${contest._id}`}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors font-medium"
                            >
                              <Pencil size={13} /> Edit
                            </Link>
                            <button
                              onClick={() => {
                                if (window.confirm("Delete this contest?")) {
                                  deleteContest(contest._id);
                                }
                              }}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors font-medium"
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyContests;
