import { useState } from "react";
import LocationTag from "./LocationTag";
import SkillPill from "./SkillPill";
import UrgencyBadge from "./UrgencyBadge";
import useAuth from "../hooks/useAuth";
import { applyToTask } from "../api/tasks";

export default function TaskCard({ task }) {
  const { user } = useAuth();
  
  // Local state to instantly update the UI without refetching all tasks if possible
  const [localTask, setLocalTask] = useState(task);
  const [applying, setApplying] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const appliedCount = localTask.appliedVolunteers?.length || 0;
  const isFull = appliedCount >= localTask.peopleRequired;
  
  // If user is absent (not logged in or generic) assume false, else check if included
  const hasApplied = localTask.appliedVolunteers?.includes(user?.id);

  const handleApply = async () => {
    if (!user) {
      setToastMsg("Please log in to apply.");
      setTimeout(() => setToastMsg(""), 3000);
      return;
    }
    
    setApplying(true);
    setToastMsg("");
    
    try {
      const updatedTask = await applyToTask(localTask.id);
      if (updatedTask) {
        setLocalTask(updatedTask);
        setToastMsg("Application successful!");
        setTimeout(() => setToastMsg(""), 4000);
      }
    } catch (err) {
      setToastMsg(err?.response?.data?.error || "Failed to apply.");
      setTimeout(() => setToastMsg(""), 4000);
    } finally {
      setApplying(false);
    }
  };

  return (
    <article className="relative rounded-card border-l-4 border-l-accent bg-white p-5 shadow-card transition duration-200 hover:scale-[1.02] hover:shadow-lg">
      
      {/* Absolute Toast Popup overlay within the card itself */}
      {toastMsg && (
        <div className={`absolute top-2 right-2 left-2 z-20 rounded-md p-2 text-center text-xs font-semibold shadow-md transition-opacity ${toastMsg.includes("success") ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
          {toastMsg}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-dark">{localTask.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{localTask.organizationName}</p>
        </div>
        <UrgencyBadge urgency={localTask.urgency} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <LocationTag zone={localTask.locationZone} distanceKm={localTask.distanceKm} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {localTask.skillsRequired?.map((skill) => (
          <SkillPill key={skill} label={skill} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <p className="text-gray-600">
          Time: <span className="font-semibold text-dark">{localTask.hours}h</span>
        </p>
        <p className="text-gray-600">
          Impact: <span className="font-semibold text-primary">{localTask.impactPoints} pts</span>
        </p>
        <p className="text-gray-600">
          Applied: <span className={`font-semibold ${isFull ? "text-accent" : "text-dark"}`}>{appliedCount} / {localTask.peopleRequired || 1}</span>
        </p>
        {localTask.payout && localTask.payout !== "None" && (
          <p className="text-gray-600">
            Payout: <span className="font-semibold text-accent">{localTask.payout}</span>
          </p>
        )}
      </div>

      <button 
        type="button" 
        onClick={handleApply}
        disabled={hasApplied || isFull || applying || user?.role === "ngo"}
        className={`mt-4 w-full px-4 py-2 font-medium rounded-lg transition-colors ${
          hasApplied 
            ? "bg-green-100 text-green-700 cursor-not-allowed" 
            : isFull 
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : user?.role === "ngo" 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none opacity-50"
                : "btn-primary"
        }`}
      >
        {applying ? "Applying..." : hasApplied ? "Applied" : isFull ? "Task Full" : "Apply to Task"}
      </button>
    </article>
  );
}
