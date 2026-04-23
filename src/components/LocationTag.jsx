export default function LocationTag({ zone, distanceKm }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
      <span aria-hidden="true">📍</span>
      <span>
        {zone} · {distanceKm} km
      </span>
    </span>
  );
}
