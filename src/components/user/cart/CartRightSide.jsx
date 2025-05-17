import React from 'react'
import { Link } from "react-router-dom";

const CartRightSide = ({ user, formatPrice, total, finalPrice}) => {
      
       
    
    
  return (
    <div>
        <p className="text-2xl py-5">Summary</p>
                    <div className="mb-6 space-y-2">
                        <div className="flex  justify-between items-center ">
                            <p className="">Subtotal</p>
                            <p className="">
                                <span className="">{formatPrice(total)}</span>
                                <span className="text-sm underline">đ</span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center ">
                            <p className="">Shipping Fee</p>
                            <p className="">{formatPrice(user.shippingFeeByAddress)}  <span className="text-sm underline">đ</span></p>
                            
                        </div>
                        
                    </div>
                    <div className="flex justify-between items-center py-6 border-t border-b border-gray-300">
                        <p className="inter text-lg">Total</p>
                        <p>
                            <span className="inter">{formatPrice(finalPrice)}</span>
                            <span className="text-sm underline">đ</span>
                        </p>
                    </div>
                    <Link to={"/checkout"}>
                        <button
                            className="w-full mt-8 inter text-lg rounded-full h-16 transition 
   bg-black text-white hover:bg-gray-800 cursor-pointer
              "
                        >
                           Member Checkout
                        </button></Link>
    </div>
  )
}

export default CartRightSide
