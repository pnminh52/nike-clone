import React from "react";
import Slider1 from "../../components/user/homepage/Slider1";
import Slider3 from "../../components/user/homepage/Slider3";
import Banner0 from "../../components/user/homepage/Banner0";
import Banner3 from "../../components/user/homepage/Banner3";
import ProductSkeleton from "./../../components/user/etc/ProductSkeleton";
import { useEffect } from "react";
import { useState } from "react";
import Banner4 from './../../components/user/homepage/Banner4';
import Banner5 from "../../components/user/homepage/Banner5";
import NavigationBar from "../../components/user/etc/NavigationBar";



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
      </div>
      <div className="max-w-screen-2xl mx-auto  justify-center items-center">
        <Slider1 />
      </div>
     
      {/* <Banner3 /> */}
     
        <div className="max-w-screen-4xl mx-auto  justify-center items-center">
            <Banner4 />
            </div>
            <div className="max-w-screen-4xl mx-auto  justify-center items-center">

            <Banner5 />
            </div>
      {/* <Slider2 /> */}
      <div className="max-w-screen-2xl mx-auto  justify-center items-center">
        <Slider3 />
      </div>
      <NavigationBar />
    </div>
  );
};

export default Homepage;
