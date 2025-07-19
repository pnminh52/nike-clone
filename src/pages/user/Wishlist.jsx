import React, { useState } from 'react';
import { useEffect } from 'react';
import { useWish } from '../../hooks/useWish';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import PopupSize from '../../components/user/wishlist/PopupSize';
import ProductSkeleton from '../../components/user/etc/ProductSkeleton';
import ResultNotfound from '../../components/user/etc/ResultNotfound';
const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWish(); 
  const { addToCart } = useCart(); 
  const [loading, setLoading] = useState(true)
  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const navigate=useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleAddToBagClick = (product) => {
    setSelectedProduct(product)
    setShowPopup(true)
  }

  const handleSelectSize = (size) => {
    if (selectedProduct) {
      addToCart(selectedProduct, size)
    }
    setShowPopup(false)
    setSelectedProduct(null)
  }
  useEffect(()=>{
    const timer = setTimeout(() => {
      setLoading(false)

    },3000)
return () => clearTimeout(timer)
  })
  if (loading) {
    return (    <ProductSkeleton />
    )
  }

  return (
    <div className=" max-w-screen-2xl mx-auto px-0 sm:px-10">
     

      {wishlist.length === 0 ? (
      <ResultNotfound />
      ) : (
       <div>
         <h2 className="text-2xl  px-6 sm:px-0 py-5">Favourites</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5 sm:gap-2">
          {wishlist.map((item) => (
            <div key={item.id}   className=" ">
         <div className='relative '>
         <img  onClick={() => navigate(`/details/${encodeURIComponent(item.name)}?id=${item.id}`)} src={item.img} alt={item.name} className="aspect-square  cursor-pointer object-cover" />
        <div className='hidden sm:block'>
        <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-5 right-5 text-black cursor-pointer bg-white p-2 rounded-full "
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="25px" height="25px" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path stroke="currentColor" stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"></path></svg>

              </button>
        </div>
        <div className='block sm:hidden'>
           <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-2 right-2 text-black cursor-pointer bg-white p-1 rounded-full "
                        >
                          <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="23px" height="20px" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path fill="currentColor" fill-rule="evenodd" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z" clip-rule="evenodd"></path><path stroke="currentColor" stroke-width="1.5" d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451L12 6.492l1.29-1.291a4.926 4.926 0 013.504-1.451z"></path></svg>
          
                        </button>
        </div>
         </div>
         <div  onClick={() => navigate(`/details/${encodeURIComponent(item.name)}?id=${item.id}`)} className="px-2 sm:px-0 py-2  ">
            <p className="text-[#D33918] ">{item.status}</p>

          
            <p className=" inter truncate block  ">
              {item.name}
            </p>
            <p className=" text-gray-500 block  ">
              {item.type}
            </p>
          

           
              <p className="">
                <span className="inter "> {formatPrice(item.price)}</span>
                <span className="text-sm">₫</span>
              </p>
              
           
          </div>
           
           
            </div>
          ))}
         {
  showPopup && selectedProduct && (
    <PopupSize 
      img={selectedProduct.img}
      name={selectedProduct.name}
      price={selectedProduct.price_sale}
      gender={selectedProduct.gender}
      sizes={selectedProduct.sizes}
      onSelectSize={handleSelectSize}
      onClose={() => setShowPopup(false)}
    />
  )
}

        </div>
       </div>
      )}
    </div>
  );
};

export default Wishlist;
