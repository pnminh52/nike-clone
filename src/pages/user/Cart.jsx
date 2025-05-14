import React, {useState} from "react";
import { useCart } from "./../../hooks/useCart";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ProductSkeleton from './../../components/user/etc/ProductSkeleton';
import { useAuth } from "../../hooks/useAuth";
const Cart = ({ }) => {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(true);
    const {user}=useAuth()

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0
    );
    const formatPrice = (price) => {
        return Number(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
 const shippingFee = user?.shippingFeeByAddress ?? 0;
 const finalPrice = total + shippingFee;
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    
    if (loading) {
        return <ProductSkeleton />
    }

    return (
        <div className="">

            {cart.length === 0?(
                <p>Khong co gi het </p>
            ):(
                <div className="max-w-screen-xl px-14 mx-auto  gap-8  flex h-900 ">
                <div className="w-2/3 ">
                    <p className=" text-2xl py-6">Bag</p>

                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div key={index} className="flex gap-4  rounded border-b border-gray-300 ">
                                <div>
                                    <Link to={`/details/${item.name}`}>
                                        <img
                                            src={item.img}
                                            alt={item.name}
                                            className="w-45 h-45 cursor-pointer object-cover"
                                        /></Link>

                                    <div className="flex items-center gap-2 justify-between py-4 ">
                                        <div className="flex items-center ">
                                            {item.quantity > 1 && (
                                                <button
                                                    type="button" // 👈 CHẶN RELOAD
                                                    className="px-3 h-11 border-l border-gray-300 border-t border-b rounded-l-full cursor-pointer"
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.size,
                                                            (item.quantity ?? 1) - 1
                                                        )
                                                    }
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        viewBox="0 0 24 24"
                                                        role="img"
                                                        width="24px"
                                                        height="24px"
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-miterlimit="10"
                                                            stroke-width="1.5"
                                                            d="M18 12H6"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            )}
                                            {(item.quantity ?? 1) === 1 && (
                                                <button
                                                    type="button" // 👈 CHẶN RELOAD
                                                    className="px-3 h-11 border-l border-gray-300 border-t border-b rounded-l-full cursor-pointer"
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                // disabled={item.quantity <= 1}
                                                >
                                                    <svg
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        viewBox="0 0 24 24"
                                                        role="img"
                                                        width="24px"
                                                        height="24px"
                                                        fill="none"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-miterlimit="10"
                                                            stroke-width="1.5"
                                                            d="M13.75 10v7m-3.5-7v7m-3.5-8.5V17c0 1.24 1.01 2.25 2.25 2.25h6c1.24 0 2.25-1.01 2.25-2.25V7.75h2.25m-10-3h3.75c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H4.5"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            )}
                                            <p className="w-8 h-11 inter border-gray-300 border-t border-b text-center justify-center items-center flex">
                                                {item.quantity ?? 1}
                                            </p>

                                            <button
                                                type="button" // 👈 CHẶN RELOAD
                                                className={`px-3 h-11  border-r border-t border-b rounded-r-full border-gray-300 cursor-pointer`}
                                                onClick={() => {
                                                    if (item.quantity === 10) return;
                                                    updateQuantity(
                                                        item.id,
                                                        item.size,
                                                        (item.quantity ?? 1) + 1
                                                    );
                                                }}
                                            >
                                                <svg
                                                    className={` ${item.quantity === 10
                                                        ? "opacity-30 cursor-not-allowed"
                                                        : ""
                                                        }`}
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    viewBox="0 0 24 24"
                                                    role="img"
                                                    width="24px"
                                                    height="24px"
                                                    fill="none"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-miterlimit="10"
                                                        stroke-width="1.5"
                                                        d="M18 12H6m6 6V6"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <button className="w-11 h-11 border-gray-300 border flex items-center justify-center rounded-full cursor-pointer">
                                            <svg
                                                aria-hidden="true"
                                                focusable="false"
                                                viewBox="0 0 24 24"
                                                role="img"
                                                width="24px"
                                                height="24px"
                                                fill="none"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-width="1.5"
                                                    d="M15.566 5.75c.984 0 1.91.385 2.606 1.082a3.707 3.707 0 010 5.228L12 18.25l-6.172-6.19a3.707 3.707 0 010-5.227A3.656 3.656 0 018.434 5.75c.985 0 1.91.385 2.606 1.082l.565.567.395.396.394-.396.566-.567a3.658 3.658 0 012.606-1.082"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className=" w-full">
                                    <div className="flex justify-between items-center">
                                        <p className="inter text-lg">{item.name}</p>
                                        <p className="text-lg">
                                            <span className="inter">
                                                {formatPrice(item.price * (item.quantity ?? 1))}
                                            </span>
                                            <span className="text-sm underline">đ</span>
                                        </p>
                                    </div>
                                    <p className="text-[#707072] text-lg">
                                        {item.gender}'s Shoes
                                    </p>
                                    <p className="text-[#707072] text-lg">
                                        {" "}
                                        {Array.isArray(item.color)
                                            ? item.color.join("/")
                                            : item.color?.split(",").join("/")}
                                    </p>
                                    <p className="text-[#707072] text-lg">
                                        Size <span className="underline">{item.size}</span>
                                    </p>

                                    <div className="flex items-center mt-1 gap-2"></div>
                                </div>
                            </div>
                        ))}

                        {/* <div className="text-right mt-4">
                            <p className="text-lg font-bold">Tổng cộng: {total.toLocaleString()} đ</p>
                            <button type='button' onClick={clearCart} className="mt-2 bg-gray-700 text-white px-4 py-2 rounded">
                                Xóa tất cả
                            </button>
                        </div> */}
                    </div>

                </div>
                <div className="w-1/3">
                    <p className="text-2xl py-6">Summary</p>
                    <div className="mb-6 space-y-2">
                        <div className="flex justify-between items-center ">
                            <p className="inter text-lg">Subtotal</p>
                            <p className="inter">
                                <span className="inter text-lg">{formatPrice(total)}</span>
                                <span className="text-sm underline">đ</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="inter text-lg">Estimated Delivery & Handling</p>
                            <p className="inter text-lg">Free</p>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="inter text-lg">Shipping Fee</p>
                            <p className="inter text-lg">{formatPrice(user.shippingFeeByAddress)}  <span className="text-sm underline">đ</span></p>
                            
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-6 border-t border-b border-gray-300">
                        <p className="inter text-lg">Total</p>
                        <p>
                            <span className="inter">{formatPrice(finalPrice)}</span>
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                    <Link to={"/checkout"}>
                        <button
                            className="w-full mt-8 inter text-lg rounded-full h-16 transition 
   bg-black text-white hover:bg-gray-800 cursor-pointer
              "
                        >
                            Checkout
                        </button></Link>
                </div>
            </div>
            )

            }
           


        </div>
    );
};

export default Cart;
