import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Check, X, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 5;

const statusBadge = {
  pending:  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  approved: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: contests = [], isLoading, isError } = useQuery({
    queryKey: ["adminContests"],
    queryFn: () => axiosSecure.get("/contests/all-admin").then((r) => r.data),
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ id, status }) =>
      axiosSecure.patch(`/contests/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminContests"]);
      toast.success("Contest status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const { mutate: deleteContest } = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/contests/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminContests"]);
      const newTotal = contests.length - 1;
      const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
      if (currentPage > newTotalPages) setCurrentPage(Math.max(1, newTotalPages));
      toast.success("Contest deleted");
    },
    onError: () => toast.error("Failed to delete contest"),
  });

  const totalPages = Math.ceil(contests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = contests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-4xl mb-3">😕</p>
        <p className="text-sm">Failed to load contests.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Manage Contests
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {contests.length} total contests · Page {currentPage} of {totalPages || 1}
        </p>
      </div>

      {contests.length === 0 && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm">No contests yet</p>
        </div>
      )}

      {/* Table */}
      {contests.length > 0 && (
        <>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">#</th>
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Contest</th>
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Type</th>
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Creator</th>
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Status</th>
                    <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {paginated.map((contest, index) => (
                    <tr
                      key={contest._id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-5 py-4 text-slate-400 dark:text-slate-500 text-xs">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-800 dark:text-white">
                        {contest.contestName}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                        {contest.type}
                      </td>
                      <td className="px-5 py-4 text-slate-500 dark:text-slate-400 text-xs">
                        {contest.createdBy}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusBadge[contest.status]}`}>
                          {contest.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {contest.status === "pending" && (
                            <>
                              <button
                                onClick={() => updateStatus({ id: contest._id, status: "approved" })}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors font-medium"
                              >
                                <Check size={13} /> Confirm
                              </button>
                              <button
                                onClick={() => updateStatus({ id: contest._id, status: "rejected" })}
                                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors font-medium"
                              >
                                <X size={13} /> Reject
                              </button>
                            </>
                          )}
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
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, contests.length)} of {contests.length} contests
              </p>

              <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={15} />
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      page === currentPage
                        ? "bg-primary text-white"
                        : "border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageContests;