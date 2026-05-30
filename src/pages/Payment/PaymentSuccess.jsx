import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState("loading"); 
  const [contestId, setContestId] = useState(null);

  useEffect(() => {
    const cId = searchParams.get("contestId");
    const sessionId = searchParams.get("session_id");

    if (!cId || !sessionId) {
      setStatus("error");
      return;
    }

    setContestId(cId);

    // verify payment and register user
    axiosSecure
      .get(`/payment/success?contestId=${cId}&session_id=${sessionId}`)
      .then(() => {
        setStatus("success");
        queryClient.invalidateQueries(["contest", cId]);
        queryClient.invalidateQueries(["participatedContests"]);
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">

        {status === "loading" && (
          <>
            <Loader2 size={40} className="animate-spin text-[#534AB7] mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              Verifying your payment...
            </h2>
            <p className="text-sm text-slate-400 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Payment Successful!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              You're now registered for the contest. Good luck! 🎉
            </p>
            <div className="flex flex-col gap-3">
              {contestId && (
                <Link
                  to={`/contest/${contestId}`}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors"
                >
                  Back to Contest
                </Link>
              )}
              <Link
                to="/dashboard/my-participated"
                className="w-full py-2.5 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                View My Contests
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              We couldn't verify your payment. Please contact support if you were charged.
            </p>
            <Link
              to="/all-contests"
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#534AB7] text-white hover:bg-[#3C3489] transition-colors inline-block"
            >
              Back to Contests
            </Link>
          </>
        )}

      </div>
    </div>
  );
};

export default PaymentSuccess;