import React from "react";

const CheckoutFooter = () => {
  return (
    <div className="bg-[#111111] h-11">
      <div className="flex items-center h-11 max-w-screen-2xl mx-auto px-8 justify-between">
        <ul className="flex text-[10px] text-white gap-4 cursor-pointer items-center">
          <li className="flex items-center gap-1">Vietnam</li>
          <li>© 2025 NIKE, Inc. All Rights Reserved</li>
          <li>Terms of Use</li>
          <li>Terms of Sale</li>
          <li>Privacy Policy</li>
        </ul>
        <div className="flex gap-1">
          <img
            src="https://assets.eshopworld.com/payments/cardsize/GooglePay.svg"
            alt=""
          />
          <img
            src="https://assets.eshopworld.com/payments/cardsize/PayPal.svg"
            alt=""
          />
          <img src="https://assets.eshopworld.com/payments/cardsize/Visa.svg" alt="" />
          <img src="https://assets.eshopworld.com/payments/cardsize/VisaElectron.svg" alt="" />
          <img src="https://assets.eshopworld.com/payments/cardsize/MasterCard.svg" alt="" />
          <img src="https://assets.eshopworld.com/payments/cardsize/Maestro.svg" alt="" />
          <img src="https://assets.eshopworld.com/payments/cardsize/Amex.svg" alt="" />
            <img src="https://assets.eshopworld.com/payments/cardsize/DinersClub.svg" alt="" />
            <img src="https://assets.eshopworld.com/payments/cardsize/Discover.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutFooter;
