import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FillButton from '../../buttons/FillButton';
import BorderButton from '../../buttons/BorderButton';

const CusDetailsPopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (name.trim() && phone.trim()) {
      onSubmit({ name, phone });
      setName('');
      setPhone('');
      onClose(); // Close popup after submission
    }
  };

  return (
    <div className={`fixed inset-0  bg-opacity-20 backdrop-blur-sm z-20 flex justify-center items-center ${isOpen ? 'block' : 'hidden'}`}>
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center mb-4">Enter Customer Details</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Customer Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-6">
          <FillButton onClick={handleSubmit}>Ok</FillButton>
          <BorderButton onClick={onClose}>Cancel</BorderButton>
        </div>
      </motion.div>
    </div>
  );
};

export default CusDetailsPopup;
