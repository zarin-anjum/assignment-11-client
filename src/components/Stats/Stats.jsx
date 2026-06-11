import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Trophy, Users, DollarSign, Star } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const StatCard = ({ icon: Icon, value, label, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 text-center"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${color}`}>
      <Icon size={22} />
    </div>
    <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
      {value}
    </div>
    <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
  </motion.div>
);

const Stats = () => {
  const axiosPublic = useAxiosPublic();

  const { data: contests = [] } = useQuery({
    queryKey: ["statsContests"],
    queryFn: () => axiosPublic.get("/contests").then((r) => r.data),
  });

  const { data: winners = [] } = useQuery({
    queryKey: ["statsWinners"],
    queryFn: () => axiosPublic.get("/contests/winners").then((r) => r.data),
  });

  const totalContests = contests.length;
  const totalParticipants = contests.reduce((acc, c) => acc + (c.participantsCount || 0), 0);
  const totalPrizeMoney = contests.reduce((acc, c) => acc + (c.prizeMoney || 0), 0);
  const totalWinners = winners.length;

  const STATS = [
    {
      icon: Trophy,
      value: `${totalContests}+`,
      label: "Active Contests",
      color: "bg-[#EEEDFE] dark:bg-[#534AB7]/20 text-[#534AB7]",
    },
    {
      icon: Users,
      value: `${totalParticipants}+`,
      label: "Total Participants",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600",
    },
    {
      icon: DollarSign,
      value: `$${totalPrizeMoney.toLocaleString()}+`,
      label: "Prize Money Available",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600",
    },
    {
      icon: Star,
      value: `${totalWinners}+`,
      label: "Winners Declared",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600",
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-medium text-primary uppercase tracking-widest mb-1">
            By the numbers
          </p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ContestHub in numbers
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;