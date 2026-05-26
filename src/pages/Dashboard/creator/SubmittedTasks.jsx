import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trophy, ExternalLink } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SubmittedTasks = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedContest, setSelectedContest] = useState(null);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["myContestsWithSubmissions"],
    queryFn: () => axiosSecure.get("/contests/my").then((r) => r.data),
  });

  const { mutate: declareWinner, isPending } = useMutation({
    mutationFn: ({ contestId, winner }) =>
      axiosSecure.patch(`/contests/${contestId}/winner`, winner),
    onSuccess: () => {
      queryClient.invalidateQueries(["myContestsWithSubmissions"]);
      toast.success("Winner declared!");
    },
    onError: () => toast.error("Failed to declare winner"),
  });

  const contestsWithSubmissions = contests.filter(
    (c) => c.submissions?.length > 0
  );

  const activeContest = selectedContest
    ? contests.find((c) => c._id === selectedContest)
    : contestsWithSubmissions[0];

  const isDeadlinePassed = activeContest
    ? new Date(activeContest.deadline) < new Date()
    : false;

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
          Submitted Tasks
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          View submissions and declare winners after the deadline
        </p>
      </div>

      {contestsWithSubmissions.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-sm font-medium">No submissions yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Contests
            </p>
            {contestsWithSubmissions.map((c) => (
              <button
                key={c._id}
                onClick={() => setSelectedContest(c._id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                  (selectedContest === c._id) || (!selectedContest && c._id === contestsWithSubmissions[0]?._id)
                    ? "bg-[#534AB7] text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-[#534AB7]/50"
                }`}
              >
                <p className="font-medium truncate">{c.contestName}</p>
                <p className={`text-xs mt-0.5 ${
                  (selectedContest === c._id) || (!selectedContest && c._id === contestsWithSubmissions[0]?._id)
                    ? "text-purple-200" : "text-slate-400"
                }`}>
                  {c.submissions.length} submission{c.submissions.length !== 1 ? "s" : ""}
                </p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-3">
            {activeContest && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    {activeContest.contestName}
                  </h2>
                  {activeContest.winner?.name && (
                    <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-medium">
                      🏆 Winner: {activeContest.winner.name}
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {activeContest.submissions.map((sub, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={sub.userPhoto || "https://i.pravatar.cc/100"}
                          alt={sub.userName}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-800 dark:text-white">
                            {sub.userName}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">
                            {sub.userEmail}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href={sub.submissionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                        >
                          <ExternalLink size={12} /> View Submission
                        </a>

                        {isDeadlinePassed && !activeContest.winner?.name && (
                          <button
                            disabled={isPending}
                            onClick={() =>
                              declareWinner({
                                contestId: activeContest._id,
                                winner: {
                                  name: sub.userName,
                                  photo: sub.userPhoto,
                                  email: sub.userEmail,
                                },
                              })
                            }
                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors font-medium disabled:opacity-50"
                          >
                            <Trophy size={12} /> Declare Winner
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedTasks;