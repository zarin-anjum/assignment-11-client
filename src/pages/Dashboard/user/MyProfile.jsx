import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Loader2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#534AB7] transition-colors";
const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";

const COLORS = ["#534AB7", "#e2e8f0"];

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["dbUser", user?.email],
    queryFn: () => axiosSecure.get("/users/me").then((r) => r.data),
  });

  const { data: participated = [] } = useQuery({
    queryKey: ["participatedCount", user?.email],
    queryFn: () => axiosSecure.get("/users/participated").then((r) => r.data),
  });

  const { data: winnings = [] } = useQuery({
    queryKey: ["winningsCount", user?.email],
    queryFn: () => axiosSecure.get("/users/winnings").then((r) => r.data),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (dbUser) {
      reset({
        name: user?.displayName || "",
        photo: user?.photoURL || "",
        bio: dbUser?.bio || "",
      });
    }
  }, [dbUser, user, reset]);

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async ({ name, photo, bio }) => {
      await updateUserProfile(name, photo);
      await axiosSecure.patch("/users/me", { name, photo, bio });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["dbUser"]);
      toast.success("Profile updated!");
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const winCount = winnings.length;
  const participatedCount = participated.length;
  const winRate = participatedCount > 0
    ? Math.round((winCount / participatedCount) * 100)
    : 0;

  const chartData = [
    { name: "Wins", value: winCount },
    { name: "Others", value: Math.max(participatedCount - winCount, 0) },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 size={28} className="animate-spin text-[#534AB7]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account and view your stats
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5">
            Update Profile
          </h2>

          <div className="flex justify-center mb-5">
            <img
              src={user?.photoURL || "https://i.pravatar.cc/100"}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-[#EEEDFE] dark:border-[#534AB7]/30"
            />
          </div>

          <form onSubmit={handleSubmit(updateProfile)} className="space-y-4">
            <div>
              <label className={labelClass}>Display Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className={inputClass}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelClass}>Photo URL</label>
              <input
                {...register("photo")}
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                {...register("bio")}
                rows={3}
                placeholder="Tell us a bit about yourself..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#534AB7] hover:bg-[#3C3489] text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isPending ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Save Changes"}
            </button>
          </form>
        </div>

        <div className="space-y-4">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Participated", value: participatedCount },
              { label: "Wins", value: winCount },
              { label: "Win Rate", value: `${winRate}%` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-[#534AB7]">{value}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">{label}</div>
              </div>
            ))}
          </div>

          {/* Win percentage chart */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
              Win Percentage
            </h2>
            {participatedCount === 0 ? (
              <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                <p className="text-3xl mb-2">📊</p>
                <p className="text-xs">Join contests to see your stats</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;