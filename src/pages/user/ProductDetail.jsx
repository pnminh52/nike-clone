import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { name } = useParams();
  const { getProductsByName } = useProducts();
  const user = useAuth();

  const products = getProductsByName(name);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProduct = products?.[selectedIndex] ?? null;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [open0, setopen0] = useState(false);
  const [open1, setopen1] = useState(false);
  const [open2, setopen2] = useState(false);
  const [attemptedAdd, setAttemptedAdd] = useState(false);


  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (selectedProduct) {
      const images = [
        selectedProduct.img,
        ...(selectedProduct.additionalImages || []),
      ];
      setAllImages(images);
      setCurrentImageIndex(0);
      setMainImage(images[0]);
      setAttemptedAdd(false)
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return <div className="text-center p-4">Loading product...</div>;
  }

  return (
    <div className="h-3000">
      <div className="mx-auto mt-6 mb-6 flex max-w-screen-lg px-2 gap-4">
        
          <div className="w-2/3 h-400">
            <div className="sticky top-0 bg-white z-10 flex gap-2  pt-4">
              <div className="relative h-[650px]">
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10"></div>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10"></div>

                <div className="flex flex-col gap-2 overflow-y-auto h-[650px] hide-scrollbar relative z-0">
                  <img
                    src={selectedProduct.img}
                    alt={selectedProduct.name}
                    onClick={() => setMainImage(selectedProduct.img)}
                    className={`w-18 h-18 rounded-[4px] object-cover cursor-pointer ${
                      mainImage === selectedProduct.img ? "" : ""
                    }`}
                  />
                  {selectedProduct.additionalImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative cursor-pointer"
                      onClick={() => setMainImage(img)}
                    >
                      <img
                        src={img}
                        alt="additional"
                        className="w-18 h-18 rounded-[4px] object-cover cursor-pointer hover:border-black transition"
                      />
                      <div className="absolute inset-0 bg-black/15 rounded-[4px] hover:bg-black/30 duration-300 ease-in-out transition"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt={selectedProduct.name}
                    className="w-[485px] relative h-full object-cover cursor-pointer rounded-xl"
                  />
                )}

                <button className="absolute left-4 top-4 px-4 py-2 bg-white flex items-center rounded-full cursor-pointer gap-1">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="20px"
                    height="20px"
                    fill="none"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      stroke="currentColor"
                      stroke-width="1.5"
                      d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-xs inter "> Highly Rated</span>
                </button>

                <div className="absolute bottom-4 right-4 gap-2 flex items-center ">
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => {
                        const newIndex =
                          prev > 0 ? prev - 1 : allImages.length - 1;
                        setMainImage(allImages[newIndex]);
                        return newIndex;
                      })
                    }
                    className="bg-white p-2 rounded-full cursor-pointer"
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
                        strokeWidth="1.5"
                        d="M15.525 18.966L8.558 12l6.967-6.967"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => {
                        const newIndex =
                          prev < allImages.length - 1 ? prev + 1 : 0;
                        setMainImage(allImages[newIndex]);
                        return newIndex;
                      })
                    }
                    className="bg-white p-2 rounded-full cursor-pointer rotate-180"
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
                        strokeWidth="1.5"
                        d="M15.525 18.966L8.558 12l6.967-6.967"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%] pl-2 mt-6">
            <div>
              <p className="text-2xl inter leading-[1]">
                {selectedProduct.name}
              </p>
              <p className="text-gray-600 leading-tight">
                {selectedProduct.gender}'s Shoes
              </p>
            </div>
            <div className="mt-2">
              <p className="text-black ">
                <span className="inter text-lg">
                  {" "}
                  {formatPrice(selectedProduct.price_sale)}{" "}
                </span>
                <span className="text-sm font-medium">₫</span>
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2 py-8">
              {products.map((product, idx) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setSelectedSize(null);
                  }}
                  className={`cursor-pointer rounded relative ${
                    selectedIndex === idx
                      ? "ring-2 rounded-md transition duration-300 ease-in-out"
                      : ""
                  }`}
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  {/* SVG gạch chéo nếu hết hàng */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0">
                      <svg
                        className="w-full h-full p-3 z-20 bg-gray-300/30 rounded-md"
                        viewBox="0 0 125 125"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="125"
                          y1="125"
                          x2="0"
                          y2="0"
                          stroke="white"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedProduct.stock < 100 && selectedProduct.stock > 1 && (
              <div className="flex gap-1 mb-6">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  role="img"
                  width="24px"
                  height="24px"
                  fill="none"
                  color="var(--podium-cds-color-text-badge)"
                >
                  <path
                    fill="#D64627"
                    d="M15.712 8.72l-4.242 4.243 1.06 1.06 4.243-4.243-1.061-1.06zm-3.181 5.303l4.242-4.243-1.061-1.06-4.242 4.243 1.06 1.06zM7.5 3h9V1.5h-9V3zm9-1.5h-9V3h9V1.5zm3 12A7.5 7.5 0 0112 21v1.5a9 9 0 009-9h-1.5zM12 21a7.5 7.5 0 01-7.5-7.5H3a9 9 0 009 9V21zm-7.5-7.5A7.5 7.5 0 0112 6V4.5a9 9 0 00-9 9h1.5zM12 6a7.5 7.5 0 017.5 7.5H21a9 9 0 00-9-9V6z"
                  ></path>
                </svg>
                <p className="text-[#D64627] inter">
                  Just a few left. Order soon.
                </p>
              </div>
            )}

            {selectedProduct.status === "Just In" ? (
              <div>
                <div className="flex justify-between inter">
                <p className={`${attemptedAdd && !selectedSize ? "text-[#D30005]" : ""}`}>
  Select Size
</p>

                  <div className="flex gap-2 items-center">
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
                        d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"
                      ></path>
                      <path
                        stroke="currentColor"
                        stroke-width="1.5"
                        d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"
                      ></path>
                    </svg>
                    <p>Size Guide</p>
                  </div>
                </div>
                <div className={`grid grid-cols-4 gap-2 py-4 inter  ${attemptedAdd&&!selectedSize&&("border-[#D30005] border rounded-lg")}`}>
                  {[31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41].map((size) => {
                    const isAvailable = selectedProduct.sizes.includes(
                      String(size)
                    );
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => isAvailable && setSelectedSize(size)}
                        className={`px-4 py-3 cursor-pointer flex items-center justify-center border rounded-md text-lg transition
        ${isSelected ? "ring-2 ring-black" : ""}
        ${
          isAvailable
            ? "border-gray-400 hover:border-black hover:text-black"
            : "border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
        }
          
          ${!isAvailable ? "line-through bg-gray-200 border-gray-400" : ""}`}
                      >
                        EU {size}
                      </button>
                    );
                  })}
                </div>
                {attemptedAdd && !selectedSize &&(
                <p className="text-[#D30005] mt-4">Please select a size.</p>

                )}
              </div>
            ) : (
              <div>
                <p className="w-full bg-gray-100 text-center py-10 inter text-lg ">
                  Coming Soon
                </p>
              </div>
            )}

            {selectedProduct.status === "Coming Soon" && (
              <div className="space-y-3 mt-4">
                <button
                  className="w-full inter text-lg rounded-full h-16 transition 
   bg-black text-white hover:bg-gray-800 cursor-pointer
              "
                >
                  Notify Me
                </button>
              </div>
            )}

            {selectedProduct.status === "Just In" && (
              <div className="space-y-3 mt-4">
                <button
                  onClick={() => {
                    setAttemptedAdd(true);
                    if (!user) {
                      toast.warning(
                        "🛑 Vui lòng đăng nhập để thêm vào giỏ hàng!"
                      );
                      return;
                    }

                    if (!selectedSize) {
                      return;
                    }

                    // 👉 Nếu tới được đây thì cả user và size đều đã hợp lệ
                    addToCart(selectedProduct, selectedSize);
                  }}
                  disabled={selectedProduct.stock === 0}
                  className={`w-full inter text-lg rounded-full h-16 transition 
    ${
      selectedProduct.stock === 0
        ? "bg-[#E5E5E5] text-gray-400 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-800 cursor-pointer"
    }`}
                >
                  Add to Bag
                </button>

                <button className="w-full border-gray-300 hover:border-black ease-in-out duration-300 border flex items-center gap-1 justify-center inter text-lg rounded-full bg-white text-black hover:cursor-pointer h-16 hover:text-gray-800 transition">
                  <span>Favourite</span>
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
                    <title>non-filled</title>
                  </svg>
                </button>
              </div>
            )}

            <div className="py-8 px-16">
              <p className="inter text-center text-gray-400">
                This product is excluded from site promotions and discounts.
              </p>
            </div>
            <div className="">
              <p className="text-black inter text-lg">{selectedProduct.des}</p>
              <ul className="px-3 py-4">
                <li className=" text-[17px]">
                  • Colour Shown:{" "}
                  {Array.isArray(selectedProduct.color)
                    ? selectedProduct.color.join("/")
                    : selectedProduct.color?.split(",").join("/")}
                </li>

                <li className=" text-[17px]">
                  • Style: {selectedProduct.style}
                </li>
                <li className=" text-[17px]">
                  • Country/Region of Origin: {selectedProduct.country}
                </li>
              </ul>
            </div>
            <button className="inter border-gray-300 hover:border-black transition ease-in-out duration-300 inline-block px-4 py-2.5 border rounded-full  cursor-pointer text-lg ">
              View Product Details
            </button>
            <div className="border-b border-gray-300 py-8">
              <button
                onClick={() => setopen0(!open0)}
                className="flex items-center inter cursor-pointer justify-between w-full text-left  text-xl"
              >
                <span>Free Delivery and Returns</span>
                {open0 ? (
                  <svg
                    aria-hidden="true"
                    class="nds-summary-control rotate-180"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    class="nds-summary-control"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                )}
              </button>

              {open0 && (
                <div className="mt-6   space-y-2 inter">
                  <p className=" text-lg">
                    Your order of 5.000.000₫ or more gets free standard
                    delivery.
                  </p>
                  <div className="py-6">
                    <p className="text-lg">
                      • Standard delivered 4–5 Business Days
                    </p>
                    <p className="text-lg">
                      • Express delivered 2–4 Business Days
                    </p>
                  </div>
                  <p className="text-lg">
                    Orders are processed and delivered Monday–Friday (excluding
                    public holidays)
                  </p>
                  <p className="text-lg mt-4">
                    Nike Members enjoy{" "}
                    <span className="underline">free returns.</span>
                  </p>
                </div>
              )}
            </div>
            <div className="border-b border-gray-300 py-8">
              <button
                onClick={() => setopen1(!open1)}
                className="flex items-center inter cursor-pointer justify-between w-full text-left  text-xl"
              >
                <span>Reviews (31)</span>
                <div className="flex items-center gap-2">
                  <div className="gap-0 flex items-center ">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5"
                        aria-hidden="true"
                        focusable="false"
                        viewBox="0 0 24 24"
                        role="img"
                        fill="none"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  {open1 ? (
                    <svg
                      aria-hidden="true"
                      class="nds-summary-control rotate-180"
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
                        d="M18.966 8.476L12 15.443 5.033 8.476"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      class="nds-summary-control"
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
                        d="M18.966 8.476L12 15.443 5.033 8.476"
                      ></path>
                    </svg>
                  )}
                </div>
              </button>

              {open1 && (
                <div className="mt-6   space-y-2 inter">
                  <p>Comment section in here</p>
                </div>
              )}
            </div>
            {selectedProduct.status === "Coming Soon" && (
              <div className="border-b border-gray-300 py-8">
                <button
                  onClick={() => setopen2(!open2)}
                  className="flex items-center inter cursor-pointer justify-between w-full text-left  text-xl"
                >
                  <span>More Info</span>
                  <div className="flex items-center gap-2">
                    {open2 ? (
                      <svg
                        aria-hidden="true"
                        class="nds-summary-control rotate-180"
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
                          d="M18.966 8.476L12 15.443 5.033 8.476"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        class="nds-summary-control"
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
                          d="M18.966 8.476L12 15.443 5.033 8.476"
                        ></path>
                      </svg>
                    )}
                  </div>
                </button>

                {open2 && (
                  <div className="mt-6   space-y-2 inter">
                    <p>Available 09/04 at 09:00</p>
                  </div>
                )}
              </div>
            )}
          </div>
       
        
      </div>
      <div className="mx-auto max-w-screen-2xl px-15">
          <div className="py-4">
            <p className="inter text-3xl">How Others Are Wearing It</p>
            <p className="mb-3 mt-1">Upload your photo or mention @Nike on Instagram for a chance to be featured.</p>
            <button className="px-4 py-2 border border-gray-300 rounded-full hover:border-black transition ease-in-out duration-300 cursor-pointer">Upload Your Photo </button>
          </div>
        </div>
    </div>
  );
};

export default ProductDetail;
