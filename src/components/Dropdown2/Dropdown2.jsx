import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown2 = ({  value, onChange, options }) => {
  return (
    <FormControl
      sx={{
        width: '200px',
        '& .MuiSelect-root': { minHeight: '30px' },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d81b60', // Set the border color to pink when focused
          },
        },
      }}
    >

      <Select
        labelId="dropdown2-label"
        id="dropdown2-select"
        value={value}
        onChange={onChange}
        sx={{
          height: '35px',
          fontSize: '14px',
          backgroundColor: '#fef9f9', // Very light pink background (almost white)
          borderColor: '#f8bbd0',     // Light pink border
          '&:hover': {
            backgroundColor: '#fef9f9', // No color change on hover
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: '14px',
              minHeight: '35px',
              '&.Mui-selected': {
                backgroundColor: '#f8bbd0', // Light pink when selected
                color: '#fff',              // White text for selected
              },
              '&.Mui-selected:hover': {
                backgroundColor: '#f06292', // Darker pink on hover if selected
              },
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown2;
