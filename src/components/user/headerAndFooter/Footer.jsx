import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="max-w-screen-2xl px-6 sm:px-10 mx-auto w-full">
        <div className="  flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col gap-6 md:flex-row md:gap-20 border border-blue-600 sm:border-white">
            <ul className="space-y-2">
              <li className="inter text-black text-sm">Resources</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Find A Store</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Become A Member</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Running Shoe Finder</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Send Us Feedback</li>
            </ul>
            <ul className="space-y-2">
              <li className="inter text-black text-sm">Help</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Get Help</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Order Status</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Delivery</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Returns</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Payment Options</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Contact Us</li>
            </ul>
            <ul className="space-y-2">
              <li className="inter text-black text-sm">Company</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">About Nike</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">News</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Careers</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Investors</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Sustainability</li>
              <li className="inter text-gray-500 text-sm cursor-pointer">Report a Concern</li>
            </ul>
          </div>
          <div className="py-8 sm:py-0">
            <p className="text-gray-500 inter flex gap-1 items-center text-sm cursor-pointer">
              <svg
                aria-hidden="true"
                className="css-npy3on"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="20px"
                height="20px"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="1.5"
                  d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
                ></path>
              </svg>{" "}
              Vietnam
            </p>
          </div>
        </div>

        <div className="flex flex-col border mt-0 sm:mt-8 mb-8 border-blue-600 sm:border-white sm:flex-row sm:gap-4 gap-2">
          <p className="cursor-pointer text-sm inter text-gray-500 hover:text-black transition">
            © 2025 Nike, Inc. All rights reserved
          </p>
          <p className="cursor-pointer text-sm inter text-gray-500 hover:text-black transition">
            Guides
          </p>
          <p className="cursor-pointer text-sm inter text-gray-500 hover:text-black transition">
            Terms of Sale
          </p>
          <p className="cursor-pointer text-sm inter text-gray-500 hover:text-black transition">
            Terms of Use
          </p>
          <p className="cursor-pointer text-sm inter text-gray-500 hover:text-black transition">
            Nike Privacy Policy
          </p>
        </div>
      </div>

      <div className="bg-black h-auto py-2 hidden sm:block">
        <div className="max-w-screen-2xl flex flex-col md:flex-row justify-between items-center px-5 md:px-10 mx-auto">
          <p className="text-white text-xs">Project written by Pham Nhat Minh</p>
          <p className="text-white text-xs">Elyz.thedev@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
