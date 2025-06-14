import React from "react";
import { Link } from "react-router-dom";

const Summary = ({ user, formatPrice, total, finalPrice }) => {
    return (
        <div>
            <div className="hidden sm:block">
                <p className="text-2xl py-5">Summary</p>
                <div className="mb-6 space-y-2">
                    <div className="flex  justify-between items-center ">
                        <p className="">Subtotal</p>
                        <p className="">
                            <span className="">{formatPrice(total)}</span>
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <p className="">Shipping Fee</p>
                        <p className="">
                            {formatPrice(user.shippingFeeByAddress)}{" "}
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-6 border-t border-b border-gray-300">
                    <p className="inter text-lg">Total</p>
                    <p>
                        <span className="inter">{formatPrice(finalPrice)}</span>
                        <span className="text-sm underline">đ</span>
                    </p>
                </div>
                <div className="space-y-2 mt-8">
                    <Link
                        to="/checkout"
                        className="block w-full inter text-lg rounded-full h-16 transition bg-black text-white hover:bg-gray-800 text-center leading-[4rem]"
                    >
                        Member Checkout
                    </Link>
                    <Link
                        to="/category/New%20%26%20Upcoming%20Drops"
                        className="block w-full inter text-lg rounded-full h-16 transition bg-white text-black border hover:border-gray-800 text-center leading-[4rem]"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
            <div className="block sm:hidden">
                <p className="text-2xl py-5">Summary</p>
                <div className="mb-6 space-y-2">
                    <div className="flex  justify-between items-center ">
                        <p className="">Subtotal</p>
                        <p className="">
                            <span className="">{formatPrice(total)}</span>
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <p className="">Shipping Fee</p>
                        <p className="">
                            {formatPrice(user.shippingFeeByAddress)}{" "}
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                </div>
                <div className="flex justify-between items-center py-6 border-t border-b border-gray-300">
                    <p className="inter text-lg">Total</p>
                    <p>
                        <span className="inter">{formatPrice(finalPrice)}</span>
                        <span className="text-sm underline">đ</span>
                    </p>
                </div>
                <div className="space-y-2 mt-8">
                    <Link
                        to="/checkout"
                        className="block w-full inter text-lg rounded-full h-16 transition bg-black text-white hover:bg-gray-800 text-center leading-[4rem]"
                    >
                        Member Checkout
                    </Link>
                    <Link
                        to="/category/New%20%26%20Upcoming%20Drops"
                        className="block w-full inter text-lg rounded-full h-16 transition bg-white text-black border hover:border-gray-800 text-center leading-[4rem]"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;
