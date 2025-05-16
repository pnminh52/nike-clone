import React, {useState} from 'react'

const ProductDetailCard = ({ product, onClose }) => {
  const allImages = [product.img, ...(product.additionalImages || [])];
  const  [currentIndex, setCurrentIndex]=useState(0)
  const handlePrev=()=>{
    setCurrentIndex((prevIndex)=>
    prevIndex===0? allImages.length-1:prevIndex-1
    )
  }
  const handleNext=()=>{
    setCurrentIndex((prevIndex)=>
      prevIndex===allImages.length-1? 0:prevIndex+1
      )
  }
  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="min-h-[600px] flex items-center ">
      <div className="relative">
  {allImages[currentIndex] && (
    allImages[currentIndex].endsWith(".mp4") ? (
      <video
        src={allImages[currentIndex]}
        className="w-[485px] h-[600px] cursor-pointer  rounded-l-3xl object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    ) : (
      <img
        src={allImages[currentIndex]}
        alt={product.name}
        className="w-[485px] h-[600px] cursor-pointer rounded-l-3xl object-cover"
      />
    )
  )}

  <div className="absolute bottom-4 right-4 gap-2 flex items-center">
    <button
      onClick={handlePrev}
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
      onClick={handleNext}
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



        <div className="relative bg-white max-h-[600px] w-full rounded-r-3xl max-w-xl p-8 overflow-y-auto  hide-scrollbar">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 7L16.8995 16.8995" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 mt-4">
            <div className='flex gap-2'>
              <div>
                <h3 className="text-xl">{product.name}</h3>
               <div className='flex gap-2 items-center'>

               <p className=" text-gray-400 line-through">{formatPrice(product.price_sale) }<span className='text-sm underline'>đ</span></p>

               <p className=" text-black">{formatPrice(product.price) }<span className='text-sm underline'>đ</span></p>
               </div>
              </div>
            </div>

            <p>{product?.des}</p>

            {product.featured?.length > 0 && (
              <div className="space-y-3">
                {product.featured.map((item, index) => (
                  <div key={index}>
                    <h4 className="text-xl">{item.title}</h4>
                    <p className="text-sm">{item.content}</p>
                  </div>
                ))}
              </div>
            )}

            {product.moreBenefit?.length > 0 && (
              <div>
                <h4 className="text-xl">More Benefits</h4>
                <ul className="list-disc pl-5">
                  {product.moreBenefit.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-xl">Product details</h4>
              <ul className="list-disc pl-5">
              {Object.keys(product)
  .filter(
    key =>
      key.startsWith("note") &&
      product[key] &&
      !(Array.isArray(product[key]) && product[key].length === 0)
  )
  .sort()
  .flatMap(key => {
    const value = product[key];
    return Array.isArray(value)
      ? value.map((item, idx) => <li key={`${key}-${idx}`}>{item}</li>)
      : <li key={key}>{value}</li>;
  })
}


                <li>Colour Shown: {product.color.join('/')}</li>
                <li>Style: {product.style}</li>
                <li>Status: {product.status}</li>
                <li>Stock: {product.stock}</li>
                <li>Brand: {product.brand}</li>
                <li>Country/Region of Origin: {product.country}</li>
                <li>Gift point: {product.giftPoint} point</li>
                <li>Type: {product.type}</li>
                <li>Category: {product.category}</li>
                <li>Sizes: {product.sizes.join("/")}</li>
                <li>Features: {product.features}</li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailCard
