import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import useUserRole from "../../../hooks/useUserRole";
import {
  LayoutDashboard, Trophy, User, PlusCircle,
  ClipboardList, FileText, Users, ShieldCheck,
  LogOut, Loader2,
} from "lucide-react";

const userLinks = [
  { to: "/dashboard/my-participated", icon: LayoutDashboard, label: "Participated Contests" },
  { to: "/dashboard/my-winnings", icon: Trophy, label: "My Winnings" },
  { to: "/dashboard/my-profile", icon: User, label: "My Profile" },
];

const creatorLinks = [
  { to: "/dashboard/add-contest", icon: PlusCircle, label: "Add Contest" },
  { to: "/dashboard/my-contests", icon: ClipboardList, label: "My Contests" },
  { to: "/dashboard/submitted-tasks", icon: FileText, label: "Submitted Tasks" },
];

const adminLinks = [
  { to: "/dashboard/manage-users", icon: Users, label: "Manage Users" },
  { to: "/dashboard/manage-contests", icon: ShieldCheck, label: "Manage Contests" },
];

const DashboardSidebar = ({ onClose }) => {
  const { user, logoutUser } = useAuth();
  const { role, isLoading } = useUserRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const links =
    role === "admin" ? adminLinks :
    role === "creator" ? creatorLinks :
    userLinks;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#534AB7] text-white"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
    }`;

  return (
    <aside className="w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">

      <div className="p-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=534AB7&color=fff`}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
              {user?.displayName || "User"}
            </p>
            {isLoading ? (
              <Loader2 size={12} className="animate-spin text-slate-400 mt-1" />
            ) : (
              <span className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${
                role === "admin" ? "bg-red-500" :
                role === "creator" ? "bg-primary" :
                "bg-blue-500"
              }`}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-3">
          {role === "admin" ? "Admin Panel" : role === "creator" ? "Creator Panel" : "My Account"}
        </p>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={linkClass}
            onClick={onClose} 
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;