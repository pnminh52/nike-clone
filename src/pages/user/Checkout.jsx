import React, { useState, useEffect } from "react";
import { useCart } from "./../../hooks/useCart";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


const Checkout = () => {
 const API_URL = "https://nikejsonserver-2.onrender.com";
    const { cart, checkoutCart } = useCart();
    const [userInfo, setUserInfo] = useState(null);
    const [touched, setTouched] = useState(false);
    const {user}=useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const res = await fetch(`${API_URL}/users/${userId}`);
            const user = await res.json();
            setUserInfo(user);
        };

        fetchUser();
    }, []);

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0
    );
    const shippingFee = user?.shippingFeeByAddress || 0;
const finalPrice = total + shippingFee;


    const formatPrice = (price) => {
        return Number(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-xl">Giỏ hàng trống. Quay lại <Link to="/" className="underline text-blue-500">trang chủ</Link> để tiếp tục mua sắm.</p>
            </div>
        );
    }
    

    if (!userInfo) {
        return <div>Loading user information...</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto px-6 py-5">
            <div className="flex gap-4">
                <div className="w-[45%]">
                    <div className="p-4">
                        <p className="text-2xl py-6">Delivery</p>
                        <p>Enter your name and address:</p>

                        <div className="space-y-4 py-4">
                            <div className="relative w-full z-0 group">
                                <input
                                    type="text"
                                    onBlur={() => setTouched(true)}
                                    name="text"
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                    value={userInfo.firstname || ''}
                                    placeholder=""
                                    readOnly
                                />
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    First Name*
                                </label>
                            </div>
                            <div className="w-full z-0 relative group">
                                <input
                                    type="text"
                                    name="text"
                                    onBlur={() => setTouched(true)}
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                    value={userInfo.lastname || ''}
                                    placeholder="Last Name"
                                    readOnly
                                />
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    Last Name*
                                </label>
                            </div>

                            <div className="relative w-full z-0 group">
                                <input
                                    type="text"
                                    name="text"
                                    onBlur={() => setTouched(true)}
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                    value={userInfo.phone || ''}
                                    placeholder="Phone"
                                    readOnly
                                />
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    Phone Number*
                                </label>
                            </div>
                            <div className="z-0 relative w-full group">
                                <input
                                    type="text"
                                    name="text"
                                    onBlur={() => setTouched(true)}
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                    value={userInfo.email || ''}
                                    placeholder="Email"
                                    readOnly
                                />
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    Email*
                                </label>
                            </div>
                            <div className="relative w-full group z-0">
                                <select
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                >
                                    <option value={userInfo.address}>{userInfo.address}</option>
                                    {userInfo.extraAddresses?.map((addr, i) => (
                                        <option key={i} value={addr}>
                                            {addr}
                                        </option>
                                    ))}
                                </select>
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    Address*
                                </label>
                            </div>
                            <div className="z-0 relative froup w-full">
                                <input
                                    type="text"
                                    name="text"
                                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                                    value={userInfo.country || ''}
                                    placeholder="Country"
                                    readOnly
                                />
                                <label
                                    htmlFor="text"
                                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                                >
                                    Country*
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={() => checkoutCart()}
                            className="w-full mt-0 cursor-pointer bg-black text-white py-4 rounded-full hover:bg-gray-800 transition"
                        >
                            Place Order
                        </button>
                    </div>
                </div>

                <div className="w-[40%] p-4">
                    <p className="text-2xl py-6">Order Summary</p>
                    <div className="flex justify-between text-gray-400 mb-2">
                        <p className="flex gap-1 items-center">Subtotal</p>
                        <p>{formatPrice(total)} <span className="text-sm underline">đ</span></p>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <p>Delivery/Shipping</p>
                        <p>{formatPrice(user.shippingFeeByAddress)}</p>
                    </div>
                    <div className="py-4">
                        <p className="text-sm mb-1">You qualify for free shipping!</p>
                        <div className="h-1.5 w-full bg-[#007D48] rounded-full"></div>
                    </div>
                    <div className="flex justify-between py-4 border-t border-b border-gray-300 ">
                        <p>Total</p>
                        <p>{formatPrice(finalPrice)} <span className="text-sm underline">đ</span></p>
                    </div>
                    <div className="col-span-2 space-y-4 py-4">
  {cart.map((item, index) => {
    // Lấy ngày đặt đơn hàng
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    

    return (
     <div>
       <div className="  text-gray-400 inter mb-4 text-sm rounded-lg">
       {orderDate}
    </div>
      <div key={index} className="flex gap-2 relative">
      
        <img
          src={item.img}
          alt={item.name}
          className="w-50 h-50 object-cover cursor-pointer"
        />
        
        {/* Lớp phủ ngày đặt đơn hàng */}
       

        <div className="flex-1">
          <p>{item.name}</p>
          <p className="text-gray-400 text-sm">Qty {item.quantity ?? 1}</p>
          <p className="text-gray-400 text-sm">Size EU {item.size}</p>
          <p className="text-gray-400 text-sm">
            {formatPrice(item.price * (item.quantity ?? 1))} <span className="text-sm underline">đ</span>
          </p>
        </div>
      </div>
     </div>
    );
  })}
</div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
