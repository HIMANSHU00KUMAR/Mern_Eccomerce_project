// src/components/ProductCard.tsx
import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../features/cartSlice';
import { RootState } from '../../App/store';
import { BASE_URL } from '../../utilis';

interface ProductCardProps {
  product:{
    category:string,
    description:string,
    images:string,
    price:number,
    title:string,
    _id:string,
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("product hain product card sae",product)
  const dispatch=useDispatch();
  
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user details productcard sae",user);

  const userId=user?._id;
  const productId=product._id;

  const handleAddToCart = () => {
    console.log("product ka id",product._id)
    console.log("add cart mae",userId)
    dispatch(addCartItem({ userId, productId, quantity: 1 }));
  };

  return (
    
    <Card>
    
      <CardMedia
        component="img"
        height="140"
        image={`${BASE_URL}/image/${product.images}`}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary ">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddToCart} >
          Add to Cart
        </Button>
        
      </CardContent>
    </Card>
  );
};

export default ProductCard;
