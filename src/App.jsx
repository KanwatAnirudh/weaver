import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Login";
import NGODashboard from "./pages/NGODashboard";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import TaskDiscovery from "./pages/TaskDiscovery";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import TaskManagement from "./pages/TaskManagement";
import PostedTasks from "./pages/PostedTasks";
import LandingPage from "./pages/LandingPage";

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="font-display text-xl text-primary">Loading Weeaver...</p>
    </div>
  );
}

function RoleProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    if (role === "ngo") {
      return <Navigate to="/ngo/dashboard" replace />;
    }
    return <Navigate to="/volunteer/dashboard" replace />;
  }

  return children;
}

function DefaultRouteRedirect() {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  if (role === "ngo") {
    return <Navigate to="/ngo/dashboard" replace />;
  }

  return <Navigate to="/volunteer/dashboard" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<Layout />}>
        <Route
          path="/volunteer/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["volunteer", "admin"]}>
              <VolunteerDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/volunteer/tasks"
          element={<TaskDiscovery />}
        />
        <Route
          path="/ngo/dashboard"
          element={
            <RoleProtectedRoute allowedRoles={["ngo", "admin"]}>
              <NGODashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/ngo/tasks"
          element={
            <RoleProtectedRoute allowedRoles={["ngo", "admin"]}>
              <TaskManagement />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/ngo/posted-tasks"
          element={
            <RoleProtectedRoute allowedRoles={["ngo", "admin"]}>
              <PostedTasks />
            </RoleProtectedRoute>
          }
        />
      </Route>
      <Route path="/" element={<DefaultRouteRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
