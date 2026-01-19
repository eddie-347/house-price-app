import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pt-20 relative overflow-hidden">
      {/* Enhanced Animated Background Orbs */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, 80, 0], x: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, -80, 0], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-8"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center py-24 mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/60 mb-8 backdrop-blur-sm"
            whileHover={{ scale: 1.08, borderColor: "rgba(6, 182, 212, 1)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles size={18} className="text-cyan-400" />
            </motion.div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold">
              AI-Powered Predictions
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Predict Your{' '}
            <span className="gradient-text-premium">Property Price</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get instant, accurate property valuations powered by advanced XGBoost machine learning. Analyze 40+ features to determine your home's true worth.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/predict">
              <motion.button
                className="premium-btn-enhanced text-lg min-w-[240px]"
                whileHover={{ scale: 1.08, boxShadow: "0 20px 50px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Predicting →
              </motion.button>
            </Link>
            <Link to="/insights">
              <motion.button
                className="premium-btn-outline text-lg min-w-[240px]"
                whileHover={{ scale: 1.08, backgroundColor: "rgba(6, 182, 212, 0.15)" }}
                whileTap={{ scale: 0.95 }}
              >
                View Insights ✨
              </motion.button>
            </Link>
          </motion.div>

          {/* Premium Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: '10K+', label: 'Properties Analyzed', icon: '📊' },
              { number: '95%', label: 'Accuracy Rate', icon: '🎯' },
              { number: '<1s', label: 'Prediction Time', icon: '⚡' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="premium-card-enhanced group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black gradient-text-premium">{stat.number}</div>
                <div className="text-slate-400 text-sm mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="py-24 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-16 gradient-text-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: TrendingUp, 
                title: 'AI-Powered', 
                desc: 'Advanced XGBoost machine learning model with 95%+ accuracy',
                color: 'from-blue-500 to-cyan-500'
              },
              { 
                icon: Zap, 
                title: 'Lightning Fast', 
                desc: 'Get predictions in under 1 second with optimized algorithms',
                color: 'from-cyan-500 to-purple-500'
              },
              { 
                icon: BarChart3, 
                title: 'Data Insights', 
                desc: 'Understand what drives property value with detailed analysis',
                color: 'from-purple-500 to-pink-500'
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="premium-card-enhanced group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)" }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6`}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="py-24 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-16 gradient-text-premium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: '01', title: 'Enter Details', desc: 'Fill in your property specifications', emoji: '📝' },
              { number: '02', title: 'AI Analysis', desc: 'Our model analyzes 40+ features', emoji: '🧠' },
              { number: '03', title: 'Get Results', desc: 'Instant accurate price prediction', emoji: '✅' },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="premium-card-enhanced text-center relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
              >
                {/* Connection Line */}
                {i < 2 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                  />
                )}
                <div className="text-6xl font-black gradient-text-premium mb-6">{step.number}</div>
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 rounded-3xl p-16 text-center mb-20 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 50px 100px rgba(59, 130, 246, 0.3)" }}
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <div className="relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-black text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Value Your Property?
            </motion.h2>
            <motion.p
              className="text-white/95 mb-10 text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Get an instant, accurate property valuation in seconds
            </motion.p>
            <Link to="/predict">
              <motion.button
                className="px-14 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-xl hover:bg-slate-100 transition"
                whileHover={{ scale: 1.08, boxShadow: "0 20px 50px rgba(255, 255, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Now →
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
