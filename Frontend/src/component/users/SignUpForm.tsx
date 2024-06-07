import { useDispatch,useSelector } from "react-redux";
import { setName,setEmail,setPassword, resetForm } from "../../features/signUpSlice";
import  { RootState } from "../../App/store";
import axios from "axios";
import { BASE_URL } from "../../utilis";


interface SignUpFormProps {
    switchToSignIn:()=>void;
}

const SignUpForm: React.FC<SignUpFormProps>  = ({ switchToSignIn }) => {
  const dispatch=useDispatch();
  const { name, email, password } = useSelector((state:RootState) => state.signUp);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Post data to your server
    try {
      await axios.post(`${BASE_URL}/api/users/register`, { name, email, password });
      alert("user Register successfully!")
      dispatch(resetForm());
      switchToSignIn();
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="name"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => dispatch(setPassword(e.target.value))}
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Sign Up
              </button>
              <p className="mt-4 text-sm">
                 Already have an account? <span className="text-blue-500 cursor-pointer" onClick={switchToSignIn}>Sign In</span>
              </p>
        
           
            </form>
          </div>
        </div>
      );
}

export default SignUpForm
