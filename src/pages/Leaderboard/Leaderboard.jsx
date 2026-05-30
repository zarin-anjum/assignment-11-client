import { useQuery } from "@tanstack/react-query";
import { Loader2, Trophy, Medal } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { motion } from "framer-motion";

const rankConfig = {
  0: { icon: "🥇", bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-200 dark:border-amber-700/50", text: "text-amber-600 dark:text-amber-400" },
  1: { icon: "🥈", bg: "bg-slate-50 dark:bg-slate-700/30", border: "border-slate-200 dark:border-slate-600", text: "text-slate-500 dark:text-slate-400" },
  2: { icon: "🥉", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-200 dark:border-orange-700/50", text: "text-orange-600 dark:text-orange-400" },
};

const Leaderboard = () => {
  const axiosPublic = useAxiosPublic();

  const { data: leaders = [], isLoading, isError } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => axiosPublic.get("/users/leaderboard").then((r) => r.data),
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-[#534AB7]/20 text-[#534AB7] dark:text-purple-300 mb-4 shadow-sm">
            <Trophy size={12} /> Hall of Champions
          </span>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Top contestants ranked by number of contest wins
          </p>
        </div>

        {/* Top 3 podium */}
        {!isLoading && !isError && leaders.length >= 3 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* 2nd place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex flex-col items-center p-5 rounded-2xl border mt-6 ${rankConfig[1].bg} ${rankConfig[1].border}`}
            >
              <span className="text-3xl mb-2">{rankConfig[1].icon}</span>
              <img
                src={leaders[1]?.photo || `https://ui-avatars.com/api/?name=${leaders[1]?.name}&background=534AB7&color=fff`}
                alt={leaders[1]?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-300 mb-2"
              />
              <p className="text-sm font-semibold text-slate-800 dark:text-white text-center truncate w-full">
                {leaders[1]?.name}
              </p>
              <p className={`text-xs font-medium mt-1 ${rankConfig[1].text}`}>
                {leaders[1]?.wins} win{leaders[1]?.wins !== 1 ? "s" : ""}
              </p>
            </motion.div>

            {/* 1st place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className={`flex flex-col items-center p-5 rounded-2xl border ${rankConfig[0].bg} ${rankConfig[0].border} shadow-md`}
            >
              <span className="text-3xl mb-2">{rankConfig[0].icon}</span>
              <img
                src={leaders[0]?.photo || `https://ui-avatars.com/api/?name=${leaders[0]?.name}&background=534AB7&color=fff`}
                alt={leaders[0]?.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 mb-2"
              />
              <p className="text-sm font-semibold text-slate-800 dark:text-white text-center truncate w-full">
                {leaders[0]?.name}
              </p>
              <p className={`text-xs font-medium mt-1 ${rankConfig[0].text}`}>
                {leaders[0]?.wins} win{leaders[0]?.wins !== 1 ? "s" : ""}
              </p>
            </motion.div>

            {/* 3rd place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex flex-col items-center p-5 rounded-2xl border mt-6 ${rankConfig[2].bg} ${rankConfig[2].border}`}
            >
              <span className="text-3xl mb-2">{rankConfig[2].icon}</span>
              <img
                src={leaders[2]?.photo || `https://ui-avatars.com/api/?name=${leaders[2]?.name}&background=534AB7&color=fff`}
                alt={leaders[2]?.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-300 mb-2"
              />
              <p className="text-sm font-semibold text-slate-800 dark:text-white text-center truncate w-full">
                {leaders[2]?.name}
              </p>
              <p className={`text-xs font-medium mt-1 ${rankConfig[2].text}`}>
                {leaders[2]?.wins} win{leaders[2]?.wins !== 1 ? "s" : ""}
              </p>
            </motion.div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-[#534AB7]" />
          </div>
        )}

        {isError && (
          <div className="text-center py-20 text-slate-400">
            <p className="text-4xl mb-3">😕</p>
            <p className="text-sm">Failed to load leaderboard.</p>
          </div>
        )}

        {!isLoading && !isError && leaders.length === 0 && (
          <div className="text-center py-20 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">🏆</p>
            <p className="text-sm font-medium">No winners yet</p>
            <p className="text-xs mt-1">Winners will appear here once contests are decided</p>
          </div>
        )}

        {/* Full rankings table */}
        {!isLoading && !isError && leaders.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-white">
                Full Rankings
              </h2>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {leaders.map((leader, index) => (
                <motion.div
                  key={leader._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >

                  <div className="w-8 text-center">
                    {index < 3 ? (
                      <span className="text-lg">{rankConfig[index].icon}</span>
                    ) : (
                      <span className="text-sm font-bold text-slate-400 dark:text-slate-500">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <img
                    src={leader.photo || `https://ui-avatars.com/api/?name=${leader.name}&background=534AB7&color=fff`}
                    alt={leader.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {leader.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7] dark:text-purple-300">
                    <Medal size={12} />
                    {leader.wins} win{leader.wins !== 1 ? "s" : ""}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;