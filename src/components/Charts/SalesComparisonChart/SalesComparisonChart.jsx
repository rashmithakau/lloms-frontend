import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Simulated fetch function
const fetchSalesData = async (shop) => {
    const allShopsData = {
      Mathara: [
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
      Mirissa: [
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
      Galle: [
        { month: "Jan", currentYear: 3000, previousYear: 2500 },
        { month: "Feb", currentYear: 3200, previousYear: 2700 },
        { month: "Mar", currentYear: 3500, previousYear: 3000 },
        { month: "Apr", currentYear: 3800, previousYear: 3300 },
        { month: "May", currentYear: 4100, previousYear: 3600 },
        { month: "Jun", currentYear: 4300, previousYear: 3900 },
        { month: "Jul", currentYear: 4600, previousYear: 4100 },
        { month: "Aug", currentYear: 4800, previousYear: 4200 },
        { month: "Sep", currentYear: 5000, previousYear: 4300 },
        { month: "Oct", currentYear: 5200, previousYear: 4400 },
        { month: "Nov", currentYear: 5400, previousYear: 4500 },
        { month: "Dec", currentYear: 5600, previousYear: 4700 },
      ],
      Tangalle: [
        { month: "Jan", currentYear: 2000, previousYear: 1500 },
        { month: "Feb", currentYear: 2200, previousYear: 1700 },
        { month: "Mar", currentYear: 2500, previousYear: 2000 },
        { month: "Apr", currentYear: 2700, previousYear: 2300 },
        { month: "May", currentYear: 3000, previousYear: 2600 },
        { month: "Jun", currentYear: 3200, previousYear: 2800 },
        { month: "Jul", currentYear: 3400, previousYear: 3000 },
        { month: "Aug", currentYear: 3600, previousYear: 3100 },
        { month: "Sep", currentYear: 3800, previousYear: 3200 },
        { month: "Oct", currentYear: 4000, previousYear: 3300 },
        { month: "Nov", currentYear: 4200, previousYear: 3400 },
        { month: "Dec", currentYear: 4400, previousYear: 3600 },
      ],
      Weligama: [
        { month: "Jan", currentYear: 2700, previousYear: 2200 },
        { month: "Feb", currentYear: 2900, previousYear: 2400 },
        { month: "Mar", currentYear: 3100, previousYear: 2600 },
        { month: "Apr", currentYear: 3300, previousYear: 2800 },
        { month: "May", currentYear: 3500, previousYear: 3000 },
        { month: "Jun", currentYear: 3700, previousYear: 3200 },
        { month: "Jul", currentYear: 3900, previousYear: 3400 },
        { month: "Aug", currentYear: 4100, previousYear: 3600 },
        { month: "Sep", currentYear: 4300, previousYear: 3800 },
        { month: "Oct", currentYear: 4500, previousYear: 4000 },
        { month: "Nov", currentYear: 4700, previousYear: 4200 },
        { month: "Dec", currentYear: 4900, previousYear: 4400 },
      ],
    };
  
  

  return allShopsData[shop] || [];
};

const SalesComparisonChart = () => {
  const [data, setData] = useState([]);
  const [selectedShop, setSelectedShop] = useState("Mathara");

  useEffect(() => {
    fetchSalesData(selectedShop).then((salesData) => setData(salesData));
  }, [selectedShop]);

  const totalCurrentYear = data.reduce(
    (sum, item) => sum + item.currentYear,
    0
  );
  const totalPreviousYear = data.reduce(
    (sum, item) => sum + item.previousYear,
    0
  );

  return (
    <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Sales Comparison
        </Typography>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel>Shop</InputLabel>
          <Select
            value={selectedShop}
            onChange={(e) => setSelectedShop(e.target.value)}
          >
            <MenuItem value="Mathara">Mathara</MenuItem>
            <MenuItem value="Mirissa">Mirissa</MenuItem>
            <MenuItem value="Galle">Galle</MenuItem>
            <MenuItem value="Tangalle">Tangalle</MenuItem>
            <MenuItem value="Weligama">Weligama</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="body1" color="primary">
            ● Current Year
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Rs{totalCurrentYear.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" color="secondary">
            ● Previous Year
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Rs{totalPreviousYear.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="currentYear"
            stroke="#3b82f6"
            fill="#93c5fd"
            name="Current Year"
          />
          <Area
            type="monotone"
            dataKey="previousYear"
            stroke="#7e22ce"
            fill="#c4b5fd"
            name="Previous Year"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesComparisonChart;
