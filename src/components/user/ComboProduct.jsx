import React from "react";
import { Link } from "react-router-dom";

const ComboProduct = ({ product }) => {
    if (!product) return null;

    const combos = [product.combo1, product.combo2, product.combo3].filter(Boolean);
    const layout = ["hoodie", "socks", "pants", "shoes", "bra"];

    const normalize = (id) => id.replace(/\d+$/, "").toLowerCase();

    const displayName = {
        hoodie: "Áo Hoodie",
        pants: "Quần",
        socks: "Vớ",
        bra: "Áo lót",
        shoes: "Giày",
    };

    // Get the name of the main product to compare
    const mainProductName = product.name.toLowerCase();

    return (
        <div className="mt-10 max-w-screen-2xl px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {combos.map((combo, idx) => {
                const mapped = combo.map((item) => ({
                    ...item,
                    type: normalize(item.productId),
                }));

                return (
                    <div className="" key={idx}>
                        <div>
                            <p className="text-2xl py-4">Complete the look</p>
                        </div>
                        <div className="bg-[#F1F1F1] p-4 h-[500px] group relative rounded-md">
                            <div className="gap-4">
                                {layout.map((type, index) => {
                                    const item = mapped.find((i) => i.type === type);

                                    // Class name adjustments for different types
                                    const pantsClass = type === "pants" ? " z-0 left-30 -top-35 relative w-40 " : "";
                                    const shoesClass = type === "shoes" ? "relative left-28 bottom-40 " : "";
                                    const hoodieClass = type === "hoodie" ? "relative top-4 left-4 z-1 w-45 " : "";
                                    const braClass = type === "bra" ? "relative -top-140 -right-60 w-30 h-30 " : "";
                                    const sockClass = type === "socks" ? "relative top-25 w-25 h-25 -right-5 " : "";

                                    // Compare the item name with the main product's name
                                    const isSameName = item && item.name.toLowerCase() === mainProductName;

                                    return (
                                        <div key={type} className={`relative ${sockClass} ${pantsClass} ${shoesClass} ${hoodieClass} ${braClass}`}>
                                            {item && (
                                              <>
                                                <img
                                                  src={item.image}
                                                  alt={type}
                                                  className={`object-cover mx-auto mb-2 
                                                      ${type === "pants" ? "w-[100px] h-auto" : type === "hoodie" ? "" : "w-[110px] h-auto"}`}
                                                />
                                                {/* Show dot only if product name doesn't match the main product */}
                                                {!isSameName && (
                                                    <div className="group/tooltip">
                                                        {/* White dot */}
                                                        <div className="w-5 h-5 cursor-pointer rounded-full bg-white border-4 border-gray-300 absolute top-7 left-3/4 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                                                        {/* Tooltip with Link */}
                                                        <Link
                                                            to={`/product/${item.productId}`}
                                                            className="absolute top-13 left-3/4 -translate-x-1/2 bg-white text-black text-xs px-4 py-3 rounded shadow opacity-0 group-hover/tooltip:opacity-100 transition duration-300 whitespace-nowrap z-50 "
                                                        >
                                                            {item.name}
                                                            <p className="text-gray-400">{item.category}</p>
                                                            <p>{item.price}<span className="underline">đ</span></p>
                                                        </Link>
                                                    </div>
                                                )}
                                              </>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <div className="relative group">
                                    {/* Eye icon */}
                                    <div className="bg-white w-8 h-8 cursor-pointer transition duration-300 ease-in-out flex items-center justify-center rounded-full">
                                        <svg
                                          fill="none"
                                          width="20"
                                          height="20"
                                          viewBox="0 0 24 24"
                                          className="stylitics-icon-size-s"
                                        >
                                            <title>eye icon</title>
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M21.6021 11.5664C21.7891 11.8284 21.7891 12.1714 21.6021 12.4334C20.5391 13.9234 16.7301 18.7504 12.0001 18.7504C7.26911 18.7504 3.46811 13.9224 2.40711 12.4324C2.22111 12.1704 2.22111 11.8294 2.40711 11.5674C3.46811 10.0774 7.26911 5.2504 12.0001 5.2504C16.7301 5.2504 20.5391 10.0764 21.6021 11.5664Z"
                                              strokeWidth="1.5"
                                              stroke="#000000"
                                            ></path>
                                            <circle cx="12" cy="12" r="4" stroke="#000000" fill="transparent"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ComboProduct;
