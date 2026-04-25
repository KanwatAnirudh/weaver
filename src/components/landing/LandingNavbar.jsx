import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, role } = useAuth();

  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    return role === "ngo" ? "/ngo/dashboard" : "/volunteer/dashboard";
  };

  return (
    <>
      <div className="bg-primary/5 border-b border-primary/10 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6 text-gray-600">
            <span className="flex items-center gap-2">📞 +91 98188 85691</span>
            <span className="flex items-center gap-2">✉️ info@weeavers.org</span>
          </div>
          <div className="flex gap-4">
            <a href="#causes" className="text-primary hover:text-blue-800 font-medium transition-colors">Become a Volunteer</a>
            <span className="text-gray-300">|</span>
            <Link to={getDashboardLink()} className="text-gray-600 hover:text-primary transition-colors font-medium">
              {isAuthenticated ? "Go to Dashboard" : "Login"}
            </Link>
          </div>
        </div>
      </div>

      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-gray-900 tracking-tight">Weeavers</span>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Foundation</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors">About Us</a>
            <a href="#causes" className="text-gray-600 hover:text-primary font-medium transition-colors">Causes</a>
            <a href="#projects" className="text-gray-600 hover:text-primary font-medium transition-colors">Projects</a>
            <a href="#contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</a>
            
            {isAuthenticated ? (
               <Link to={getDashboardLink()} className="btn-primary flex items-center gap-2">
                 Dashboard
               </Link>
            ) : (
              <Link to="/register" className="btn-primary">Get Involved</Link>
            )}
          </nav>

          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 absolute w-full shadow-lg z-40">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium hover:text-primary">About Us</a>
            <a href="#causes" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium hover:text-primary">Causes</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium hover:text-primary">Projects</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium hover:text-primary">Contact</a>
            
            {isAuthenticated ? (
               <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className="btn-primary text-center mt-2">
                 Dashboard
               </Link>
            ) : (
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center mt-2">
                Get Involved
              </Link>
            )}
          </div>
        )}
      </header>
    </>
  );
}
