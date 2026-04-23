import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 text-white min-h-[90vh] flex items-center">
      {/* Background Image setup with overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/images/hero_bg.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full pt-12 pb-24">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-blue-200 mb-8 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Empowering Communities Since 2012
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6"
          >
            Empowering Lives, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-secondary">Shaping Futures</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            Weavers is New Delhi's leading NGO dedicated to social wellness and welfare. Join our mission to bring holistic growth to the nation and ensure a dignified life for all.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a href="#causes" className="btn-primary flex items-center justify-center text-lg px-8 py-4 shadow-xl shadow-primary/30">Make a Difference →</a>
            <a href="#about" className="btn-secondary flex items-center justify-center !bg-white/10 !border-white/20 !text-white hover:!bg-white/20 text-lg px-8 py-4 backdrop-blur-sm transition-all shadow-lg">Explore Causes</a>
          </motion.div>

          {/* Quick Stats in Hero */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-12"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
