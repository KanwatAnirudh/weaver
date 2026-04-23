import { useCallback, useMemo } from "react";

const getHeatStyle = (intensity) => {
  if (intensity >= 80) {
    return "bg-amber-900 text-amber-50";
  }
  if (intensity >= 60) {
    return "bg-amber-700 text-amber-50";
  }
  if (intensity >= 40) {
    return "bg-amber-500 text-amber-900";
  }
  if (intensity >= 20) {
    return "bg-amber-300 text-amber-900";
  }
  return "bg-amber-100 text-amber-900";
};

function AreaTile({ area, isSelected, onAreaSelect }) {
  const areaClass = getHeatStyle(area.intensity);
  const selectedClass = isSelected ? "ring-2 ring-primary ring-offset-2" : "";
  const handleSelect = useCallback(() => {
    onAreaSelect(area.id);
  }, [area.id, onAreaSelect]);

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={`rounded-card p-4 text-left transition hover:scale-[1.01] ${areaClass} ${selectedClass}`}
    >
      <p className="font-display text-lg font-semibold">{area.label}</p>
      <div className="mt-3 flex items-center justify-between text-xs font-medium">
        <span>Urgency {area.intensity}%</span>
        <span>{area.activeTasks} tasks</span>
      </div>
      <div className="mt-1 text-xs">Volunteers nearby: {area.volunteerCount}</div>
    </button>
  );
}

export default function HeatMap({ areas = [], onAreaSelect, selectedAreaId }) {
  const sortedAreas = useMemo(() => {
    return [...areas].sort((a, b) => b.intensity - a.intensity);
  }, [areas]);

  return (
    <section className="rounded-card bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold text-dark">Heat Map of Need</h2>
        <p className="text-xs text-gray-500">Updated every 10 seconds</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedAreas.map((area) => {
          const isSelected = selectedAreaId === area.id;
          return <AreaTile key={area.id} area={area} isSelected={isSelected} onAreaSelect={onAreaSelect} />;
        })}
      </div>
    </section>
  );
}
