import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl transform rotate-3 scale-105 z-0"></div>
            <img 
              src="/images/about_img.png" 
              alt="About Weavers" 
              className="relative z-10 rounded-3xl shadow-2xl w-full object-cover aspect-square md:aspect-[4/5]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 glass-panel bg-white/90 backdrop-blur-xl p-6 rounded-2xl z-20 shadow-2xl flex items-center gap-4 border border-gray-100"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-3xl shadow-inner">
                10+
              </div>
              <div>
                <div className="font-bold text-gray-900 leading-tight">Years of<br/>Social Impact</div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h4 className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 flex items-center gap-2">
              <span className="w-6 h-px bg-secondary inline-block"></span>
              We Make a Difference
            </h4>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">Best NGO for CSR in India</h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              At Weavers, we believe that each and every person is entitled to a worthy, meaningful, and dignified life. We are the best NGO in Delhi NCR and endeavor for the holistic growth of the Nation and its people. Our approach focuses on long-term sustainability rather than just short-term relief.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Education for All</h4>
                  <p className="text-gray-600 mt-1">Supporting tuition and fundamental education for the underprivileged.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Health & Healthcare</h4>
                  <p className="text-gray-600 mt-1">Providing basic medical infrastructure and organizing blood donations.</p>
                </div>
              </div>
            </div>

            <a href="#projects" className="btn-secondary inline-block">Discover Our Work</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
