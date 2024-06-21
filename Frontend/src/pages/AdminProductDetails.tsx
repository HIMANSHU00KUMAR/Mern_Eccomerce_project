// src/components/AdminProductDetails.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAdminProduct, fetchAdminProducts } from '../features/adminProductSlice';
import { AppDispatch, RootState } from '../App/store';



const AdminProductDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, status, error } = useSelector((state: RootState) => state.adminProduct);
 

  useEffect(() => {
    console.log("fetiching product amin wala")
    dispatch(fetchAdminProducts());
},[dispatch]);



  const handleDelete = (id: string) => {
    console.log("delete sae id = ",id)
    dispatch(deleteAdminProduct(id));
    console.log("fetchin in delete wala")
    dispatch(fetchAdminProducts());
  };

 

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-product-details p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product._id} className="product-item p-4 border rounded-md shadow-md">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <div className="product-images flex space-x-2 mt-2">
              
                <img src={`${product.images}`} alt={product.title} className="w-16 h-16 object-cover" />
             
            </div>
            <div className="mt-2 flex space-x-2">
              <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AdminProductDetails;
