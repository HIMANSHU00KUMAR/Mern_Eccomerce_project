import axios from "axios";
import { useEffect, useState } from "react";
import { addCartItem } from '../../features/cartSlice';
import { AppDispatch, RootState } from '../../App/store';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../utilis";


interface Product{
   _id: string; // Ensure _id is explicitly defined as string
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string;
}

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/product/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        setError('Product not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;
  const productId: string | undefined = product?._id;

  const handleAddToCart = () => {
    if (userId && productId) { 
      dispatch(addCartItem({ userId, productId, quantity: 1 }));
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    } else {
      console.error("User ID is not available. Cannot add to cart.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <img
            loading="lazy"
            src={product?.images}
            alt={product?.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
            <p className="text-xl font-semibold text-gray-800 mb-4">${product?.price}</p>
            <p className="text-gray-600 mb-6">{product?.description}</p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold">Category:</span>
              <span className="text-sm">{product?.category}</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold">Stock:</span>
              <span className="text-sm">{product?.stock}</span>
            </div>
            <div className="flex gap-2 mb-6">
              {['XS', 'S', 'M', 'L', 'XL', '2X'].map(size => (
                <div
                  key={size}
                  className="px-4 py-2 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200"
                >
                  {size}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 mb-6">
              <a href="#" className="underline hover:text-gray-700">Find your size</a> | <a href="#" className="underline hover:text-gray-700">Measurement guide</a>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add to Cart
          </button>
          {showNotification && (
            <div className="fixed top-4 right-4 p-3 bg-green-500 text-white rounded-lg shadow-lg transition-opacity duration-500">
              Item added to cart!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
