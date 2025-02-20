import React from "react";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";

const OutletCard = ({ photo, location, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full"
    >
      <Card className="grid grid-cols-2 items-center rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Image Section */}
        <CardMedia
          component="img"
          image={photo}
          alt="Outlet"
          className="w-full h-full object-cover"
        />
        
        {/* Text Section */}
        <CardContent className="p-4 flex flex-col gap-2">
          <Typography variant="h6" className="font-semibold text-gray-800">
            {location}
          </Typography>
          <Chip
            label={isActive ? "Active" : "Inactive"}
            className="mt-2"
            color={isActive ? "success" : "error"}
            sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OutletCard;
