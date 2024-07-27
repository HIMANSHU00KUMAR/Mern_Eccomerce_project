import React from 'react';
import { Link } from 'react-router-dom';

const Landing2: React.FC = () => {
  return (
    <div className="flex max-lg:flex-wrap lg:justify-center max-md:w-full">
      {/* Women Collection */}
      <div className="flex justify-between w-[505px] min-h-[457px] bg-[#E5E2DD] mx-16 my-10 max-md:w-full max-md:mx-0">
        <div className="flex flex-col relative left-16 h-1/4 top-80 max-md:w-full max-md:h-0">
          <span className="capitalize font-semibold text-sm">hot deals</span>
          <span className="uppercase font-bold text-xl">Women's Collection</span>
          <div>
            <Link to="/product?category=women">
              <button className="uppercase font-medium text-lg text-red-500 border-b-2 border-red-600">shop now</button>
            </Link>
          </div>
        </div>
        <img className="w-[251px] h-[440px]" src="./images/landing2girl.png" />
      </div>

      {/* Men Collection */}
      <div className="flex flex-col relative right-10 max-lg:left-16 max-lg:bottom-10 max-md:w-full max-md:left-0">
        <div className="w-[505px] h-[214px] bg-[#E5E2DD] my-10 mr-10 flex justify-between max-md:w-full">
          <div className="flex flex-col relative left-16 h-1/4 top-24">
            <span className="capitalize font-semibold text-sm">hot deals</span>
            <span className="uppercase font-bold text-xl">Men's Collection</span>
            <div>
              <Link to="/product?category=men">
                <button className="uppercase font-medium text-lg text-red-500 border-b-2 border-red-600 mt-2">shop now</button>
              </Link>
            </div>
          </div>
          <img className="w-[239px] h-[186px]" src="./images/landing2men.png" />
        </div>

        {/* Child Collection */}
        <div className="w-[505px] h-[214px] bg-[#E5E2DD] mr-10 flex justify-between max-md:w-full">
          <div className="flex flex-col relative left-16 h-1/4 top-24">
            <span className="capitalize font-semibold text-sm">hot deals</span>
            <span className="uppercase font-bold text-xl">Child's Collection</span>
            <div>
              <Link to="/product?category=child">
                <button className="uppercase font-medium text-lg text-red-500 border-b-2 border-red-600 mt-2">shop now</button>
              </Link>
            </div>
          </div>
          <img className="w-[108px] h-[197px] mr-10" src="./images/landing2child.png" />
        </div>
      </div>
    </div>
  );
}

export default Landing2;
