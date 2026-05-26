import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Loader2, Pencil, Trash2, Eye } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const statusBadge = {
  pending:  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const MyContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: contests = [], isLoading, isError } = useQuery({
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

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-[#534AB7]" />
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
          className="text-sm px-4 py-2 rounded-xl bg-[#534AB7] hover:bg-[#3C3489] text-white font-medium transition-colors"
        >
          + Add Contest
        </Link>
      </div>

      {contests.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm font-medium">No contests yet</p>
          <Link
            to="/dashboard/add-contest"
            className="text-xs text-[#534AB7] hover:underline mt-2 inline-block"
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
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Contest</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Deadline</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {contests.map((contest) => (
                  <tr key={contest._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">
                      {contest.contestName}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                      {contest.type}
                    </td>
                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(contest.deadline).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge[contest.status]}`}>
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