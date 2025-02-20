import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FillButton from '../../buttons/FillButton';
import BorderButton from '../../buttons/BorderButton';

const CusDetailsPopup = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] =useState({
    name: '',
    phone: ''
  });

  const [isValid, setIsValid] = useState(false);

  //validation function for name
  const validateName = (value) => {
    if (!value.trim()){
      return 'Name is required';
    }
    if (!/[a-zA-Z0-9 ]+$/.test(value)){
      return 'Name can only contain letters, numbers and spaces'
    }
    return '';
  }

  const handleNameChange =(e) =>{
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({
      ...prev,
      name: validateName(value)
    }));
  }

  //validation function for phone
  const validatePhone = (value) => {
    if(!value){
      return 'phone number is required';
    }
    if(value.length !== 10){
      return 'phone number must be 10 digits';
    }
    if(!value.startsWith('0')){
      return 'phone number must start with 0';
    }
    if(!/^\d+$/.test(value)){
      return 'phone  number must contain only digits'
    }
    return '';
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value == '' || /^\d+$/.test(value)){
      setPhone(value.slice(0,10));
      setErrors(prev => ({
        ...prev,
        phone: validatePhone(value.slice(0,10))
      }));
    }
  }

  useEffect(()=>{
    const nameError = validateName(name);
    const phoneError = validatePhone(phone);
    setIsValid(!nameError && !phoneError);
  },[name,phone]);

  const handleSubmit = () => {
    if (isValid) {
      onSubmit({ name, phone });
      setName('');
      setPhone('');
      setErrors({name: '', phone:''})
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
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="text"
            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            value={phone}
            onChange={handlePhoneChange}
            phoneholder="0XXXXXXXXX"
          />
          {errors.phone && (
            <p className='text-red-500 test-sm mt-1'>{errors.phone}</p>
          )}
        </div>
        <div className="flex justify-between">
          
          <div className='flex gap-10'>
          <FillButton 
            onClick={handleSubmit}
            disabled={!isValid}
            className={!isValid ? 'opacity-50 cursor-not-allowed' : ''}  
          >
            Ok
          </FillButton>
          <BorderButton onClick={onClose}>Cancel</BorderButton>
          </div>

    
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CusDetailsPopup;
