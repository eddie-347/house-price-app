import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-slate-900/98 via-slate-900/95 to-slate-900/85 backdrop-blur-xl border-b border-blue-500/40 shadow-2xl shadow-blue-500/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/50 group-hover:shadow-cyan-500/50 transition-all"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity }}>
                <Sparkles size={20} className="text-white" />
              </motion.div>
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1
                className="font-black text-lg gradient-text-premium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                House Price
              </motion.h1>
              <motion.p
                className="text-xs bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                AI Predictor
              </motion.p>
            </div>
          </Link>

          {/* Desktop Menu */}
          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { label: 'Home', href: '/' },
              { label: 'Predict', href: '/predict' },
              { label: 'Insights', href: '/insights' },
            ].map((item, i) => (
              <motion.div key={item.href} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <Link
                  to={item.href}
                  className="text-slate-300 hover:text-white font-medium transition-colors relative group"
                >
                  {item.label}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/predict">
              <motion.button
                className="premium-btn-enhanced text-sm"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cyan-400 p-2 hover:bg-slate-800/50 rounded-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden border-t border-blue-500/20 py-4 space-y-3 bg-slate-900/50 backdrop-blur-sm"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Predict', href: '/predict' },
            { label: 'Insights', href: '/insights' },
          ].map((item) => (
            <motion.div
              key={item.href}
              whileHover={{ x: 5 }}
              onClick={() => setIsOpen(false)}
            >
              <Link
                to={item.href}
                className="block text-slate-300 hover:text-white hover:bg-blue-500/10 px-4 py-3 rounded-lg transition font-medium"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};
