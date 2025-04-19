import React from "react";

const Footer = () => {
    return (
        <div className="max-w-sreen-2xl px-10 mx-auto  w-full">
            <div className="border-t border-gray-400 justify-between flex py-10">
                <div className="flex gap-20">
                    <ul className="space-y-4">
                        <li className="inter text-black text-sm mb-8">Resources</li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Find A Store
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Become A Member
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Running Shoe Finder
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Send Us Feedback
                        </li>
                    </ul>
                    <ul className="space-y-4">
                        <li className="inter text-black text-sm mb-8">Help</li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           Get Help
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Order Status
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Delivery
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           Returns
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           Payment Options
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           Contact Us
                        </li>
                    </ul>
                    <ul className="space-y-4">
                        <li className="inter text-black text-sm mb-8">Company</li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           About Nike
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            News
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                           Careers
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Invenstors
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Sustainability
                        </li>
                        <li className="inter text-gray-500 text-sm cursor-pointer">
                            Report a Concern
                        </li>
                    </ul>
                </div>
                <div>
                    <p className="text-gray-400 inter flex gap-1 cursor-pointer  items-center text-sm">
                        <svg
                            aria-hidden="true"
                            class="css-npy3on"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="20px"
                            height="20px"
                            fill="none"
                        >
                            <path
                                stroke="currentColor"
                                stroke-miterlimit="10"
                                stroke-width="1.5"
                                d="M21.75 12A9.75 9.75 0 0112 21.75M21.75 12A9.75 9.75 0 0012 2.25M21.75 12c0 2.071-4.365 3.75-9.75 3.75S2.25 14.071 2.25 12m19.5 0c0-2.071-4.365-3.75-9.75-3.75S2.25 9.929 2.25 12M12 21.75A9.75 9.75 0 012.25 12M12 21.75c2.9 0 5.25-4.365 5.25-9.75S14.9 2.25 12 2.25m0 19.5c-2.9 0-5.25-4.365-5.25-9.75S9.1 2.25 12 2.25M2.25 12A9.75 9.75 0 0112 2.25"
                            ></path>
                        </svg>{" "}
                        Vietnam
                    </p>
                </div>
            </div>
            <div className="flex gap-4 ">
                <p className="cursor-pointer mb-14 text-sm inter text-gray-500 hover:text-black ease-in-out duration-300 transition">© 2025 Nike, Inc. All rights reserved</p>
                <p className="cursor-pointer mb-14 text-sm inter text-gray-500 hover:text-black ease-in-out duration-300 transition">Guides</p>
                <p className="cursor-pointer mb-14 text-sm inter text-gray-500 hover:text-black ease-in-out duration-300 transition">Terms of Sale</p>
                <p className="cursor-pointer mb-14 text-sm inter text-gray-500 hover:text-black ease-in-out duration-300 transition">Terms of Use</p>
                <p className="cursor-pointer mb-14 text-sm inter text-gray-500 hover:text-black ease-in-out duration-300 transition">Nike Privacy Policy</p>
            </div>
        </div>
    );
};

export default Footer;
