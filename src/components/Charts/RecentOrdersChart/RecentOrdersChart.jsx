import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from "recharts";

const data = [
  { name: "Jan", value: 90 },
  { name: "Feb", value: 75 },
  { name: "Mar", value: 80 },
  { name: "Apr", value: 70 },
  { name: "May", value: 85 },
  { name: "Jun", value: 78 },
  { name: "Jul", value: 82 },
  { name: "Aug", value: 88 },
  { name: "Sep", value: 95 },
  { name: "Oct", value: 80 },
  { name: "Nov", value: 85 },
  { name: "Dec", value: 50 },
];

const RecentOrdersChart = () => {
  return (
   <div className="w-full">
     <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">
            Recent Order
          </Typography>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
            <defs>
              <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis hide />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="url(#colorBlue)" />
            <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
   </div>
  );
};

export default RecentOrdersChart;
