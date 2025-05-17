import React, { useState } from 'react'
import { useCart } from "../../../hooks/useCart";
import { useWish } from '../../../hooks/useWish';
import { Link } from 'react-router-dom';
const CartLeftSide = () => {
    const { addToWishlist, isInWishlist, removeFromWishlist } = useWish()
    const { cart, removeFromCart, updateQuantity } = useCart();
    const formatPrice = (price) => {
        return Number(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <div>
            <p className=" text-2xl py-5">Bag</p>

            <div className="space-y-4">
                {cart.map((item, index) => (
                    <div key={index} className="flex gap-4  rounded border-b border-gray-300 ">
                        <div>
                            <Link to={`/details/${item.name}`}>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-45 h-45 cursor-pointer object-cover "
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

                                <button
                                    onClick={() =>
                                        isInWishlist(item.id)
                                            ? removeFromWishlist(item.id)
                                            : addToWishlist(item)
                                    } className="w-11 h-11 border-gray-300 border flex items-center justify-center rounded-full cursor-pointer">
                                    {isInWishlist(item.id) ? (
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            role="img"
                                            width="24px"
                                            height="24px"
                                            fill="black" // fill đen
                                        >
                                            <path
                                                fill="black" // path này sẽ được đổ đen
                                                d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            viewBox="0 0 24 24"
                                            role="img"
                                            width="24px"
                                            height="24px"
                                            fill="white"
                                        >
                                            <path
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                                            />
                                            <path
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"
                                            />
                                        </svg>
                                    )}

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
                                {item.type}
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
            </div>
        </div>
    )
}

export default CartLeftSide
