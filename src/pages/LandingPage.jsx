import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      {/* Top Bar */}
      <div className="bg-primary/5 border-b border-primary/10 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex gap-6 text-gray-600">
            <span className="flex items-center gap-2">📞 +91 98188 85691</span>
            <span className="flex items-center gap-2">✉️ info@weeavers.org</span>
          </div>
          <div className="flex gap-4">
            <Link to="/register" className="text-primary hover:text-blue-800 font-medium transition-colors">Become a Volunteer</Link>
            <span className="text-gray-300">|</span>
            <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">Login</Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              W
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl leading-none text-gray-900 tracking-tight">Weeavers</span>
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Foundation</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-gray-600 hover:text-primary font-medium transition-colors">About Us</a>
            <Link to="/volunteer/tasks" className="text-gray-600 hover:text-primary font-medium transition-colors">Projects</Link>
            <a href="#causes" className="text-gray-600 hover:text-primary font-medium transition-colors">Causes</a>
            <a href="#get-involved" className="text-gray-600 hover:text-primary font-medium transition-colors">Get Involved</a>
            <a href="#contact" className="text-gray-600 hover:text-primary font-medium transition-colors">Contact</a>
            <a href="#donate" className="btn-primary">Donate Now</a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 absolute w-full shadow-lg">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">About Us</a>
            <Link to="/volunteer/tasks" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Projects</Link>
            <a href="#causes" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Causes</a>
            <a href="#get-involved" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Get Involved</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gray-600 font-medium">Contact</a>
            <a href="#donate" onClick={() => setIsMenuOpen(false)} className="btn-primary text-center mt-2">Donate Now</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 text-white min-h-[90vh] flex items-center">
        {/* Background Image setup with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_bg.png" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-12 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-blue-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Empowering Communities Since 2012
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6 text-white drop-shadow-md">
              Empowering Lives, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-secondary drop-shadow-sm">Shaping Futures</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Weeavers is New Delhi's leading NGO dedicated to social wellness and welfare. Join our mission to bring holistic growth to the nation and ensure a dignified life for all.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#donate" className="btn-primary text-lg px-8 py-4 !rounded-full">Make a Difference →</a>
              <a href="#causes" className="btn-secondary !rounded-full !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 text-lg px-8 py-4">Explore Causes</a>
            </div>

            {/* Quick Stats in Hero */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-12">
              <div>
                <div className="font-display text-4xl font-bold text-white mb-1">50K+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Lives Impacted</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-white mb-1">150+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Volunteers</div>
              </div>
              <div>
                <div className="font-display text-4xl font-bold text-white mb-1">2012</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Established</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105 z-0"></div>
              <img 
                src="/images/about_img.png" 
                alt="About Weeavers" 
                className="relative z-10 rounded-3xl shadow-xl w-full object-cover aspect-square md:aspect-[4/5]"
              />
              <div className="absolute -bottom-8 -right-8 glass-panel bg-white/90 backdrop-blur-xl p-6 rounded-2xl z-20 shadow-2xl flex items-center gap-4 border border-gray-100">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-3xl">
                  10+
                </div>
                <div>
                  <div className="font-bold text-gray-900 leading-tight">Years of<br/>Social Impact</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-secondary font-bold tracking-wider uppercase text-sm mb-2">We Make a Difference</h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Best NGO for CSR in India</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                At Weeavers, we believe that each and every person is entitled to a worthy, meaningful, and dignified life. We are the best NGO in Delhi NCR and endeavor for the holistic growth of the Nation and its people. Our approach focuses on long-term sustainability rather than just short-term relief.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Education for All</h4>
                    <p className="text-gray-600">Supporting tuition and fundamental education for the underprivileged.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">Health & Healthcare</h4>
                    <p className="text-gray-600">Providing basic medical infrastructure and organizing blood donations.</p>
                  </div>
                </div>
              </div>

              <Link to="/volunteer/tasks" className="btn-secondary !rounded-full">Discover Our Work</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Causes Section */}
      <section id="causes" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h4 className="text-secondary font-bold tracking-wider uppercase text-sm mb-2">Latest Causes</h4>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">Support Our Mission</h2>
            <p className="text-gray-600 text-lg">See how you can make a difference in families lives with just Rs 5000 a month. Choose a cause close to your heart.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cause 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src="/images/cause_women.png" alt="Women’s Empowerment" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">Empowerment</div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-900">Raised: ₹2,50,000</span>
                    <span className="text-gray-500">Goal: ₹3,00,000</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '83%' }}></div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Women’s Empowerment</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">Providing skill training, specifically cutting & tailoring, to women in rural areas for sustainable livelihoods and independent living.</p>
                <a href="#donate" className="block w-full py-3 text-center border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">Donate Now</a>
              </div>
            </div>

            {/* Cause 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src="/images/hero_bg.png" alt="Education" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-wider">Education</div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-900">Raised: ₹90,000</span>
                    <span className="text-gray-500">Goal: ₹2,00,000</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Slum Children Education</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">Lighting the path for street and slum children through quality education, tuition help, and nutritious food provisions.</p>
                <a href="#donate" className="block w-full py-3 text-center border-2 border-secondary text-secondary font-bold rounded-xl hover:bg-secondary hover:text-white transition-colors">Donate Now</a>
              </div>
            </div>

            {/* Cause 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src="/images/cause_health.png" alt="Healthcare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-accent uppercase tracking-wider">Healthcare</div>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-semibold mb-2">
                    <span className="text-gray-900">Raised: ₹4,25,000</span>
                    <span className="text-gray-500">Goal: ₹5,00,000</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Medical Assistance</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">Delivering critical healthcare services and organizing targeted medical camps in communities devoid of basic infrastructure.</p>
                <a href="#donate" className="block w-full py-3 text-center border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-colors">Donate Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden bg-primary w-full">
        <div className="absolute inset-0 z-0">
          <img src="/images/project_bg.png" alt="Projects" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Projects for Skill Training</h2>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10">
            India enjoys a special demographic advantage because more than 60% of the population is under 25. However, employability needs to be raised in order to benefit from such a sizable workforce.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#get-involved" className="btn-secondary !rounded-full !bg-white !text-primary border-none hover:shadow-xl">Become a Corporate Partner</a>
            <Link to="/volunteer/tasks" className="btn-primary !rounded-full !bg-blue-900 !shadow-none border border-blue-800 hover:!bg-blue-950 hover:border-blue-700 text-white">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-gray-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <a href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white font-bold text-xl">
                  W
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-2xl leading-none text-white tracking-tight">Weeavers</span>
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">Foundation</span>
                </div>
              </a>
              <p className="text-gray-400 mb-6">A trusted NGO dedicated to the wholesome upliftment of society. Join us to build a better nation together.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">Fb</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">Tw</a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">In</a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#about" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-xs">▶</span> About Weeavers</a></li>
                <li><Link to="/volunteer/tasks" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Our CSR Projects</Link></li>
                <li><a href="#causes" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Recent Campaigns</a></li>
                <li><a href="#get-involved" className="hover:text-primary transition-colors flex items-center gap-2"><span className="text-xs">▶</span> Volunteer with Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Our Centers</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">📍 Delhi (HQ)</li>
                <li className="flex items-center gap-2">📍 Maharashtra</li>
                <li className="flex items-center gap-2">📍 Uttar Pradesh</li>
                <li className="flex items-center gap-2">📍 Jharkhand</li>
                <li className="flex items-center gap-2">📍 Bihar</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <span className="text-primary mt-1">📍</span>
                  <p>H-28, Om Complex, 1st Floor, Laxmi Nagar Delhi - 110092</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-primary">📞</span>
                  <p>+91 98188 85691</p>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-primary">✉️</span>
                  <p>info@weeavers.org</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Weeavers Foundation, All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
