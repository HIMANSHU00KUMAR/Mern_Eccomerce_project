import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../App/store';
import { deleteCartItem, fetchCartItems } from '../features/cartSlice';




const Checkout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.bill);
  const cartStatus = useSelector((state: RootState) => state.cart.status);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId= user?._id; // Replace with the actual user ID, e.g., from the authentication state

  useEffect(() => {
    console.log("fetching checkout")
  
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [userId, dispatch]);

  console.log("checkout sae totalamout = ",totalAmount)

  const handleDelete = (productId: string) => {
    if(userId){
      dispatch(deleteCartItem({ userId, productId }));
    }
    
  };

  if (cartStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (cartStatus === 'failed') {
    return <div>fail to load</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartStatus === 'succeeded' && (
          <>
            {cartItems && cartItems.length > 0 ? 
              
             (
              <div>
                {cartItems.map((item) => (
                    
                  <div key={item.productId} className="flex justify-between items-center p-2 border-b">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${item.price * item.quantity}</p>
                    </div>
                    <button
                        onClick={() => handleDelete(item.productId)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                  </div>
                ))}
                <div className="flex justify-end p-2">
                  <h2 className="text-xl font-bold">Total: ${totalAmount}</h2>
                </div>
              </div>
            ) :
            (<p>Your cart is empty.</p>)
          }
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
