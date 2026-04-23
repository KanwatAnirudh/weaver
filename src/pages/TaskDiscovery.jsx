import { useCallback, useEffect, useMemo, useState } from "react";
import HeatMap from "../components/HeatMap";
import TaskCard from "../components/TaskCard";
import { fetchTasks } from "../api/tasks";
import useHeatMap from "../hooks/useHeatMap";
import { SKILL_OPTIONS, URGENCY_OPTIONS } from "../utils/constants";

const initialFilters = {
  skill: "",
  urgency: "",
  organization: "",
  maxDistanceKm: "20",
};

export default function TaskDiscovery() {
  const { areas, lastUpdated, isLoading: heatMapLoading } = useHeatMap();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [selectedAreaId, setSelectedAreaId] = useState("");

  const selectedArea = useMemo(() => {
    return areas.find((item) => item.id === selectedAreaId) || null;
  }, [areas, selectedAreaId]);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const nextFilters = {
        ...filters,
      };
      if (selectedArea) {
        nextFilters.zone = selectedArea.label;
      }

      const payload = await fetchTasks(nextFilters);
      setTasks(payload);
    } catch (requestError) {
      const message =
        requestError?.response?.data?.error || "Unable to load tasks. Please try again in a moment.";
      setError(message);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, selectedArea]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleAreaSelect = useCallback((areaId) => {
    setSelectedAreaId((prev) => (prev === areaId ? "" : areaId));
  }, []);

  const lastUpdatedText = lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Not yet synced";

  return (
    <section className="space-y-6">
      <header className="rounded-card bg-white p-6 shadow-card">
        <h1 className="font-display text-4xl font-bold text-primary">Task Discovery</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Match your skills with urgent community needs near you.
        </p>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="w-full rounded-card bg-white p-6 shadow-card lg:w-72">
          <h2 className="font-display text-xl font-semibold text-dark">Filters</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="skill" className="mb-1 block text-sm font-medium text-dark">
                Skill
              </label>
              <select
                id="skill"
                name="skill"
                value={filters.skill}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All skills</option>
                {SKILL_OPTIONS.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="urgency" className="mb-1 block text-sm font-medium text-dark">
                Urgency
              </label>
              <select
                id="urgency"
                name="urgency"
                value={filters.urgency}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="">All levels</option>
                {URGENCY_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="maxDistanceKm" className="mb-1 block text-sm font-medium text-dark">
                Radius (km)
              </label>
              <input
                id="maxDistanceKm"
                name="maxDistanceKm"
                type="number"
                min="1"
                max="100"
                value={filters.maxDistanceKm}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label htmlFor="organization" className="mb-1 block text-sm font-medium text-dark">
                Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={filters.organization}
                onChange={handleInputChange}
                placeholder="Search NGO name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          <HeatMap areas={areas} onAreaSelect={handleAreaSelect} selectedAreaId={selectedAreaId} />

          <div className="rounded-card bg-white p-4 text-sm text-gray-600 shadow-card">
            <p>
              Heat map status:{" "}
              <span className="font-semibold text-dark">
                {heatMapLoading ? "Syncing..." : `Last updated ${lastUpdatedText}`}
              </span>
            </p>
            {selectedArea && (
              <p className="mt-1">
                Active focus area: <span className="font-semibold text-primary">{selectedArea.label}</span>
              </p>
            )}
          </div>

          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          {!isLoading && tasks.length === 0 && !error && (
            <p className="rounded-card bg-white p-5 text-sm text-gray-500 shadow-card">
              No tasks match these filters right now. Try expanding your radius or urgency filter.
            </p>
          )}
        </main>
      </div>
    </section>
  );
}
