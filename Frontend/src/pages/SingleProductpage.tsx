import Header from "../component/layout/Header";
import SingleProduct from "../component/product/SingleProduct";



const SingleProductpage = () => {
    return (
        <>
            <Header />
            <div className="justify-center flex m-10">
            
              <SingleProduct />
            </div>
        </>

    )
};

export default SingleProductpage;