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
       <div>
         <div className="max-w-screen-2xl px-10 mx-auto">
                    <p className="text-2xl mt-8 mb-4">Complete the look</p>
                </div>
        <div className="max-w-screen-2xl px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           
            {combos.map((combo, idx) => {
                const mapped = combo.map((item) => ({
                    ...item,
                    type: normalize(item.productId),
                }));

                return (
              
                        
                    <div className="" key={idx}>
                       
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
                                                        <div className="w-5 h-5 cursor-pointer rounded-full bg-white border-4 border-gray-300 absolute top-7 left-2/4 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                                                        {/* Tooltip with Link */}
                                                        <div className="absolute top-12 left-2/4 -translate-x-1/2 bg-white text-black text-xs px-0 py-3 rounded shadow opacity-0 group-hover/tooltip:opacity-100 transition duration-300 whitespace-nowrap z-0 flex items-center gap-0">
  {/* Link with product info */}
  <Link
  to={`/details/${encodeURIComponent(item.name)}?id=${item.productId}`}
  className="ml-2"
>
    <p className="">{item.name}</p>
    <p className="text-gray-400">{item.category}</p>
    <p>
      {item.price}
      <span className="underline">đ</span>
    </p>
  </Link>
    {/* SVG icon */}
    <svg className="cursor-pointer" fill="none" width="24" height="24" viewBox="0 0 24 24">
      <title>right-arrow icon</title>
      <path
        d="M8.87499 17.125C8.72499 16.975 8.64999 16.8 8.64999 16.6C8.64999 16.4 8.72499 16.225 8.87499 16.075L12.95 12L8.87499 7.925C8.72499 7.775 8.64999 7.6 8.64999 7.4C8.64999 7.2 8.72499 7.025 8.87499 6.875C9.02499 6.725 9.19999 6.65 9.39999 6.65C9.59999 6.65 9.77499 6.725 9.92499 6.875L14.425 11.375C14.5083 11.4583 14.571 11.554 14.613 11.662C14.6543 11.7707 14.675 11.8833 14.675 12C14.675 12.1167 14.6543 12.229 14.613 12.337C14.571 12.4457 14.5083 12.5417 14.425 12.625L9.92499 17.125C9.77499 17.275 9.59999 17.35 9.39999 17.35C9.19999 17.35 9.02499 17.275 8.87499 17.125Z"
        fill="#000000"
      />
    </svg>
</div>

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
       </div>
    );
};

export default ComboProduct;
