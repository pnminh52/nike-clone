import React from "react";
import Slider1 from "../../components/user/homepage/Slider1";
import Slider3 from "../../components/user/homepage/Slider3";
import Banner1 from "../../components/user/homepage/Banner1";
import ImageCol1 from "../../components/user/homepage/ImageCol1";
import ProductSkeleton from "./../../components/user/etc/ProductSkeleton";
import { useEffect } from "react";
import { useState } from "react";
import Banner2 from "./../../components/user/homepage/Banner2";

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
    <div className="max-w-screen-2xl mx-auto  justify-center items-center">
      <Banner1 />
      <Slider1 />
      <div className="mx-auto max-w-screen-2xl px-10 mt-10 mb-4">
        <Banner2 position="1" />
      </div>

      <ImageCol1 />
{/* 
      <div className="mx-auto max-w-screen-2xl px-10 mt-20 mb-4">
        <Banner2 position="2" />
      </div> */}
      <Slider3 />
    </div>
  );
};

export default Homepage;
