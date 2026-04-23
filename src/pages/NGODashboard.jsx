import { Link } from "react-router-dom";

export default function NGODashboard() {
  return (
    <section className="space-y-6">
      <header className="rounded-card bg-white p-6 shadow-card flex justify-between items-center">
        <div>
          <h1 className="font-display text-4xl font-bold text-primary">NGO Command Center</h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
            Monitor coverage, assign urgent tasks, and mobilize volunteers in real time.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/ngo/posted-tasks" className="btn-secondary">
            View Posted Tasks
          </Link>
          <Link to="/ngo/tasks" className="btn-primary">
            Post Task
          </Link>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <article className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Active Volunteers</p>
          <p className="font-display text-3xl font-bold text-secondary">47</p>
        </article>
        <article className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Open Tasks</p>
          <p className="font-display text-3xl font-bold text-primary">12</p>
        </article>
        <article className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Impact This Week</p>
          <p className="font-display text-3xl font-bold text-dark">340 pts</p>
        </article>
        <article className="rounded-card bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Coverage Score</p>
          <p className="font-display text-3xl font-bold text-accent">78%</p>
        </article>
      </div>
    </section>
  );
}
