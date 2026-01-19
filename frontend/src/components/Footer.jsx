import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      className="bg-gradient-to-b from-slate-900/95 to-slate-950 border-t border-blue-500/30 text-white py-16 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5"
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="grid md:grid-cols-4 gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="font-black text-xl gradient-text-premium mb-4"
              whileHover={{ x: 5 }}
            >
              House Price AI
            </motion.h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Advanced AI-powered property valuation platform using machine learning to provide accurate price predictions.
            </p>
            <motion.div
              className="flex gap-4 mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
              ].map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-cyan-400 hover:bg-blue-500/40 hover:border-cyan-500/60 transition group"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Predict', href: '/predict' },
                { label: 'Insights', href: '/insights' },
              ].map((link) => (
                <motion.li
                  key={link.href}
                  whileHover={{ x: 5 }}
                  className="transition"
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition font-medium"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'Features', href: '#' },
                { label: 'Accuracy', href: '#' },
                { label: 'Pricing', href: '#' },
                { label: 'FAQ', href: '#' },
              ].map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition font-medium"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Contact</h4>
            <div className="space-y-4">
              <motion.a
                href="mailto:contact@houseprice.ai"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
                whileHover={{ x: 5 }}
              >
                <Mail size={18} />
                <span>contact@houseprice.ai</span>
              </motion.a>
              <p className="text-slate-400">
                <span className="font-semibold text-white">Phone:</span><br />
                +91 (555) 000-0000
              </p>
              <p className="text-slate-400 text-sm">
                Available Monday - Friday, 9 AM - 6 PM IST
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-blue-500/20 pt-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Newsletter */}
            <motion.div variants={itemVariants}>
              <h5 className="font-bold text-white mb-4">Subscribe to Updates</h5>
              <motion.div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-800/50 border border-blue-500/30 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition"
                />
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Legal */}
            <motion.div
              className="flex items-center justify-end gap-6 text-slate-400 text-sm"
              variants={itemVariants}
            >
              <motion.a
                href="#"
                className="hover:text-cyan-400 transition"
                whileHover={{ x: 3 }}
              >
                Privacy Policy
              </motion.a>
              <span>•</span>
              <motion.a
                href="#"
                className="hover:text-cyan-400 transition"
                whileHover={{ x: 3 }}
              >
                Terms of Service
              </motion.a>
              <span>•</span>
              <motion.a
                href="#"
                className="hover:text-cyan-400 transition"
                whileHover={{ x: 3 }}
              >
                Cookie Policy
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-slate-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p>© 2026 House Price Predictor. All rights reserved.</p>
            <p className="mt-2">Built with AI 🚀 | Powered by XGBoost ML</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
