import React from 'react';

const ImageCol1 = () => {
  const images = [
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_676,c_limit/dec1da00-91d8-4a40-a7cb-de128e889ab6/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_676,c_limit/f574c151-79e7-4034-837e-aaf03f7ffa82/nike-just-do-it.jpg",
    "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_676,c_limit/caf490c0-35d2-41fd-8233-1281b9001f17/nike-just-do-it.jpg",
  ];
  const names = ["Shop Running", "Shop Soccer", "Shop Basketball"];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-screen-xl mx-auto px-10">
     {images.map((image, index) => (
  <div key={index} className="relative">
    <img src={image} alt="" className="w-full h-auto" />
    <button
      className={`absolute inter bottom-8 left-8 px-5 py-2 rounded-full cursor-pointer ${
        index === 1
          ? 'bg-black text-white hover:bg-[#707072]'
          : 'bg-white text-black hover:bg-[#CACACB]'
      }`}
    >
      {names[index]}
    </button>
  </div>
))}

    </div>
  );
};

export default ImageCol1;
