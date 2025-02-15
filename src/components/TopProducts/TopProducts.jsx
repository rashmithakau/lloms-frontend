import React, { useEffect, useState } from "react";
import { Card, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";

const fetchData = async () => {
  return [
    { id: 1, name: "Patimax Fragrance Long...", items: 100, coupon: "$flat", discount: "-15%", price: "$27.00", flag: "🇪🇸" },
    { id: 2, name: "Nulo MedalSeries Adult Cat...", items: 100, coupon: "$flat", discount: "-15%", price: "$27.00", flag: "🇮🇳" },
    { id: 3, name: "Pedigree Puppy Dry Dog...", items: 100, coupon: "$flat", discount: "-15%", price: "$27.00", flag: "🇬🇧" },
    { id: 4, name: "Biscoito Premier Cookie...", items: 100, coupon: "$flat", discount: "-15%", price: "$27.00", flag: "🇧🇷" },
    { id: 5, name: "Pedigree Adult Dry Dog...", items: 100, coupon: "$flat", discount: "-15%", price: "$27.00", flag: "🇫🇷" },
  ];
};

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData().then((data) => setProducts(data));
  }, []);

  return (
   <div className="wi-full"> 
   <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
   <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "#333" }}>
     Top Products On January
   </Typography>
   <List>
     {products.map((product) => (
       <ListItem key={product.id} sx={{ display: "flex", justifyContent: "space-between", p: 2, borderBottom: "1px solid #ddd" }}>
         <ListItemAvatar>
           <Avatar sx={{ bgcolor: "#fff", border: "1px solid #ddd" }}>{product.flag}</Avatar>
         </ListItemAvatar>
         <ListItemText
           primary={product.name}
           secondary={`${product.items} Items`}
           sx={{ flexGrow: 1, color: "#555" }}
         />
         <Box textAlign="right">
           <Typography variant="body2" color="textSecondary">
             Item Code: <strong>{product.coupon}</strong>
           </Typography>
           <Typography variant="body2" sx={{ fontWeight: "bold", color: "green", mt: 1 }}>
             Sale: {product.discount}
           </Typography>
           <Typography variant="body2" sx={{ fontWeight: "bold", color: "#333", mt: 1 }}>
             {product.price}
           </Typography>
         </Box>
       </ListItem>
     ))}
   </List>
 </Card></div>
  );
};

export default TopProducts;
