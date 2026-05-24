import { Outlet, Navigate } from "react-router-dom";
import DashboardSidebar from "./components/DashboardSidebar";
import useUserRole from "../../hooks/useUserRole";
import { Loader2 } from "lucide-react";

const defaultRoute = {
  admin: "/dashboard/manage-users",
  creator: "/dashboard/my-contests",
  user: "/dashboard/my-participated",
};

const Dashboard = () => {
  const { role, isLoading } = useUserRole();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 size={32} className="animate-spin text-[#534AB7]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">
      <DashboardSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;