import React, { useEffect, useState } from "react";
import { Card, Typography, Box, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const fetchSalesData = async (shop) => {
  const allShopsData = {
    "Shop A": [
      { month: "Jan", currentYear: 4000, previousYear: 3000 },
      { month: "Feb", currentYear: 4200, previousYear: 3200 },
      { month: "Mar", currentYear: 4500, previousYear: 3500 },
      { month: "Apr", currentYear: 4700, previousYear: 3700 },
      { month: "May", currentYear: 5200, previousYear: 4000 },
      { month: "Jun", currentYear: 700, previousYear: 4800 },
      { month: "Jul", currentYear: 6800, previousYear: 4700 },
      { month: "Aug", currentYear: 6500, previousYear: 4600 },
      { month: "Sep", currentYear: 6000, previousYear: 4200 },
      { month: "Oct", currentYear: 6400, previousYear: 4300 },
      { month: "Nov", currentYear: 5900, previousYear: 4100 },
      { month: "Dec", currentYear: 7000, previousYear: 5000 },
    ],
    "Shop B": [
      { month: "Jan", currentYear: 5000, previousYear: 4000 },
      { month: "Feb", currentYear: 5300, previousYear: 4200 },
      { month: "Mar", currentYear: 5600, previousYear: 4500 },
      { month: "Apr", currentYear: 5800, previousYear: 4700 },
      { month: "May", currentYear: 6300, previousYear: 5000 },
      { month: "Jun", currentYear: 7500, previousYear: 5300 },
      { month: "Jul", currentYear: 7200, previousYear: 5000 },
      { month: "Aug", currentYear: 6900, previousYear: 4800 },
      { month: "Sep", currentYear: 6500, previousYear: 4600 },
      { month: "Oct", currentYear: 6700, previousYear: 4700 },
      { month: "Nov", currentYear: 6200, previousYear: 4500 },
      { month: "Dec", currentYear: 7300, previousYear: 5500 },
    ],
  };
  return allShopsData[shop] || allShopsData["Shop A"];
};

const SalesComparisonChart = () => {
  const [data, setData] = useState([]);
  const [selectedShop, setSelectedShop] = useState("Shop A");

  useEffect(() => {
    fetchSalesData(selectedShop).then((salesData) => setData(salesData));
  }, [selectedShop]);

  return (
    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sales Comparison
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Shop</InputLabel>
          <Select value={selectedShop} onChange={(e) => setSelectedShop(e.target.value)}>
            <MenuItem value="Shop A">Shop A</MenuItem>
            <MenuItem value="Shop B">Shop B</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body1" color="primary">● Current Year</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>$37,802</Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="secondary">● Previous Year</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>$28,305</Typography>
        </Box>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="currentYear" stroke="#3b82f6" fill="#93c5fd" name="Current Year" />
          <Area type="monotone" dataKey="previousYear" stroke="#7e22ce" fill="#c4b5fd" name="Previous Year" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesComparisonChart;
