import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../hooks/useAuth";
import { useWish } from "../../hooks/useWish";
import { useSearchParams } from "react-router-dom";
import ProductSkeleton from './../../components/user/etc/ProductSkeleton';
import CommentSection from "../../components/user/productDetail/CommentSection";
import AddComment from "../../components/user/productDetail/AddComment";
import useComment from "../../hooks/useComment";
import ProductDetailsCard from "../../components/user/productDetail/ProductDetailsCard";
import MightAlsoLike from "../../components/user/productDetail/MightAlsoLike";
import CommentTab from "../../components/user/productDetail/CommentTab";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const ProductDetail = () => {
  const { addToCart } = useCart();
  const [showAll, setShowAll] = useState(false)
  const { name } = useParams();
  const { getProductsByName } = useProducts();
  const { user, setUser } = useAuth();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
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
  const { toggleWish, isInWishlist } = useWish();
  const [hasInitializedIndex, setHasInitializedIndex] = useState(false);
  const { comments, fetchComments, addComment } = useComment();
  const [showAddComment, setShowAddComment] = useState(false);
  const [showDetailsCard, setShowDetailsCard] = useState(false);
  const mediaList = [
    selectedProduct?.img,
    ...(selectedProduct?.additionalImages?.filter((img) => typeof img === 'string' && img.trim() !== '') || []),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (!products || products.length === 0 || hasInitializedIndex) return;

    if (id) {
      const indexById = products.findIndex((product) => product.id === id);
      if (indexById !== -1) {
        setSelectedIndex(indexById);
      }
    }

    setHasInitializedIndex(true); // Đảm bảo chỉ chạy một lần duy nhất
  }, [products, id, hasInitializedIndex]);

  useEffect(() => {
    if (selectedProduct) {
      const images = [selectedProduct.img, ...(selectedProduct.additionalImages || [])];
      setAllImages(images);
      setCurrentImageIndex(0);
      setMainImage(images[0]);
      setAttemptedAdd(false);
    }
  }, [selectedProduct]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!products || products.length === 0) return;
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [products]);

  const handleAddComment = async (commentData) => {
    if (!selectedProduct?.id) return;


    if (!user?.id) {
      window.alert("Bạn chưa đăng nhập!");
      return;
    }

    const userName =
      user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : 'Người dùng vô danh';

    const newComment = {
      userId: user.id, // Gán userId từ user đã đăng nhập
      userName,
      rating: commentData.rating,
      content: commentData.content,
      images: commentData.images,
      title: commentData.title,
      date: new Date().toISOString(),
      productId: selectedProduct.id, // Gắn productId
    };

    await addComment(selectedProduct.id, newComment); // Thực hiện thêm bình luận
    setShowAddComment(false); // Đóng popup sau khi thêm bình luận
  };

  const productId = selectedProduct?.id;

  useEffect(() => {
    if (productId) fetchComments(productId);
  }, [productId]);





  if (isLoading) {
    return (
      <ProductSkeleton />
    );
  }

  return (
    <div className="">
      <div className="hidden sm:block">
        <div className="mx-auto mt-6  flex max-w-screen-lg px-2 gap-4">

          <div className="w-2/3  h-auto">
            <div className="sticky top-0 bg-white z-10 flex gap-2  pt-4">
              <div className="relative h-[650px]">
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none z-10"></div>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none z-10"></div>

                <div className="flex flex-col gap-2 overflow-y-auto h-[650px] hide-scrollbar relative z-0">
                  {/* Ảnh chính (có thể hover lại để xem lại ảnh chính gốc) */}
                  <div
                    className="relative cursor-pointer"
                    onMouseEnter={() => setMainImage(selectedProduct.img)}
                  >
                    <img
                      src={selectedProduct?.img}
                      alt={selectedProduct?.name}
                      className="w-18 h-18 rounded-[4px] object-cover cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/15 rounded-[4px] hover:bg-black/30 duration-300 ease-in-out transition"></div>
                  </div>

                  {/* Ảnh phụ: hover để đổi ảnh chính */}
                  {selectedProduct?.additionalImages
                    ?.filter((img) => typeof img === 'string' && img.trim() !== '')
                    .map((img, idx) => {
                      const isVideo = img.split('?')[0].toLowerCase().endsWith('.mp4');
                      return (
                        <div
                          key={idx}
                          className="relative cursor-pointer"
                          onMouseEnter={() => setMainImage(img)}
                        >
                          {isVideo ? (
                            <div className="relative">
                              <video
                                src={img}
                                className="w-[72px] h-[72px] rounded-[4px] object-cover cursor-pointer hover:border-black transition"
                                muted
                                loop

                                playsInline
                                onError={(e) => {
                                  console.error('Video error:', e);
                                  e.target.style.display = 'none';
                                }}
                              />
                              <svg
                                className="absolute left-1 bottom-1"
                                aria-hidden="true"
                                focusable="false"
                                viewBox="0 0 24 24"
                                role="img"
                                width="24px"
                                height="24px"
                                fill="white"
                              >
                                <path
                                  fill="white"
                                  fillRule="evenodd"
                                  d="M19.314 11.35L6.367 3.877a.75.75 0 00-1.125.65v14.949a.75.75 0 001.125.649l12.947-7.474a.75.75 0 000-1.3z"
                                  clipRule="evenodd"
                                />
                                <path
                                  stroke="white"
                                  strokeWidth="1.5"
                                  d="M19.314 11.35L6.367 3.877a.75.75 0 00-1.125.65v14.949a.75.75 0 001.125.649l12.947-7.474a.75.75 0 000-1.3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          ) : (
                            <img
                              src={img}
                              alt={`additional-${idx}`}
                              className="w-[72px] h-[72px] rounded-[4px] object-cover cursor-pointer hover:border-black transition"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <div className="absolute inset-0 bg-black/15 rounded-[4px] hover:bg-black/30 duration-300 ease-in-out transition" />
                        </div>
                      );
                    })}



                </div>

              </div>

              <div className="relative">
                {mainImage && (
                  mainImage.endsWith(".mp4") ? (
                    <video
                      src={mainImage}
                      className="w-[485px] h-[650px] cursor-pointer rounded-xl object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={mainImage}
                      alt={selectedProduct?.name}
                      className="w-[485px] h-[650px] cursor-pointer rounded-xl object-cover"
                    />
                  )
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
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
                      clipRule="evenodd"
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

          <div className=" w-[50%] pl-2 mt-6">
            <div>
              <p className="text-xl leading-[1.5]">
                {selectedProduct.name}
              </p>
              <p className="text-gray-600 leading-tight">
                {selectedProduct.type} / {selectedProduct.stock} in stock
              </p>
            
            </div>


          

                <p className="mt-6" >
                <span className="inter text-sm sm:text-lg"> {formatPrice(selectedProduct.price)}</span>
                <span className="text-xs">₫</span>
                </p>
              
            {products.length === 1 && (
              <div className="h-10 bg-white"></div>
            )}
            {products.length > 1 && (
              <div className=" py-8">

                <div className="grid grid-cols-5 gap-2 ">
                  {products.map((product, idx) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setSelectedIndex(idx);  
                        localStorage.setItem(`selectedIndex-${name}`, idx);
                      }}
                      className={`cursor-pointer rounded relative group ${selectedIndex === idx
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
                      {(product.stock === 0 || (selectedSize && !product.sizes.includes(String(selectedSize)))) && product.status !== "Coming Soon" && (
                        <div className="absolute inset-0">
                          <svg
                            className="w-full h-full p-3 z-10 bg-gray-300/50 rounded-md"
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

                      {/* Tooltip thông báo */}
                      {(product.stock === 0 || product.status === "Coming Soon") && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full z-20 group-hover:opacity-100 opacity-0 transition">
                          <div className="bg-black whitespace-nowrap text-white inter inter px-2 py-2  rounded relative">
                            {product.stock === 0 ? "Sold Out" : "Coming Soon"}

                            {/* Tam giác hướng xuống */}
                            <div className="absolute left-1/2 -bottom-1.5 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-black" />
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            )}


            {selectedProduct.stock < 30 && selectedProduct.stock > 1 && (
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
            {selectedProduct.stock === 0 ? (
              <div className="w-full h-24 bg-gray-100 text-center grid place-content-center">
                <p className="inter text-lg">Sold Out:</p>
                <p className="inter text-lg">This colour is currently unavailable</p>
              </div>

            ) : selectedProduct.status === "Just In" ? (
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
                      className={`${attemptedAdd && !selectedSize ? "text-[#D30005]" : ""}`}
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"
                      ></path>
                      <path
                        stroke="currentColor"
                        strokeWidth="1.5"
                        d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"
                      ></path>
                    </svg>
                    <p className={`${attemptedAdd && !selectedSize ? "text-[#D30005]" : ""}`}>Size Guide</p>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-4 gap-2 py-4 inter ${attemptedAdd && !selectedSize ? "border-[#D30005] border rounded-lg" : ""
                    }`}
                >
                  {[
                    31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
                  ].map((size) => {
                    const isAvailable = selectedProduct.sizes.includes(String(size));
                    const isSelected = selectedSize === size;

                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 cursor-pointer flex items-center justify-center border rounded-md text-lg transition
  ${isSelected ? "ring-2 ring-black" : ""}
  ${isAvailable
                            ? "border-gray-400 hover:border-black hover:text-black"
                            : "border-gray-200 text-gray-400 opacity-50 line-through bg-gray-200 hover:border-black hover:text-black"
                          }`}
                      >
                         EU {size}
                       
                      </button>
                    );
                  })}
                </div>

                {attemptedAdd && !selectedSize && (
                  <p className="text-[#D30005] mt-2">Please select a size.</p>
                )}
              </div>
            ) : (
              <div>
                <p className="w-full bg-gray-100 text-center h-24 justify-center flex items-center inter text-lg">
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

            {selectedProduct.status === "Just In" && selectedProduct.stock > 0 && (
              <div className="space-y-3 mt-2.5">
                <button
                  onClick={() => {
                    setAttemptedAdd(true);
                    if (!user) {
                      toast.warning("🛑 Vui lòng đăng nhập để thêm vào giỏ hàng!");
                      return;
                    }

                    if (!selectedSize || !selectedProduct.sizes.includes(String(selectedSize))) {
                      return; 
                    }


                    addToCart(selectedProduct, selectedSize);
                  }}
                  disabled={selectedProduct.stock === 0}
                  className={`w-full inter text-lg rounded-full h-16 transition 
${(selectedSize && !selectedProduct.sizes.includes(String(selectedSize)))
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                      : "bg-black text-white hover:bg-gray-800 cursor-pointer"} // Khi size hợp lệ và có trong biến thể của sản phẩm
`}
                >
                  Add to Bag
                </button>


                <button onClick={() => toggleWish(selectedProduct)} className="w-full border-gray-300 hover:border-black ease-in-out duration-300 border flex items-center gap-1 justify-center inter text-lg rounded-full bg-white text-black hover:cursor-pointer h-16 hover:text-gray-800 transition">
                  <span>Favourite</span>
                  {isInWishlist(selectedProduct.id) ? (
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
            )}

            <div className="py-8 px-16">
              <p className="inter text-center text-gray-400">
                This product is excluded from site promotions and discounts.
              </p>
            </div>
            <div className="">
              <p className="text-black inter ">{selectedProduct.des}</p>
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
                <li className="text-[17px]">
                  • Country/Region of Origin:{" "}
                  {(Array.isArray(selectedProduct.country)
                    ? selectedProduct.country
                    : [selectedProduct.country]
                  )
                    .filter(Boolean)
                    .join(", ")}
                </li>

              </ul>
            </div>
            <button onClick={() => setShowDetailsCard(!showDetailsCard)} className="inter border-gray-300 hover:border-black transition ease-in-out duration-300 inline-block px-4 py-2.5 border rounded-full  cursor-pointer text-lg ">
              View Product Details
            </button>
            {
              showDetailsCard && (
                <ProductDetailsCard
                  onClose={() => setShowDetailsCard(false)}
                  selectedProduct={selectedProduct}

                />
              )
            }
            <div className="border-b border-gray-300 py-8">
              <button
                onClick={() => setopen0(!open0)}
                className="flex items-center inter cursor-pointer justify-between w-full text-left  text-xl"
              >
                <span>Free Delivery and Returns</span>
                {open0 ? (
                  <svg
                    aria-hidden="true"
                    className="nds-summary-control rotate-180"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="nds-summary-control"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                )}
              </button>

              {open0 && (
                <div className="mt-6   space-y-2 ">
                  <p className="">
                    Your order of 5.000.000₫ or more gets free standard
                    delivery. Orders are processed and delivered Monday to Friday (excluding
                    public holidays)
                  </p>
                  <p className="text-sm mt-4">
                    Nike Members enjoy{" "}
                    <span className="underline text-blue-600 cursor-pointer">free returns.</span>
                  </p>
                </div>
              )}
            </div>
            <div className="border-b border-gray-300 py-8">
              <button
                onClick={() => setopen1(!open1)}
                className="flex items-center inter cursor-pointer justify-between w-full text-left text-xl"
              >
                <span>Reviews ({comments.length})</span>
                <div className="flex items-center gap-2">
                  <div className="gap-0 flex items-center">
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
                  <svg
                    aria-hidden="true"
                    className={`nds-summary-control transition-transform duration-200 ${open1 ? "rotate-180" : ""}`}
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    />
                  </svg>
                </div>
              </button>

              {open1 && (
                <div className="py-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setShowAddComment(true)} // ❗ chỉ mở popup khi bấm
                      className="text-black inter border-b-3 cursor-pointer "
                    >
                      Write a review
                    </button>
                    {comments.length > 5 && (
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-blue-600 underline hover:underline  cursor-pointer"
                      >
                       View all reviews ({comments.length})
                      </button>
                    )}
                  </div>
                  <CommentSection user={user} comments={comments} />
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
                        className="nds-summary-control rotate-180"
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
                          d="M18.966 8.476L12 15.443 5.033 8.476"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="nds-summary-control"
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
      </div>
      <div className="block sm:hidden">
      <div className="py-4 px-6">
          <p className="text-xl  leading-[1.5]">
            {selectedProduct.name}
          </p>
          <p className="text-gray-600 leading-tight">
                {selectedProduct.type} / {selectedProduct.stock} in stock
              </p>
          <div className=" mt-3 mb-0 ">

              <p >
              <span className="inter text-lg"> {formatPrice(selectedProduct.price)}</span>
              <span className="text-xs">₫</span>
              </p>
             
           
          </div>
        </div>
        <div className="relative">
      <Swiper
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        className="w-full h-[480px]"
      >
        {mediaList.map((media, idx) => {
          const isVideo = media?.toLowerCase().endsWith('.mp4');
          return (
            <SwiperSlide key={idx}>
              {isVideo ? (
                <video
                  src={media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[480px] object-cover"
                />
              ) : (
                <img
                  src={media}
                  alt={`media-${idx}`}
                  className="w-full h-[480px] object-cover"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <style jsx global>{`
    .swiper-pagination-bullet {
      background: black !important;
      opacity: 0.3;
    }

    .swiper-pagination-bullet-active {
      background: black !important;
      opacity: 1;
    }
  `}</style>
      <button className="z-20 absolute left-4 top-4 px-4 py-2 bg-white flex items-center rounded-full cursor-pointer gap-1">
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
            fillRule="evenodd"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M2.56 10.346l5.12 3.694-1.955 5.978c-.225.688.568 1.261 1.157.836L12 17.159l5.12 3.695c.587.425 1.381-.148 1.155-.836l-1.954-5.978 5.118-3.694c.589-.425.286-1.352-.442-1.352H14.67l-.166-.507-1.789-5.47c-.225-.69-1.205-.69-1.43 0L9.33 8.993H3.003c-.728 0-1.03.927-.442 1.352z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="text-xs inter">Highly Rated</span>
      </button>
    </div>
       <div className="py-2  overflow-x-auto ">
  {products.length > 1 && (
    <div className="flex gap-2 w-max">
      {products.map((product, idx) => (
        <div
          key={product.id}
          onClick={() => {
            setSelectedIndex(idx);
            localStorage.setItem(`selectedIndex-${name}`, idx);
          }}
          className={`flex-shrink-0 cursor-pointer rounded-md relative group ${
            selectedIndex === idx
              ? "ring-2 rounded-md transition duration-300 ease-in-out"
              : ""
          }`}
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-[100px] h-[100px] rounded-md object-cover"
          />

          {(product.stock === 0 ||
            (selectedSize && !product.sizes.includes(String(selectedSize)))) &&
            product.status !== "Coming Soon" && (
              <div className="absolute inset-0">
                <svg
                  className="w-full h-full p-3 z-10 bg-gray-300/50 rounded-md"
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
  )}
</div>

      
        <div className="px-6">
        {selectedProduct.stock < 30 && selectedProduct.stock > 1 && (
            <div className="flex items-center gap-1 mt-3">
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
          {selectedProduct.stock === 0 ? (
            <div className="w-full h-24 mt-3 bg-gray-100 text-center grid place-content-center">
              <p className="inter text-lg">Sold Out:</p>
              <p className="inter text-lg">This colour is currently unavailable</p>
            </div>
        
          ) : selectedProduct.status === "Just In" ? (
            <div className="mt-3">
              <div className="flex justify-between inter ">
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
                    className={`${attemptedAdd && !selectedSize ? "text-[#D30005]" : ""}`}
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M21.75 10.5v6.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V10.5m3.308-2.25h12.885"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M15.79 5.599l2.652 2.65-2.652 2.653M8.21 5.599l-2.652 2.65 2.652 2.653M17.25 19v-2.5M12 19v-2.5M6.75 19v-2.5"
                    ></path>
                  </svg>
                  <p className={`${attemptedAdd && !selectedSize ? "text-[#D30005]" : ""}`}>Size Guide</p>
                </div>
              </div>
        
              <div
                className={`grid grid-cols-3 gap-2 py-4 inter ${attemptedAdd && !selectedSize ? "border border-[#D30005] rounded-lg" : ""
                  }`}
              >
                {[
                  31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
                ].map((size) => {
                  const isAvailable = selectedProduct.sizes.includes(String(size));
                  const isSelected = selectedSize === size;
        
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 cursor-pointer flex items-center justify-center border rounded-md text-lg transition
          ${isSelected ? "ring-2 ring-black" : ""}
          ${isAvailable
                          ? "border-gray-400 hover:border-black hover:text-black"
                          : "border-gray-200 text-gray-400 opacity-50 line-through bg-gray-200 hover:border-black hover:text-black"
                        }`}
                    >
                     EU {size}
                      
                    </button>
                  );
                })}
              </div>
        
              {attemptedAdd && !selectedSize && (
                <p className="text-[#D30005] mt-2">Please select a size.</p>
              )}
            </div>
          ) : (
            <div className="mt-4 mb-2">
              <p className="w-full bg-gray-100 text-center h-24 justify-center flex items-center inter text-lg">
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
        
          {selectedProduct.status === "Just In" && selectedProduct.stock > 0 && (
            <div className="space-y-3 mt-2.5">
              <button
                onClick={() => {
                  setAttemptedAdd(true);
                  if (!user) {
                    toast.warning("🛑 Vui lòng đăng nhập để thêm vào giỏ hàng!");
                    return;
                  }
        
                  if (!selectedSize || !selectedProduct.sizes.includes(String(selectedSize))) {
                    return;  
                  }
                  addToCart(selectedProduct, selectedSize);
                }}
                disabled={selectedProduct.stock === 0}
                className={`w-full inter text-lg rounded-full h-16 transition 
        ${(selectedSize && !selectedProduct.sizes.includes(String(selectedSize)))
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"  
                    : "bg-black text-white hover:bg-gray-800 cursor-pointer"} // Khi size hợp lệ và có trong biến thể của sản phẩm
        `}
              >
                Add to Bag
              </button>
        
        
              <button onClick={() => toggleWish(selectedProduct)} className="w-full border-gray-300 hover:border-black ease-in-out duration-300 border flex items-center gap-1 justify-center inter text-lg rounded-full bg-white text-black hover:cursor-pointer h-16 hover:text-gray-800 transition">
                <span>Favourite</span>
                {isInWishlist(selectedProduct.id) ? (
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
          )}
        </div>

 <div className="py-8 px-16">
              <p className="inter text-center text-gray-400">
                This product is excluded from site promotions and discounts.
              </p>
            </div>

            <div className="px-6">
              <p className="text-black inter ">{selectedProduct.des}</p>
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
                <li className="text-[17px]">
                  • Country/Region of Origin:{" "}
                  {(Array.isArray(selectedProduct.country)
                    ? selectedProduct.country
                    : [selectedProduct.country]
                  )
                    .filter(Boolean)
                    .join(", ")}
                </li>

              </ul>
              <button onClick={() => setShowDetailsCard(!showDetailsCard)} className="inter border-gray-300 hover:border-black transition ease-in-out duration-300 inline-block px-4 py-2.5 border rounded-full  cursor-pointer text-lg ">
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
                    className="nds-summary-control rotate-180"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="nds-summary-control"
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    ></path>
                  </svg>
                )}
              </button>

              {open0 && (
                <div className="mt-6   space-y-2 ">
                  <p className="">
                    Your order of 5.000.000₫ or more gets free standard
                    delivery. Orders are processed and delivered Monday to Friday (excluding
                    public holidays)
                  </p>
                  <p className="text-sm mt-4">
                    Nike Members enjoy{" "}
                    <span className="underline text-blue-600 cursor-pointer">free returns.</span>
                  </p>
                </div>
              )}
            </div>
            <div className="border-b border-gray-300 py-8">
              <button
                onClick={() => setopen1(!open1)}
                className="flex items-center inter cursor-pointer justify-between w-full text-left text-xl"
              >
                <span>Reviews ({comments.length})</span>
                <div className="flex items-center gap-2">
                  <div className="gap-0 flex items-center">
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
                  <svg
                    aria-hidden="true"
                    className={`nds-summary-control transition-transform duration-200 ${open1 ? "rotate-180" : ""}`}
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
                      d="M18.966 8.476L12 15.443 5.033 8.476"
                    />
                  </svg>
                </div>
              </button>

              {open1 && (
                <div className="py-6">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setShowAddComment(true)} // ❗ chỉ mở popup khi bấm
                      className="text-black inter border-b-3 cursor-pointer "
                    >
                      Write a review
                    </button>
                    {comments.length > 5 && (
                      <button
                        onClick={() => setShowAll(true)}
                        className="text-blue-600 hover:underline underline cursor-pointer"
                      >
                      View all reviews ({comments.length})
                      </button>
                    )}
                  </div>
                  <CommentSection user={user} comments={comments} />
                </div>
              )}
            </div>
            </div>
           
            {
              showDetailsCard && (
                <ProductDetailsCard
                  onClose={() => setShowDetailsCard(false)}
                  selectedProduct={selectedProduct}

                />
              )
            }
           





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
                        className="nds-summary-control rotate-180"
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
                          d="M18.966 8.476L12 15.443 5.033 8.476"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        aria-hidden="true"
                        className="nds-summary-control"
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

      <MightAlsoLike currentProduct={selectedProduct} />
      {showAddComment && (
        <>

          <div >
            <AddComment
              productId={selectedProduct?.id}
              user={user}
              onClose={() => setShowAddComment(false)}
              onSubmit={handleAddComment}
              product={selectedProduct}
            />
          </div>
        </>
      )}
      {showAll && (
        <CommentTab
          user={user}
          comments={comments}
          onClose={() => setShowAll(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
