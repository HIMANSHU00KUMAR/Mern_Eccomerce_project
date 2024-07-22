
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../../features/cartSlice';
import { AppDispatch, RootState } from '../../App/store';
import { useState } from 'react';
import {  MinusOutlined, PlusOutlined, ShoppingCartOutlined, StarFilled, StarOutlined } from '@ant-design/icons';







interface ProductCardProps {
  product: {
    _id: string; // Ensure _id is explicitly defined as string
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log("product hain product card sae", product);
  const dispatch: AppDispatch = useDispatch();

  const [quantity, setquantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);

  const handleAddquantity = () => {
    setquantity(quantity + 1);
  }
  const handleSubquantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  }


  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user details productcard sae", user);

  const userId = user?._id;
  const productId = product._id;

  const handleAddToCart = () => {
    if (userId) {  // Ensure userId is defined before dispatching
      console.log("product ka id", product._id);
      console.log("add cart mae", userId);
      dispatch(addCartItem({ userId, productId, quantity: quantity }));

      setShowNotification(true);

      // Hide notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);


    } else {
      console.error("User ID is not available. Cannot add to cart.");
      // Optionally, you can show an error message to the user here
    }

  };



  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm max-w-[287px]">
      <div className="flex flex-col justify-center items-center bg-gray-300 rounded-lg aspect-square">
        <div className="flex overflow-hidden relative flex-col w-full aspect-square">
          <img
            loading="lazy"
            srcSet={product.images}
            className="object-cover absolute inset-0 size-full"
          />
          <div className="relative shrink-0 h-32 bg-white bg-opacity-0" />
          <div className="relative shrink-0 bg-white bg-opacity-0 h-[127px]" />
        </div>
      </div>
      <div className="flex gap-2.5 justify-between mt-2 w-full">
        <div className="flex gap-1 my-auto">
        <StarFilled style={{ fontSize: '13px' }} />
        <StarFilled style={{ fontSize: '13px' }} />
        <StarFilled style={{ fontSize: '13px' }} />
        <StarFilled style={{ fontSize: '13px' }} />
        <StarOutlined style={{ fontSize: '13px' }} />
        </div>
        <div className="text-lg font-semibold text-zinc-700">${product.price}</div>
      </div>
      <div className="mt-2 text-base text-zinc-700">
        {product.title}
      </div>
      <div className="mt-2 text-xs text-gray-600">{product.category}</div>
      <div className="flex gap-2.5 justify-between mt-2 text-lg">

        <div className="flex gap-4 justify-between py-2 pr-2 pl-4 my-auto whitespace-nowrap bg-white rounded-lg border border-gray-400 border-solid text-zinc-700">
          <MinusOutlined onClick={handleSubquantity}/>
          <div>{quantity}</div>
          <PlusOutlined onClick={handleAddquantity}/>
         
        </div>
        <div onClick={handleAddToCart} className="flex gap-2.5 px-2 py-3 font-bold text-blue-50 uppercase rounded-lg bg-teal-950 cursor-pointer">
        <ShoppingCartOutlined />
          
          <div className='text-sm text-center'>Add to cart</div>
          {showNotification && (
     <div className="fixed top-4  capitalize font-bold right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Item added to cart!
        </div>
      )}
        </div>
      </div>
     
    </div>
  );
};

export default ProductCard;
