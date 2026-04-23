import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-5xl font-bold text-primary">404</h1>
      <p className="mt-3 text-gray-600">The page you are looking for does not exist.</p>
      <Link to="/login" className="btn-primary mt-6">
        Go to Login
      </Link>
    </div>
  );
}
