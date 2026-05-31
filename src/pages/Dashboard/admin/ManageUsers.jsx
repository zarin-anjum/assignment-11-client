import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Users } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ROLES = ["user", "creator", "admin"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => axiosSecure.get("/users").then((r) => r.data),
  });

  const { mutate: updateRole } = useMutation({
    mutationFn: ({ id, role }) =>
      axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      toast.success("Role updated successfully");
    },
    onError: () => toast.error("Failed to update role"),
  });

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
        <p className="text-sm">Failed to load users.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Manage Users
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {users.length} total users
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                  Email
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                  Current Role
                </th>
                <th className="text-left px-5 py-3.5 font-medium text-slate-500 dark:text-slate-400">
                  Change Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {u.photo ? (
                        <img
                          src={u.photo}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                          {u.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="font-medium text-slate-800 dark:text-white">
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                    {u.email}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium text-white ${
                        u.role === "admin"
                          ? "bg-red-500"
                          : u.role === "creator"
                            ? "bg-primary"
                            : "bg-blue-500"
                      }`}
                    >
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      defaultValue={u.role}
                      onChange={(e) =>
                        updateRole({ id: u._id, role: e.target.value })
                      }
                      className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
