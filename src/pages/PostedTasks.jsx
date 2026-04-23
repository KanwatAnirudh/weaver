import { useEffect, useState } from "react";
import { fetchNgoTasks } from "../api/tasks";
import TaskCard from "../components/TaskCard";

export default function PostedTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchNgoTasks();
      setTasks(data);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <section className="space-y-6">
      <header className="rounded-card bg-white p-6 shadow-card">
        <h1 className="font-display text-4xl font-bold text-primary">Posted Tasks</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          View all the tasks your organization has posted and monitor their statuses.
        </p>
      </header>

      {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="rounded-card bg-white p-6 shadow-card text-center text-gray-500">
          You haven't posted any tasks yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <div key={task.id} className="relative">
              <div className="absolute -top-3 -right-3 z-10 bg-dark text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase">
                {task.status}
              </div>
              <TaskCard task={task} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
