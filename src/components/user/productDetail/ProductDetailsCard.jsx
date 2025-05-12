import React from 'react'

const ProductDetailsCard = ({ selectedProduct, onClose }) => {
  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="relative bg-white max-h-[90vh] w-full max-w-2xl p-8 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleCancel}
            type="button"
            className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
          >
           <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Product content */}
        <div className="space-y-4 mt-4">
            <div className='flex gap-2'>
            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-20 h-20 cursor-pointer object-cover rounded-lg" />

        <div>
        <h3 className="cursor-pointer">{selectedProduct.name}</h3>
            <p className="text-sm">
            { `${Number(selectedProduct.price).toLocaleString()} đ`}
          </p>
        </div>
            </div>

      
       
   
          <p className="">{selectedProduct?.des}</p>
          {selectedProduct.featured?.length > 0 && (
            <div className="space-y-3">
              {selectedProduct.featured.map((item, index) => (
                <div key={index}>
                  <h4 className="text-xl">{item.title}</h4>
                  <p className="text-sm ">{item.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* More Benefits */}
          {selectedProduct.moreBenefit?.length > 0 && (
            <div>
              <h4 className="text-xl">More Benefits</h4>
              <ul className="list-disc  pl-5">
                {selectedProduct.moreBenefit.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Specs */}
          <div className=" ">
          <h4 className="text-xl"> Product details</h4>
          <ul className="list-disc  pl-5">
          {Object.keys(selectedProduct)
      .filter(key => key.startsWith("note"))
      .sort()
      .map(key => (
        <li key={key}>{selectedProduct[key]}</li>
      ))}
            <li>Colour Shown: {selectedProduct.color.join('/')}</li>
            <li>Style: {selectedProduct.style}</li>
            <li>Country/Region of Origin: {selectedProduct.country}</li>
          </ul>
          
           
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsCard
