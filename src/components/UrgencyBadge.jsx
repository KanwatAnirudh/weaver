const urgencyClasses = {
  critical: "bg-amber-700 text-white",
  high: "bg-amber-500 text-white",
  medium: "bg-amber-300 text-amber-900",
  low: "bg-amber-100 text-amber-800",
};

export default function UrgencyBadge({ urgency }) {
  const level = String(urgency || "low").toLowerCase();
  const style = urgencyClasses[level] || urgencyClasses.low;

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${style}`}>
      {level}
    </span>
  );
}
