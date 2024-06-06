import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../../App/store';

const images = [
  './images/image1.png',
  './images/image2.png',
  './images/image3.png',
  './images/image4.png'
];

const Landing1: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const isAuthenticated =useSelector((state:RootState)=> state.auth.isAuthenticated);
  const navigate=useNavigate();

  function handleShopbutton(){
    if(isAuthenticated){
      navigate("/product")
    }
    else{
      alert("Please Signin First!")
    }
  }

  return (
    <div className="bg-red-100 w-full lg:w-[1200px] h-auto lg:h-[584px] flex flex-col lg:flex-row relative   max-md:h-full">

      <div className="absolute w-[383px] h-[191.5px] lg:mx-[650px] my-[1.5px]   max-md:w-full max-md:static">
        <img src="./images/landing1Group 2.png" alt="Landing Top" className="w-full h-full object-contain"/>
      </div>

      <div className="flex flex-col mx-4 lg:mx-[105px] my-[50px] lg:my-[119px] w-full lg:w-[926px] h-auto lg:h-[303px]  z-10">
        <span className="font-medium text-3xl lg:text-5xl rounded-sm my-4 bg-yellow-100 w-72 p-1 text-center mx-auto lg:mx-0">WELCOME</span>
        <span className="font-medium text-3xl lg:text-5xl uppercase text-center lg:text-left">To Sizzling Summer Sale</span>
        <span className="font-medium text-md p-2 text-center lg:text-left">Summer-2024</span>
        <div className="bg-white w-40 text-center my-5 p-4 text-red-600 font-medium text-lg mx-auto lg:mx-0"> 
          <button onClick={handleShopbutton}>SHOP NOW</button>
        </div>

     
      </div>

      <div className="w-[396.94px] h-[570px] mx-auto lg:absolute lg:right-48 my-5 z-0 max-md:w-full max-md:h-auto max-md:my-8">
        <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="w-full h-full object-contain"/>
      </div>

      <div className="absolute w-[450px] h-[232.5px] lg:mx-[490px] my-[352px] max-lg:my-[752px]  max-md:w-full max-md:h-auto max-md:relative max-md:my-8">
        <img src="./images/landing1downGroup 1 (2).png" alt="Landing Bottom" className="w-full h-full object-contain"/>
      </div>
      <div className="flex absolute my-5 bottom-0 left-1/2">
          {images.map((_, index) => (
            <div 
              key={index} 
              className={`w-4 h-4 mx-1 rounded-full  cursor-pointer ${index === currentImageIndex ? 'bg-pink-500' : 'bg-gray-300'}`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
      
    </div>
  );
};

export default Landing1;
