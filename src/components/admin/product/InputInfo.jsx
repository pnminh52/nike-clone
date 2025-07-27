import React from 'react'

const InputInfo = ({inputValue, handleDataChange}) => {
  return (
    <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Product Name</p>
    <input
      name="name"
      value={inputValue.name || ""}
      onChange={handleDataChange}
      placeholder="Product Name"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Stock</p>
    <input
      name="stock"
      type="number"
      value={inputValue.stock || ""}
      onChange={handleDataChange}
      placeholder="Stock"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Price</p>
    <input
      name="price"
      type="number"
      value={inputValue.price || ""}
      onChange={handleDataChange}
      placeholder="Price"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>
</div>

<div className="flex items-start justify-between gap-2">
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Price Sale</p>
    <input
      name="price_sale"
      type="number"
      value={inputValue.price_sale || ""}
      onChange={handleDataChange}
      placeholder="Price Sale"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Style</p>
    <input
      name="style"
      type="text"
      value={inputValue.style || ""}
      onChange={handleDataChange}
      placeholder="Style"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Country</p>
    <input
      name="country"
      value={inputValue.country || ""}
      onChange={handleDataChange}
      placeholder="Country"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>
</div>

<div className="flex items-start justify-between gap-2">
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Height</p>
    <input
      name="height"
      value={inputValue.height || ""}
      onChange={handleDataChange}
      placeholder="Height"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Shoes For</p>
    <input
      name="shoesFor"
      value={inputValue.shoesFor || ""}
      onChange={handleDataChange}
      placeholder="Shoes For"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Class</p>
    <input
      name="class"
      value={inputValue.class || ""}
      onChange={handleDataChange}
      placeholder="Class"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>
</div>

<div className="flex items-start justify-between gap-2">
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Brand</p>
    <input
      name="brand"
      value={inputValue.brand || ""}
      onChange={handleDataChange}
      placeholder="Brand"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Features</p>
    <input
      name="features"
      value={inputValue.features || ""}
      onChange={handleDataChange}
      placeholder="Features"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Gift Point</p>
    <input
      name="giftPoint"
      type="number"
      value={inputValue.giftPoint || ""}
      onChange={handleDataChange}
      placeholder="Gift Point"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>
</div>


<div className="flex items-start justify-between gap-2">
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Type</p>
    <input
      name="type"
      value={inputValue.type || ""}
      onChange={handleDataChange}
      placeholder="Type"
      className="w-full border px-4 py-2 rounded-lg"
    />
  </div>

  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Customer</p>
    <select
      name="customer"
      value={inputValue.customer || ""}
      onChange={handleDataChange}
      className="w-full border px-4 py-2 rounded-lg"
    >
      <option value="">Select Customer</option>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Unisex">Unisex</option>
      <option value="Kids">Kids</option>
    </select>
  </div>
</div>

         <div className="w-full">
         <p className="mb-1 text-sm font-medium">Description</p>
         <input name="des" value={inputValue.des || ""} onChange={handleDataChange} placeholder="Description" className="w-full border px-4 py-10 rounded-lg" />
         </div>
    
          {/* --- DROPDOWNS --- */}
          <div className="flex justify-between items-start gap-2">
  {/* Page */}
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Page</p>
    <select
      name="page"
      value={inputValue.page || ""}
      onChange={handleDataChange}
      className="w-full border px-4 py-2 rounded-lg"
    >
      <option value="">Select Page</option>
      <option value="New & Featured">New & Featured</option>
      <option value="Trending">Trending</option>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
      <option value="Kids">Kids</option>
      <option value="Sale">Sale</option>
    </select>
  </div>

  {/* Category component tương ứng theo page */}
 
  <div className="w-full">
  <p className="mb-1 text-sm font-medium">Category</p>
  
  {inputValue.page === "New & Featured" && (
    <NewAndFeatured value={inputValue.category} onChange={handleDataChange} />
  )}
  {inputValue.page === "Trending" && (
    <TrendingCategory value={inputValue.category} onChange={handleDataChange} />
  )}
  {inputValue.page === "Women" && (
    <WomenCategory value={inputValue.category} onChange={handleDataChange} />
  )}
  
  {!inputValue.page && (
    <p className="text-red-600 text-sm flex items-center justify-center mt-4 italic">Please select a Page first</p>
  )}
</div>


  {/* Status */}
  <div className="w-full">
    <p className="mb-1 text-sm font-medium">Status</p>
    <select
      name="status"
      value={inputValue.status || ""}
      onChange={handleDataChange}
      className="w-full border px-4 py-2 rounded-lg"
    >
      <option value="">Select Status</option>
      <option value="Just In">Just In</option>
      <option value="Coming Soon">Coming Soon</option>
    </select>
  </div>

  {/* Gender (ẩn nếu customer là Kids) */}
  {inputValue.customer !== "Kids" && (
    <div className="w-full">
      <p className="mb-1 text-sm font-medium">Gender</p>
      <select
        name="gender"
        value={inputValue.gender || ""}
        onChange={handleDataChange}
        className="w-full border px-4 py-2 rounded-lg"
      >
        <option value="">Select Gender</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>
    </div>
  )}
</div>

    </div>
  )
}

export default InputInfo
