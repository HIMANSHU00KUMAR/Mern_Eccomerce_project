import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../App/store';
import { fetchProducts } from '../features/productSlice';
import ProductCard from '../component/product/ProductCard';
import { Link, useLocation } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchBar from '../component/layout/SearchBar';


// Helper function to get query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ProductSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector((state: RootState) => state.product);
  const query = useQuery();
  const categoryQuery = query.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categoryQuery) {
      setSelectedCategory(categoryQuery.toLowerCase());
    }
  }, [categoryQuery]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearchTerm;
  });

  let content;

  if (status === 'loading') {
    content = <CircularProgress />;
  } else if (status === 'succeeded') {
    content = (
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id ?? ''} xs={12} sm={6} md={4}>
            <ProductCard product={{ ...product, _id: product._id?.toString() ?? '' }} />
          </Grid>
        ))}
      </Grid>
    );
  } else if (status === 'failed') {
    content = <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <Link to="/checkout">
          <button className="bg-blue-500 rounded-md capitalize font-bold p-2 w-32 m-4">
            Go to Cart
          </button>
        </Link>
      </div>

      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          Products
        </Typography>

        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        <div className="flex justify-center space-x-4 mb-4">
          <Button
            variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === 'men' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('men')}
          >
            Men
          </Button>
          <Button
            variant={selectedCategory === 'women' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('women')}
          >
            Women
          </Button>
          <Button
            variant={selectedCategory === 'child' ? 'contained' : 'outlined'}
            onClick={() => handleCategoryChange('child')}
          >
            Kids
          </Button>
        </div>

        {content}
      </Container>
    </div>
  );
};

export default ProductSection;
