import { Link } from "react-router-dom"
import SignInForm from "../users/SignInForm";
import { useState } from "react";
import SignUpForm from "../users/SignUpForm";
import { RootState } from "../../App/store";
import { useSelector } from "react-redux";
import AccountMenu from "./AccountMenu";


const Header = () => {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user=useSelector((state:RootState)=>state.auth.user);
  const isAdmin=user?.isAdmin;

  const switchToSignUp = () =>{
    setSignUpOpen(true);
    setSignInOpen(false);

  } 
  const switchToSignIn = () =>{
    setSignInOpen(true);
    setSignUpOpen(false);
  }
     

  const handleSignInClick = () => {
    setSignInOpen(true);
  };

  return (
    <nav className=" p-0 my-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-xl font-bold">E-commerce</Link>
        <div className="flex space-x-10 mr-10 justify-evenly ">
          <Link to="/" className="text-black font-bold hover:text-gray-200 text-lg">Home</Link>
          {isAdmin && <Link to="/add-product" className="text-black font-bold hover:text-gray-200 text-lg">Add Product</Link>}
          {isAdmin && <Link to="/product-details" className="text-black font-bold hover:text-gray-200 text-lg">Product Details</Link>}
          {isAuthenticated ? 
            <AccountMenu/>
             :
            <button className="text-black font-bold hover:text-gray-200 text-lg" onClick={handleSignInClick}>Sign In</button>
          }
          
        </div>
        
      </div>
      {isSignInOpen && !isAuthenticated && <SignInForm  switchToSignUp={switchToSignUp} />}
      {isSignUpOpen && <SignUpForm  switchToSignIn={switchToSignIn} />}

      

    </nav>
  )
}

export default Header
