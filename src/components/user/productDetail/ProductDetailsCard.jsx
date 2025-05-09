import React from 'react'

const ProductDetailsCard = ({ selectedProduct, onClose }) => {
  const handleCancel = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
      <div className="relative bg-white max-h-[90vh] w-full max-w-lg p-4 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
        {/* Close button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleCancel}
            type="button"
            className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Product content */}
        <div className="space-y-4 mt-4">
        <img src={selectedProduct.img} alt={selectedProduct.name} className="w-20 h-20 cursor-pointer object-cover rounded-lg" />

          <h2 className="text-2xl font-bold">{selectedProduct?.name}</h2>
          <p className="text-gray-600">{selectedProduct?.type}</p>
          <p className="text-lg font-semibold text-red-500">
            { `${Number(selectedProduct.price).toLocaleString()} đ`}
          </p>
          <p className="text-sm text-gray-700">{selectedProduct?.des}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsCard
