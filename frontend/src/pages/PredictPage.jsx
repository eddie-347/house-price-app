import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Zap } from 'lucide-react';
import { predictPrice } from '../services/api';

const PredictPage = () => {
  const [formData, setFormData] = useState({
    area: '',
    bedrooms: '',
    location: '',
    amenities: 0,
    gym: false,
    pool: false,
    garden: false,
    parking: false,
    security: false,
    playground: false,
    cafeteria: false,
    library: false,
    theatreAndJogging: false,
    clubhouse: false,
    servant_quarter: false,
    intercom: false,
    sports_complex: false,
    wifi: false,
    elevator: false,
    fire_safety: false,
    supermarket: false,
    rainwater_harvesting: false,
    power_backup: false,
    maintenance_staff: false,
    visitor_parking: false,
    furnish_type: 'unfurnished',
    possession_type: 'ready_to_move',
    floor_level: 'ground',
    flooring_type: 'ceramic',
    water_source: 'municipality',
    facing_type: 'north',
    gated_community: false,
    covered_parking: false,
    open_parking: false,
    balcony: false,
    study_room: false,
    store_room: false,
    vastu_compliant: false,
    new_construction: false,
    resale: false,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const amenitiesList = [
    'gym', 'pool', 'garden', 'parking', 'security', 'playground', 'cafeteria',
    'library', 'theatreAndJogging', 'clubhouse', 'servant_quarter', 'intercom',
    'sports_complex', 'wifi', 'elevator', 'fire_safety', 'supermarket',
    'rainwater_harvesting', 'power_backup', 'maintenance_staff', 'visitor_parking',
    'covered_parking', 'open_parking', 'balcony', 'study_room', 'store_room',
    'vastu_compliant', 'gated_community', 'new_construction', 'resale'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      amenities: type === 'checkbox' && amenitiesList.includes(name)
        ? prev.amenities + (checked ? 1 : -1)
        : prev.amenities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    try {
      if (!formData.area || !formData.bedrooms || !formData.location) {
        throw new Error('Please fill in Area, Bedrooms, and Location');
      }

      const response = await predictPrice(formData);
      if (response?.predicted_price !== undefined) {
        setPrediction(response.predicted_price);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 pt-24 pb-20 relative overflow-hidden">
      {/* Enhanced Background Orbs */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
        animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          className="glass-ultra-premium rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 mb-4">
              <Zap size={16} className="text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-sm">AI-Powered Property Valuation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black gradient-text-premium mb-3 text-center">
              Predict Your Price
            </h1>
            <p className="text-slate-400 text-center text-lg">
              Enter your property details for an instant AI-powered valuation
            </p>
          </motion.div>

          {error && (
            <motion.div
              className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-8 flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={20} className="text-red-400" />
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Fields */}
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {[
                { name: 'area', label: 'Area (sqft)', type: 'number', icon: '📐' },
                { name: 'bedrooms', label: 'Bedrooms', type: 'number', icon: '🛏️' },
                { name: 'location', label: 'Location', type: 'text', icon: '📍' },
              ].map((field) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                >
                  <label className="block text-slate-300 font-semibold mb-3 flex items-center gap-2">
                    <span>{field.icon}</span>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition focus:shadow-lg focus:shadow-cyan-500/20"
                    placeholder={field.label}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Amenities Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>✨</span>
                Select Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenitiesList.map((amenity, i) => (
                  <motion.label
                    key={amenity}
                    className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/30 border border-blue-500/20 hover:border-cyan-500/50 cursor-pointer transition"
                    whileHover={{ backgroundColor: "rgba(148, 163, 184, 0.1)", borderColor: "rgba(6, 182, 212, 0.5)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <input
                      type="checkbox"
                      name={amenity}
                      checked={formData[amenity]}
                      onChange={handleChange}
                      className="w-5 h-5 rounded accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-slate-300 text-sm capitalize font-medium">
                      {amenity.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()}
                    </span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Amenities Counter */}
            <motion.div
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-slate-300 text-center">
                <span className="font-bold gradient-text-premium">{formData.amenities}</span> amenities selected
              </p>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full premium-btn-enhanced text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {loading ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap size={20} />
                  Analyzing...
                </motion.div>
              ) : (
                'Predict Price'
              )}
            </motion.button>
          </form>

          {/* Results */}
          {prediction !== null && (
            <motion.div
              className="mt-12 bg-gradient-to-br from-blue-600 via-cyan-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              whileHover={{ boxShadow: "0 30px 60px rgba(59, 130, 246, 0.3)" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
                animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                transition={{ duration: 15, repeat: Infinity }}
              />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Check size={80} className="mx-auto mb-6 text-white drop-shadow-lg" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Estimated Price</h2>
                <motion.div
                  className="text-5xl md:text-6xl font-black mb-4 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  ₹{new Intl.NumberFormat('en-IN').format(Math.round(prediction))}
                </motion.div>
                <p className="text-white/90 text-lg">Based on XGBoost ML Model (95% Accuracy)</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PredictPage;
