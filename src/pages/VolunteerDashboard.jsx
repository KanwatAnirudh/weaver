import { Link } from "react-router-dom";

export default function VolunteerDashboard() {
  return (
    <section className="space-y-6">
      <header className="rounded-card bg-white p-6 shadow-card">
        <h1 className="font-display text-4xl font-bold text-primary">Volunteer Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Discover high-impact opportunities near you, track your progress, and grow your rank.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-card border-l-4 border-l-secondary bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Impact Score</p>
          <p className="font-display text-3xl font-bold text-primary">1,280</p>
        </article>
        <article className="rounded-card border-l-4 border-l-accent bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Tasks Nearby</p>
          <p className="font-display text-3xl font-bold text-dark">12</p>
        </article>
        <article className="rounded-card border-l-4 border-l-primary bg-white p-5 shadow-card">
          <p className="text-sm text-gray-500">Current Rank</p>
          <p className="font-display text-3xl font-bold text-secondary">Silver</p>
        </article>
      </div>

      <div className="glass-panel overflow-hidden p-6">
        <h2 className="font-display text-2xl font-semibold text-dark">Heat Map of Need</h2>
        <p className="mt-2 text-sm text-gray-700">
          Live task discovery is now available with real-time area intensity updates and skill filters.
        </p>
        <Link to="/volunteer/tasks" className="btn-primary mt-4 inline-flex">
          Open Task Discovery
        </Link>
      </div>
    </section>
  );
}
