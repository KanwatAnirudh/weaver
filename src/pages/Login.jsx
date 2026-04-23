import { useCallback, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const initialForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { login, isAuthenticated, role } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextRoute = useMemo(() => {
    if (role === "ngo") {
      return "/ngo/dashboard";
    }
    return "/volunteer/dashboard";
  }, [role]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setError("");
      setIsSubmitting(true);
      try {
        await login(form);
      } catch (requestError) {
        const message =
          requestError?.code === "ERR_NETWORK"
            ? "Cannot reach API server. Start backend and try again."
            : requestError?.response?.data?.error || "Invalid credentials.";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, login],
  );

  if (isAuthenticated) {
    return <Navigate to={nextRoute} replace />;
  }

  const isValid = form.email.trim() && form.password.trim();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-card border border-gray-200 bg-white p-6 shadow-card"
      >
        <h1 className="font-display text-3xl font-bold text-primary">Weeaver Login</h1>
        <p className="mt-2 text-sm text-gray-600">Connect with impact opportunities in your community.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-dark">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-dark">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          New to Weeaver?{" "}
          <Link to="/register" className="font-semibold text-primary hover:text-blue-700">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
