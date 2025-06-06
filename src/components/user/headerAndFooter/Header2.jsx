import React, { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import useToast from "../../../hooks/useToast";
import SearchTab from "../headerAndFooter/SerachTab";

const Header2 = () => {
    const { categories } = useCategories();
    const [isHovered0, setIsHovered0] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [showSearchTab, setShowSearchTab] = useState(false);
    const { warningToast } = useToast();
    const handleClickCart = () => {
        const isLoggedIn = Boolean(localStorage.getItem("user")); // hoặc từ context

        if (!isLoggedIn) {
            warningToast("Vui lòng đăng nhập để xem giỏ hàng!");
            return;
        }

        navigate("/cart");
    }
    const handleClickWishlist = () => {
        const isLoggedIn = Boolean(localStorage.getItem("user")); // hoặc từ context

        if (!isLoggedIn) {
            warningToast("Vui lòng đăng nhập để xem Wishlist!");
            return;
        }

        navigate("/wishlist");
    }
    const navigate = useNavigate();

    return (
        <div>
            <div className="bg-white hidden sm:block">
                {showSearchTab && <SearchTab onClose={() => setShowSearchTab(false)} />}

                <div className="container h-14  mx-auto px-10 max-w-screen-2xl flex justify-between items-center  bg-white  ">
                    <Link to={'/'}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width="80px"
                            height="80px"
                        >
                            <path
                                fill="currentColor"
                                d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                                style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                            />
                        </svg>
                    </Link>
                    <div className="px-2"></div>

                    <div className="">
                        <ul className="flex   h-14 items-center inter">


                            <li

                                onMouseEnter={() => setIsHovered0(true)}
                                onMouseLeave={() => setIsHovered0(false)}
                                className="relative group px-2 h-full   flex items-center cursor-pointer text-[16px]
             "
                            >
                                New & Featured
                            </li>

                            <li
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                                className="relative px-2 group h-full   flex items-center cursor-pointer text-[16px]
             "
                            >
                                Men
                            </li>
                            <li
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                                className="relative px-2 group h-full   flex items-center cursor-pointer text-[16px]
             "
                            >
                                Women
                            </li>
                            <li
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                                className="relative px-2 group h-full  flex items-center cursor-pointer text-[16px]
             "
                            >
                                Kids
                            </li>
                            <li
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}
                                className="relative px-2 group h-full  flex items-center cursor-pointer text-[16px]
             "
                            >
                                Sale
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-3">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                            className="  block sm:hidden text-black"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                            ></path>
                        </svg>
                        <div className="relative w-full max-w-45 hidden sm:block">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 24 24"
                                role="img"
                                width="24px"
                                height="24px"
                                fill="none"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                                ></path>
                            </svg>
                            <input
                                type="text"
                                onFocus={() => setShowSearchTab(true)}
                                onBlur={() => setTimeout(() => setShowSearchTab(true))}
                                className="w-full hover:bg-[#E5E5E5] bg-gray-100 rounded-full pl-10 h-9.5  pr-0 py-2 outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200"
                                placeholder="Search"
                            />
                        </div>

                        <div className="cursor-pointer " onClick={() => handleClickWishlist()}>
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
                                    strokeWidth="1.5"
                                    d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"
                                ></path>
                            </svg>
                        </div>
                        <div className="cursor-pointer">
                            <div className="relative  " onClick={() => handleClickCart()} >
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
                                        strokeWidth="1.5"
                                        d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
                                    ></path>
                                </svg>
                                <p className="absolute top-3.5 text-[9px] text-xs left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    {useCart().cart.length}
                                </p>
                            </div>
                        </div>



                    </div>
                </div>

                <div className="relative z-50">
                    {/* Overlay xám bắt đầu từ dưới li */}
                    {isHovered0 && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
                    )}

                    {/* Dropdown */}
                    <div
                        onMouseEnter={() => setIsHovered0(true)}
                        onMouseLeave={() => setIsHovered0(false)}
                        className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${isHovered0
                            ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
                            : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
                            }`}
                    >
                        <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
                            <div className="grid grid-cols-4 gap-4 mt-4 mb-10">
                                {categories
                                    .filter(
                                        (cat) =>
                                            (cat.parentId === null || cat.parentId === "") &&
                                            cat.page === "New & Featured"
                                    )
                                    .map((parent) => (
                                        <div key={parent.id}
                                        >
                                            <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                                                {parent.name}
                                            </p>
                                            <ul className="text-[12px] inter text-gray-500 space-y-3">
                                                {categories
                                                    .filter((child) => child.parentId === parent.id)
                                                    .map((child) => (
                                                        <li
                                                            key={child.id}
                                                            onClick={() => navigate(`/category/${encodeURIComponent(child.name)}`)}
                                                            className="cursor-pointer hover:text-black"
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-50">
                    {/* Overlay xám bắt đầu từ dưới li */}
                    {isHovered1 && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
                    )}

                    {/* Dropdown */}
                    <div
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                        className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${isHovered1
                            ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
                            : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
                            }`}
                    >
                        <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
                            <div className="grid grid-cols-5 gap-4 mt-4 mb-10">
                                {categories
                                    .filter(
                                        (cat) =>
                                            (cat.parentId === null || cat.parentId === "") &&
                                            cat.page === "Men"
                                    )
                                    .map((parent) => (
                                        <div key={parent.id}>
                                            <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                                                {parent.name}
                                            </p>
                                            <ul className="text-[12px] inter text-gray-500 space-y-3">
                                                {categories
                                                    .filter((child) => child.parentId === parent.id)
                                                    .map((child) => (
                                                        <li
                                                            key={child.id}
                                                            className="cursor-pointer hover:text-black"
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-50">
                    {/* Overlay xám bắt đầu từ dưới li */}
                    {isHovered2 && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
                    )}

                    {/* Dropdown */}
                    <div
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                        className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${isHovered2
                            ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
                            : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
                            }`}
                    >
                        <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
                            <div className="grid grid-cols-4 gap-4 mt-4 mb-10">
                                {categories
                                    .filter(
                                        (cat) =>
                                            (cat.parentId === null || cat.parentId === "") &&
                                            cat.page === "Women"
                                    )
                                    .map((parent) => (
                                        <div key={parent.id}>
                                            <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                                                {parent.name}
                                            </p>
                                            <ul className="text-[12px] inter text-gray-500 space-y-3">
                                                {categories
                                                    .filter((child) => child.parentId === parent.id)
                                                    .map((child) => (
                                                        <li
                                                            key={child.id}
                                                            className="cursor-pointer hover:text-black"
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-50">
                    {/* Overlay xám bắt đầu từ dưới li */}
                    {isHovered3 && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
                    )}

                    {/* Dropdown */}
                    <div
                        onMouseEnter={() => setIsHovered3(true)}
                        onMouseLeave={() => setIsHovered3(false)}
                        className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${isHovered3
                            ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
                            : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
                            }`}
                    >
                        <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
                            <div className="grid grid-cols-4 gap-4 mt-4 mb-10">
                                {categories
                                    .filter(
                                        (cat) =>
                                            (cat.parentId === null || cat.parentId === "") &&
                                            cat.page === "Kids"
                                    )
                                    .map((parent) => (
                                        <div key={parent.id}>
                                            <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                                                {parent.name}
                                            </p>
                                            <ul className="text-[12px] inter text-gray-500 space-y-3">
                                                {categories
                                                    .filter((child) => child.parentId === parent.id)
                                                    .map((child) => (
                                                        <li
                                                            key={child.id}
                                                            className="cursor-pointer hover:text-black"
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-50">
                    {/* Overlay xám bắt đầu từ dưới li */}
                    {isHovered4 && (
                        <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
                    )}

                    {/* Dropdown */}
                    <div
                        onMouseEnter={() => setIsHovered4(true)}
                        onMouseLeave={() => setIsHovered4(false)}
                        className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${isHovered4
                            ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
                            : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
                            }`}
                    >
                        <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
                            <div className="grid grid-cols-4 gap-4 mt-4 mb-10">
                                {categories
                                    .filter(
                                        (cat) =>
                                            (cat.parentId === null || cat.parentId === "") &&
                                            cat.page === "Sale"
                                    )
                                    .map((parent) => (
                                        <div key={parent.id}>
                                            <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                                                {parent.name}
                                            </p>
                                            <ul className="text-[12px] inter text-gray-500 space-y-3">
                                                {categories
                                                    .filter((child) => child.parentId === parent.id)
                                                    .map((child) => (
                                                        <li
                                                            key={child.id}
                                                            className="cursor-pointer hover:text-black"
                                                        >
                                                            {child.name}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white block sm:hidden">
               <div className="flex items-center justify-between h-14 mx-auto px-6">
               <Link to={'/'}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        width="80px"
                        height="80px"
                    >
                        <path
                            fill="currentColor"
                            d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                            style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                        />
                    </svg>
                </Link>
                <div>
                    <div className="flex items-center gap-4 ">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                            className="  block sm:hidden text-black"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                            ></path>
                        </svg>
                        <div className="relative w-full max-w-45 hidden sm:block">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 24 24"
                                role="img"
                                width="24px"
                                height="24px"
                                fill="none"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                                ></path>
                            </svg>
                            <input
                                type="text"
                                onFocus={() => setShowSearchTab(true)}
                                onBlur={() => setTimeout(() => setShowSearchTab(true))}
                                className="w-full hover:bg-[#E5E5E5] bg-gray-100 rounded-full pl-10 h-9.5  pr-0 py-2 outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200"
                                placeholder="Search"
                            />
                        </div>

                        <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M3.75 21v-3a3.75 3.75 0 013.75-3.75h9A3.75 3.75 0 0120.25 18v3M12 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z"></path></svg>
                        <div className="cursor-pointer">
                            <div className="relative  " onClick={() => handleClickCart()} >
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
                                        strokeWidth="1.5"
                                        d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
                                    ></path>
                                </svg>
                                <p className="absolute top-3.5 text-[9px] text-xs left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    {useCart().cart.length}
                                </p>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <svg

                                className=""
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
                                    strokeWidth="1.5"
                                    d="M21 5.25H3M21 12H3m18 6.75H3"
                                ></path>
                            </svg>
                        </div>



                    </div>
                </div>
               </div>

            </div>
        </div>
    );
};

export default Header2;
