import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./components/DashboardSidebar";
import useUserRole from "../../hooks/useUserRole";
import { Loader2, Menu, X } from "lucide-react";

const Dashboard = () => {
  const { isLoading } = useUserRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 pt-16">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] transition-transform duration-300 lg:static lg:translate-x-0 lg:h-auto lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className="flex-1 min-w-0 overflow-auto">
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu size={20} className="text-slate-600 dark:text-slate-300" />
          </button>
          <span className="text-sm font-semibold text-slate-800 dark:text-white">
            Dashboard
          </span>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;