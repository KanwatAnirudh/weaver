import { useCallback, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "volunteer",
  organizationName: "",
};

export default function Register() {
  const { register, isAuthenticated, role } = useAuth();
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

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      };

      if (form.role === "ngo" && form.organizationName.trim()) {
        payload.organizationName = form.organizationName.trim();
      }

      setIsSubmitting(true);
      try {
        await register(payload);
      } catch (requestError) {
        const message =
          requestError?.code === "ERR_NETWORK"
            ? "Cannot reach API server. Start backend and try again."
            : requestError?.response?.data?.error || "Unable to register.";
        setError(message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, register],
  );

  if (isAuthenticated) {
    return <Navigate to={nextRoute} replace />;
  }

  const isNgo = form.role === "ngo";
  const isValid =
    form.name.trim() &&
    form.email.trim() &&
    form.password.trim() &&
    form.confirmPassword.trim() &&
    (!isNgo || form.organizationName.trim());

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-card border border-gray-200 bg-white p-6 shadow-card"
      >
        <h1 className="font-display text-3xl font-bold text-primary">Create Weaver Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Join as a volunteer or NGO and start driving measurable impact.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-dark">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-dark">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              <option value="volunteer">Volunteer</option>
              <option value="ngo">NGO</option>
            </select>
          </div>

          {isNgo && (
            <div>
              <label htmlFor="organizationName" className="mb-1 block text-sm font-medium text-dark">
                Organization Name
              </label>
              <input
                id="organizationName"
                name="organizationName"
                type="text"
                value={form.organizationName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
                required={isNgo}
              />
            </div>
          )}

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

          <div>
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-dark">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
