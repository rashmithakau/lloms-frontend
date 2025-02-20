import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FillButton from '../../buttons/FillButton';
import BorderButton from '../../buttons/BorderButton';

const CusDetailsPopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    if (name && phone) {
      onSubmit({ name, phone });
      setName('');
      setPhone('');
    }
  };

  return (
    <motion.div
      className={`fixed inset-0  bg-opacity-10 backdrop-blur-sm ${isOpen ? 'flex' : 'hidden'} justify-center items-center z-20`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-150"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
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
        <div className="flex justify-between">
          
          <div className='flex gap-10'>
          <FillButton onClick={handleSubmit}>Ok</FillButton>
          <BorderButton onClick={onClose}>Cancel</BorderButton>
          </div>

    
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CusDetailsPopup;
