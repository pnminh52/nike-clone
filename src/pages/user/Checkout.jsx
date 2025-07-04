import React, { useState, useEffect } from "react";
import { useCart } from "./../../hooks/useCart";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const API_URL = "http://localhost:3000";
  const { cart, checkoutCart } = useCart();
  const [userInfo, setUserInfo] = useState(null);
  const [touched, setTouched] = useState(false);
  const [openSummary, setOpenSummary] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const { discountAmount, selectedVoucher, finalPrice } = location.state || {};

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
  const calculatedFinalPrice = total + shippingFee;

  const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div className="hidden sm:block">
        <div className="max-w-screen-xl px-6 sm:px-30 mx-auto   ">
          <div className="flex flex-col lg:flex-row lg:gap-8">
            <div className="w-1/2 ">
              <h2 className="text-2xl py-5 ">Delivery</h2>

              <div className="space-y-4 ">
                <div className="relative w-full z-0 group">
                  <input
                    type="text"
                    onBlur={() => setTouched(true)}
                    name="text"
                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                    value={userInfo?.firstname || ""}
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
                    value={userInfo?.lastname || ""}
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
                    value={userInfo?.phone || ""}
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
                    value={userInfo?.email || ""}
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
                    <option value={userInfo?.district}>
                      {userInfo?.district}
                    </option>
                    {userInfo?.extraAddresses?.map((addr, i) => (
                      <option key={i} value={addr}>
                        {addr}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="text"
                    className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                  >
                    District, Ward, Street, House number*
                  </label>
                </div>
                <div className="z-0 relative froup w-full">
                  <input
                    type="text"
                    name="text"
                    className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                    value={userInfo?.country || ""}
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
            <div className="py-4">
            <button
                onClick={() => checkoutCart()}
                className="block cursor-pointer w-full inter text-lg rounded-full h-16 transition bg-black text-white hover:bg-gray-800 text-center leading-[4rem]"
              >
                Place Order
              </button>
            </div>
            </div>
            <div className="w-1/2 ">
              <h2 className="text-2xl  py-5">Summary</h2>
              <div className=" transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <p className="w-full">{orderDate}</p>
              <div className="col-span-2 space-y-4 py-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="aspect-square w-40 object-cover cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Quantity {item.quantity ?? 1}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">EU {item.size}</p>
                        <p className=" text-sm ">
                          <span className=" ">
                            {" "}
                            {formatPrice(item.price * (item.quantity ?? 1))}
                          </span>
                          <span className="text-sm">₫</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p className="flex gap-1 items-center">Subtotal</p>
                <p className=" ">
                  <span className=" "> {formatPrice(total)}</span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p>Delivery/Shipping</p>
                <p className=" ">
                  <span className=" ">
                    {" "}
                    {formatPrice(user?.shippingFeeByAddress)}
                  </span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 ">
                  <p>Discount</p>
                  <p>
                    -{formatPrice(discountAmount)}
                    <span className="text-sm underline">đ</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between py-4 mt-2 border-t border-b  border-gray-300">
              <p>Total</p>
              <div className="flex gap-2 items-center">
                <p className="text-gray-400 line-through ">
                  <span className=" "> {formatPrice(total)}</span>
                  <span className="text-sm">₫</span>
                </p>
                <p className=" ">
                  <span className=" "> {formatPrice(calculatedFinalPrice)}</span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block sm:hidden">
        <div
          onClick={() => setOpenSummary(!openSummary)}
          className={`${
            !openSummary && "border-b"
          } cursor-pointer flex justify-between px-6 items-center   py-5 border-gray-300`}
        >
          <h2 className="text-2xl ">Summary</h2>
          <div className="flex gap-2 items-center">
            <p className=" ">
              <span className="inter "> {formatPrice(calculatedFinalPrice)}</span>
              <span className="text-sm">₫</span>
            </p>
            ({cart?.length} items)
            <svg
              className={`w-5 h-5 cursor-pointer transform transition-transform ${
                openSummary ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {openSummary && (
          <div className="px-6 transition-all duration-300 ease-in-out">
            <div className="space-y-2">
              <p className="w-full">{orderDate}</p>
              <div className="col-span-2 space-y-4 py-4">
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="aspect-square w-40 object-cover cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="">{item.name}</p>
                      <p className="text-gray-400 text-sm">
                        Quantity {item.quantity ?? 1}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">EU {item.size}</p>
                        <p className=" text-sm ">
                          <span className=" ">
                            {" "}
                            {formatPrice(item.price * (item.quantity ?? 1))}
                          </span>
                          <span className="text-sm">₫</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p className="flex gap-1 items-center">Subtotal</p>
                <p className=" ">
                  <span className=" "> {formatPrice(total)}</span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
              <div className="flex justify-between text-gray-400 ">
                <p>Delivery/Shipping</p>
                <p className=" ">
                  <span className=" ">
                    {" "}
                    {formatPrice(user?.shippingFeeByAddress)}
                  </span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 ">
                  <p>Discount</p>
                  <p>
                    -{formatPrice(discountAmount)}
                    <span className="text-sm underline">đ</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between py-4 mt-2 border-t border-b  border-gray-300">
              <p>Total</p>
              <div className="flex gap-2 items-center">
                <p className="text-gray-400 line-through ">
                  <span className=" "> {formatPrice(total)}</span>
                  <span className="text-sm">₫</span>
                </p>
                <p className=" ">
                  <span className=" "> {formatPrice(calculatedFinalPrice)}</span>
                  <span className="text-sm">₫</span>
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="">
          <div className="px-6 py-6">
            <h2 className="text-2xl mb-4">Delivery</h2>
            <p>Enter your name and address:</p>

            <div className="space-y-4 py-4">
              <div className="relative w-full z-0 group">
                <input
                  type="text"
                  onBlur={() => setTouched(true)}
                  name="text"
                  className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                  value={userInfo?.firstname || ""}
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
                  value={userInfo?.lastname || ""}
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
                  value={userInfo?.phone || ""}
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
                  value={userInfo?.email || ""}
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
                  <option value={userInfo?.district}>{userInfo?.district}</option>
                  {userInfo?.extraAddresses?.map((addr, i) => (
                    <option key={i} value={addr}>
                      {addr}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="text"
                  className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3"
                >
                 District*
                </label>
              </div>
              <div className="z-0 relative froup w-full">
                <input
                  type="text"
                  name="text"
                  className={`block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
                  value={userInfo?.country || ""}
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
      </div>
    </div>
  );
};

export default Checkout;
