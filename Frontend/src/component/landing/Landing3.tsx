import { useEffect } from "react";
import { AppDispatch, RootState } from "../../App/store";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from "../../features/productSlice";


const Landing3:React.FC= () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("landing page ka ",products)

  return (
    <div className="flex flex-col items-center">
      <span className="uppercase font-semibold text-2xl text-center mt-8">Our Trendy <span className="font-bold">Products</span> </span>

      <div className="w-full max-w-6xl mx-8 my-10 flex flex-wrap justify-center gap-4">

        {products.slice(0, 3).map(product => (
          <div key={product._id} className="mb-5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="max-w-xs mx-auto">
              <img className="p-2 w-full h-64 bg-[#E5E2DD] object-cover" src={product.images} alt={product.title} />
              <div className="flex flex-col ml-2 my-2">
                <span className="capitalize font-medium text-sm">dress</span>
                <span className="uppercase font-medium text-sm">{product.title}</span>
                <span>${product.price}</span>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Landing3
