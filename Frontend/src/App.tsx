import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserDetails } from './features/authSlice';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddProductpage from './pages/AddProductpage';
import ProductSection from './pages/ProductSection';
import Checkout from './pages/Checkout';
import AdminProductDetails from './pages/AdminProductDetails';
import PrivateRoute from './component/PrivateRoute';
import { AppDispatch } from './App/store';
import SingleProductpage from './pages/SingleProductpage';




const App = () => {
  const dispatch: AppDispatch = useDispatch();
 

  useEffect(() => {
    dispatch(loadUserDetails());
   
  }, );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/add-product"
          element={<PrivateRoute element={<AddProductpage />} />}
        />
        <Route
          path="/product"
          element={<PrivateRoute element={<ProductSection />} />}
        />
        <Route
          path="/checkout"
          element={<PrivateRoute element={<Checkout />} />}
        />
        <Route
          path="/product-details"
          element={<PrivateRoute element={<AdminProductDetails />} />}
        />
        <Route
          path="/single-product/:id"
          element={<SingleProductpage/>}
        />
        
      </Routes>
    </BrowserRouter>
  
  
 
  )
}

export default App
