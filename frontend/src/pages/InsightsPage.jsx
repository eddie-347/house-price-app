import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Home, DollarSign, Zap, Sparkles } from 'lucide-react';

const InsightsPage = () => {
  const [stats] = useState({
    avgPrice: 87500000,
    predictions: 10245,
    accuracy: 95.2,
    topAmenities: [
      { name: 'AC', impact: 12.5 },
      { name: 'Parking', impact: 11.8 },
      { name: 'Security', impact: 10.5 },
      { name: 'Lift', impact: 9.2 },
      { name: 'Gym', impact: 8.7 },
    ],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-20 pb-20 relative overflow-hidden">
      {/* Enhanced Background Orbs */}
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

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/60 mb-6"
            whileHover={{ scale: 1.08 }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Zap size={18} className="text-cyan-400" />
            </motion.div>
            <span className="text-cyan-400 font-bold text-sm">MARKET INSIGHTS</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black gradient-text-premium mb-6">
            Property Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
            Understand the factors that drive property valuations and market trends
          </p>
        </motion.div>

        {/* Premium Stats Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { 
              icon: DollarSign, 
              label: 'Average Price', 
              value: `₹${(stats.avgPrice / 10000000).toFixed(1)}Cr`,
              gradient: 'from-blue-600 to-cyan-600',
              glow: 'shadow-blue-500/20'
            },
            { 
              icon: Home, 
              label: 'Predictions Made', 
              value: `${(stats.predictions / 1000).toFixed(0)}K+`,
              gradient: 'from-purple-600 to-pink-600',
              glow: 'shadow-purple-500/20'
            },
            { 
              icon: TrendingUp, 
              label: 'Accuracy', 
              value: `${stats.accuracy}%`,
              gradient: 'from-emerald-600 to-teal-600',
              glow: 'shadow-emerald-500/20'
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className={`bg-gradient-to-br ${stat.gradient} rounded-3xl p-10 text-white overflow-hidden group relative`}
              variants={itemVariants}
              whileHover={{ y: -12, boxShadow: `0 30px 60px rgba(59, 130, 246, 0.25)` }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 20, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-6"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <stat.icon size={28} className="text-white" />
                </motion.div>
                <p className="text-slate-100 mb-3 uppercase text-sm font-bold tracking-wide">{stat.label}</p>
                <motion.p
                  className="text-5xl font-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {stat.value}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Amenities Impact Section */}
        <motion.div
          className="glass-ultra-premium rounded-3xl p-12 mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text-premium mb-12 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="p-3 bg-blue-500/20 rounded-xl"
              whileHover={{ scale: 1.1, rotate: 10 }}
            >
              <BarChart3 size={32} className="text-cyan-400" />
            </motion.div>
            Top Amenities by Impact
          </motion.h2>
          <div className="space-y-8">
            {stats.topAmenities.map((amenity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <motion.span
                    className="font-bold text-slate-200 text-lg"
                    whileHover={{ x: 5 }}
                  >
                    <span className="gradient-text-premium">{i + 1}.</span> {amenity.name}
                  </motion.span>
                  <motion.span
                    className="text-cyan-400 font-bold text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                  >
                    +{amenity.impact}%
                  </motion.span>
                </div>
                <motion.div
                  className="h-4 bg-slate-700/50 rounded-full overflow-hidden relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${amenity.impact * 8}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Guide */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-black gradient-text-premium mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Key Valuation Factors
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                title: 'Property Size', 
                desc: 'Area is the most significant factor affecting price. Larger properties generally command higher values.',
                emoji: '📐',
                color: 'from-blue-600 to-cyan-600'
              },
              { 
                title: 'Location', 
                desc: 'Prime locations command significantly higher prices due to proximity to amenities and connectivity.',
                emoji: '📍',
                color: 'from-cyan-600 to-purple-600'
              },
              { 
                title: 'Modern Amenities', 
                desc: 'Modern amenities like gym, pool, and security systems add considerable value to properties.',
                emoji: '✨',
                color: 'from-purple-600 to-pink-600'
              },
              { 
                title: 'Property Condition', 
                desc: 'New properties vs resale affects valuation. New construction often commands premium prices.',
                emoji: '🏠',
                color: 'from-pink-600 to-red-600'
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`premium-card-enhanced bg-gradient-to-br ${item.color} group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, boxShadow: "0 30px 60px rgba(59, 130, 246, 0.2)" }}
              >
                <div className="text-6xl mb-6 drop-shadow-lg">{item.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/90 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 50px 100px rgba(59, 130, 246, 0.3)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <div className="relative z-10">
            <motion.h2
              className="text-4xl md:text-5xl font-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Value Your Property?
            </motion.h2>
            <motion.p
              className="mb-10 text-white/95 text-xl md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Get an instant AI-powered price prediction with detailed insights
            </motion.p>
            <motion.a
              href="/predict"
              className="premium-btn-enhanced inline-block text-lg"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Start Predicting Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InsightsPage;
