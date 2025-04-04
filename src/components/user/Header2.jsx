import React from 'react'

const Header2 = () => {
  return (
    <div>
      <div className="container h-16  mx-auto px-8 max-w-screen-xl flex justify-between items-center sticky top-0 z-10 bg-white  ">
                <svg
                    aria-hidden="true"
                    class="swoosh-svg"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="80px"
                    height="80px"
                    fill="none"
                >
                    <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                <div className='w-20'></div>
                
                <div className="hidden sm:block">
                    <ul className="flex gap-6 items-center inter ">
                        <li className="cursor-pointer text-[14px]">New & Featured</li>
                        <li className="cursor-pointer text-[14px]">Men</li>
                        <li className="cursor-pointer text-[14px]">Women</li>
                        <li className="cursor-pointer text-[14px]">Kids</li>
                        <li className="cursor-pointer text-[14px]">Sale</li>
                    </ul>
                </div>

                <div className="flex items-center gap-4 sm:gap-3">
                <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                            className="  block sm:hidden text-black"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                            ></path>
                        </svg>
                    <div className="relative w-full max-w-45 hidden sm:block">
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 24 24"
                            role="img"
                            width="24px"
                            height="24px"
                            fill="none"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                        >
                            <path
                                stroke="currentColor"
                                strokeWidth="1.5"
                                d="M13.962 16.296a6.716 6.716 0 01-3.462.954 6.728 6.728 0 01-4.773-1.977A6.728 6.728 0 013.75 10.5c0-1.864.755-3.551 1.977-4.773A6.728 6.728 0 0110.5 3.75c1.864 0 3.551.755 4.773 1.977A6.728 6.728 0 0117.25 10.5a6.726 6.726 0 01-.921 3.407c-.517.882-.434 1.988.289 2.711l3.853 3.853"
                            ></path>
                        </svg>
                        <input
                            type="text"
                            className="w-full bg-gray-100 rounded-full pl-10  pr-0 py-2 outline-none focus:ring-2 focus:ring-black transition duration-200"
                            placeholder="Search"
                        />
                    </div>

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
                            stroke-width="1.5"
                            d="M16.794 3.75c1.324 0 2.568.516 3.504 1.451a4.96 4.96 0 010 7.008L12 20.508l-8.299-8.299a4.96 4.96 0 010-7.007A4.923 4.923 0 017.205 3.75c1.324 0 2.568.516 3.504 1.451l.76.76.531.531.53-.531.76-.76a4.926 4.926 0 013.504-1.451"
                        ></path>
                    </svg>
                    <div className="relative">
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
                                stroke-width="1.5"
                                d="M8.25 8.25V6a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 110 4.5H3.75v8.25a3.75 3.75 0 003.75 3.75h9a3.75 3.75 0 003.75-3.75V8.25H17.5"
                            ></path>
                        </svg>
                        <p className="absolute top-[13px] left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-[10px]">
                            1
                        </p>
                    </div>
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21 5.25H3M21 12H3m18 6.75H3"></path></svg>
                </div>
            </div>
    </div>
  )
}

export default Header2
