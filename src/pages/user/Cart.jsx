import React, { useState } from "react";
import { useEffect } from "react";
import ProductSkeleton from "./../../components/user/etc/ProductSkeleton";
import { useAuth } from "../../hooks/useAuth";
import Bag from "./../../components/user/cart/Bag";
import { useCart } from "../../hooks/useCart";
import Summary from "../../components/user/cart/Summary";
import { Link } from "react-router-dom";
import MightAlsoLike from './../../components/user/cart/MightAlsoLike';
import useProducts from './../../hooks/useProducts';

const Cart = ({}) => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { cart } = useCart();
  const {products}=useProducts()



  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
  const shippingFee = user?.shippingFeeByAddress ?? 0;
  const finalPrice = total + shippingFee;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProductSkeleton />;
  }

  return (
    <div>
      <div className="">
        {cart.length === 0 ? (
          <div className="h-100 flex items-center justify-center">
            <div className="text-center">
              <p>Your cart is empty.</p>
             <Link to={"/category/New%20%26%20Upcoming%20Drops"}>
             <p className=" text-blue-600 underline">
                Start shopping now!
              </p></Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="max-w-screen-xl px-6 sm:px-30 mx-auto   ">
              <div className="flex flex-col lg:flex-row lg:gap-8">
                <div className="w-full lg:w-2/3">
                  <Bag />
                </div>
                <div className="w-full lg:w-1/3 lg:sticky lg:top-0 lg:z-10 lg:self-start">
                  <Summary
                    cart={cart}
                    finalPrice={finalPrice}
                    shippingFee={shippingFee}
                    user={user}
                    total={total}
                    formatPrice={formatPrice}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
                      <MightAlsoLike products={products} cart={cart} />

      </div>
    </div>
  );
};

export default Cart;
