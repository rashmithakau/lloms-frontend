import React from 'react'
import { AiFillMail } from "react-icons/ai";
import { AiFillPhone } from "react-icons/ai";
import { AiOutlineComment } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, MenuItem, Button } from "@mui/material";
import Box from '@mui/material/Box';
import MapComponent from "./MapComponent"

const ContactUs = () => {
    const txtStyle={
        "& label.Mui-focused": { color: "gray", backgroundColor: "transparent" },
        "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "gray" },
        "&:hover fieldset": { borderColor: "gray" },
        "&.Mui-focused fieldset": { borderColor: "gray" },
}
}

    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
    setCategory(event.target.value);
    };

  return (
    <div>
    <div className="flex flex-col md:flex-row justify-center items-start p-10 mt-10 mx-20 rounded-lg bg-gray-200 border border-gray-300 shadow-lg shadow-gray-200">
      {/* Left Section */}
      <div className="md:w-1/2 pr-8">
        <h1 className="text-4xl font-bold text-gray-700">We're Ready To Help You!</h1>
        <p className="mt-4 text-gray-500">
          We’re here to help! Fill out the form or reach us via email or phone.
          Our Customer Care Team is available to help you get the best experience.
        </p>
        <div className="mt-6 space-y-4">
          <p className="flex items-center text-gray-500"><span className="mr-2"><AiFillMail /></span> littlelanka@gmail.com</p>
          <p className="flex items-center text-gray-500"><span className="mr-2"><AiFillPhone /></span> 071 6767670</p>
          <p className="flex items-center text-gray-500"><span className="mr-2"><AiOutlineComment /></span> chat with us</p>
          <p className="flex items-center text-gray-500"><span className="mr-2"><BsFacebook /></span> search us</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Name" required fullWidth className="!bg-gray-100 !rounded-sm" sx={txtStyle} />
          <TextField label="Email" required fullWidth className="!bg-gray-100 !rounded-sm" sx={txtStyle} />
          <TextField label="Phone Number (optional)" fullWidth className="!bg-gray-100 !rounded-sm" sx={txtStyle}/>
          <TextField label="Outlet" fullWidth className="!bg-gray-100 !rounded-sm" sx={txtStyle}/>

          <Box sx1={{ minWidth: 120 }} className="!bg-gray-100 !rounded-sm col-span-2" sx={txtStyle}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category *"
                onChange={handleChange}
              >
                <MenuItem value={"suggesion"}>Suggesion</MenuItem>
                <MenuItem value={"request"}>Request</MenuItem>
                <MenuItem value={"complain"}>Complain</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField label="Message" required fullWidth multiline rows={4} className="col-span-2 !bg-gray-100 !rounded-sm" sx={txtStyle} />
          <Button variant="contained" fullWidth className="!bg-orange-400 hover:!bg-orange-500 text-white py-2 col-span-2">
            SUBMIT
          </Button>
        </form>
      </div>
    </div>
    <MapComponent/>
    </div>
  );
};

export default ContactUs;
