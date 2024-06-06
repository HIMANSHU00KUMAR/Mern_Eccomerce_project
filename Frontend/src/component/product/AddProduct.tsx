// src/components/AddProduct.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../App/store';
import { addProduct, resetProduct, setProductData } from '../../features/productSlice';




const AddProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productState = useSelector((state: RootState) => state.product);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setProductData({ ...productState, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', productState.title);
    formData.append('description', productState.description);
    formData.append('price', productState.price.toString());
    formData.append('stock', productState.stock.toString());
    formData.append('category', productState.category);
    if (imageFile) {
      formData.append('images', imageFile);
    }

    dispatch(addProduct(formData));
    dispatch(resetProduct());
    
  };

  return (
    
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={productState.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={productState.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={productState.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={productState.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product stock"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={productState.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter product category"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
   
  );
};

export default AddProduct;
