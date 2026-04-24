import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

export default function Header() {
  const { user, logout } = useAuth();
  const { isVolunteer, isNgo } = useRole();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const volunteerClassName =
    location.pathname === "/volunteer/dashboard"
      ? "rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-primary"
      : "rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100";
  const volunteerTasksClassName =
    location.pathname === "/volunteer/tasks"
      ? "rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-primary"
      : "rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100";

  const ngoClassName =
    location.pathname === "/ngo/dashboard"
      ? "rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-primary"
      : "rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100";

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="font-display text-2xl font-bold text-primary">
          Weaver
        </Link>

        <label htmlFor="global-search" className="sr-only">
          Search
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Search tasks, volunteers, organizations..."
          className="hidden flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100 md:block"
        />

        <nav className="ml-auto flex items-center gap-2 sm:gap-3">
          {isVolunteer && (
            <>
              <Link to="/volunteer/dashboard" className={volunteerClassName}>
                Volunteer Hub
              </Link>
              <Link to="/volunteer/tasks" className={volunteerTasksClassName}>
                Task Discovery
              </Link>
            </>
          )}

          {isNgo && (
            <Link to="/ngo/dashboard" className={ngoClassName}>
              NGO Command
            </Link>
          )}

          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-dark hover:bg-gray-50"
          >
            Notifications
          </button>

          {user ? (
            <>
              <div className="hidden rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 sm:block">
                {user.name || "User menu"}
              </div>
              <button type="button" onClick={handleLogout} className="btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
