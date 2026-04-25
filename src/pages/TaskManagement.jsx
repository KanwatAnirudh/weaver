import { useState } from "react";
import { createTask } from "../api/tasks";
import { SKILL_OPTIONS, URGENCY_OPTIONS } from "../utils/constants";
import useAuth from "../hooks/useAuth";

export default function TaskManagement() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    urgency: "medium",
    locationZone: "",
    skillsRequired: [],
    hours: "",
    peopleRequired: "1",
    payout: "None",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      await createTask({
        ...formData,
        organizationName: user?.organizationName || user?.name || "Unknown NGO"
      });
      setSuccess("Task created successfully!");
      setFormData({
        title: "",
        urgency: "medium",
        locationZone: "",
        skillsRequired: [],
        hours: "",
        peopleRequired: "1",
        payout: "None",
      });
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to post task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6 max-w-3xl mx-auto">
      <header className="rounded-card bg-white p-6 shadow-card">
        <h1 className="font-display text-4xl font-bold text-primary">Post a Task</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
          Mobilize volunteers by posting a new task to the heatmap.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-card bg-white p-6 shadow-card space-y-6">
        {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
        {success && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{success}</div>}
        
        <div>
          <label className="block text-sm font-medium text-dark mb-1">Task Title <span className="text-red-500">*</span></label>
          <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="E.g. Mobile Health Camp Support" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Urgency <span className="text-red-500">*</span></label>
            <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100">
              {URGENCY_OPTIONS.map(u => <option key={u} value={u}>{u.charAt(0).toUpperCase() + u.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Location Zone <span className="text-red-500">*</span></label>
            <input required type="text" name="locationZone" value={formData.locationZone} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100" placeholder="E.g. North Ward" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark mb-1">Skills Required (Hold Ctrl/Cmd to select multiple)</label>
          <select multiple name="skillsRequired" value={formData.skillsRequired} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100 h-24">
            {SKILL_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Hours <span className="text-red-500">*</span></label>
            <input required type="number" min="1" step="0.5" name="hours" value={formData.hours} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">People Req <span className="text-red-500">*</span></label>
            <input required type="number" min="1" name="peopleRequired" value={formData.peopleRequired} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Payout</label>
            <input type="text" name="payout" value={formData.payout} onChange={handleChange} placeholder="e.g. None or $50" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full mt-4">
          {loading ? "Posting..." : "Post Task"}
        </button>
      </form>
    </section>
  );
}
