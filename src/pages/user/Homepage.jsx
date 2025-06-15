import React from "react";
import Slider1 from "../../components/user/homepage/Slider1";
import Slider3 from "../../components/user/homepage/Slider3";
import Banner0 from "../../components/user/homepage/Banner0";
import ProductSkeleton from "./../../components/user/etc/ProductSkeleton";
import { useEffect } from "react";
import { useState } from "react";
import Banner4 from './../../components/user/homepage/Banner4';
import Banner5 from "../../components/user/homepage/Banner5";
import Slider4 from './../../components/user/homepage/Slider4';
import Banner6 from './../../components/user/homepage/Banner6';


const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  if (isLoading) {
    return <ProductSkeleton />;
  }
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto  justify-center items-center">
        <Banner0 />
    
        <Slider1 />
    
        <Banner4 />
    
        <Slider4 />
        
       <div className="space-y-8">
       <Banner6 />

{/* <Slider6 /> */}

<Banner5 />
       </div>
   
        <Slider3 />
      </div>
    {/* <div className="hidden sm:block">
    <NavigationBarLaptop />
    </div>
     <div className="block sm:hidden">
        <NavigationBarMobile />
        </div> */}
    </div>
  );
};

export default Homepage;
