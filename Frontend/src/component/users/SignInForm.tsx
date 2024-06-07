// src/components/SignUpForm.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail,setPassword,resetForm } from '../../features/signInSlice';
import { AppDispatch, RootState } from '../../App/store';
import axios from 'axios';
import { loadUserDetails, setAuth } from '../../features/authSlice';
import { BASE_URL } from '../../utilis';


interface SignInFormProps {
  switchToSignUp:()=>void;
}

const SignInForm: React.FC<SignInFormProps> = ({ switchToSignUp }) => {
  const dispatch: AppDispatch = useDispatch();
  const { email, password } = useSelector((state:RootState ) => state.signIn);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Post data to your server
    try {
     const response= await axios.post(`${BASE_URL}/api/users/login`, { email, password });
     const user = response.data.user;
     const token=response.data.user.token;
     console.log(response.data)
     alert(response.data.message!);
      dispatch(setAuth({ user, token }));
      dispatch(resetForm());
      dispatch(loadUserDetails());
      
      // Add any additional logic after successful sign-in
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            Sign In
          </button>
          <p className="mt-4 text-sm">
              Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={switchToSignUp}>Sign Up</span>
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
