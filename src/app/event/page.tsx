'use client';
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Lỗi không xác định');
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Sự kiện & Khuyến mãi</h2>
      {loading && (
        <div className="flex justify-center items-center h-40">
          <motion.div
            className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      )}
      {error && (
        <motion.div
          className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-center font-semibold shadow animate-fade-in"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      <AnimatePresence>
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
            }}
          >
            {events.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">Chưa có sự kiện nào.</div>
            ) : (
              events.map((event) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 hover:shadow-2xl transition-shadow border border-gray-100"
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  layout
                >
                  <div className="font-semibold text-lg text-blue-700 mb-1">{event.title}</div>
                  <div className="text-gray-700">{event.description}</div>
                  <div className="text-xs text-gray-400 mt-2">Bắt đầu: {new Date(event.startTime).toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Kết thúc: {new Date(event.endTime).toLocaleString()}</div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventPage;