import React from 'react';
import useBanner from '../../../hooks/useBanner';

const Banner2 = ({ position }) => {
  const { banner } = useBanner();
  const filteredBanners = banner.filter((b) => b.position === position);

  return (
    <div>
      {filteredBanners.map((item) => (
        <div key={item.id} className="mb-10">
          <img src={item.bannerImg} className="w-full cursor-pointer" alt={item.title} />
          <div className="flex justify-center">
            <div className="text-center py-6 space-y-2 max-w-xl">
              <p className="inter">{item.category}</p>
              <p className="title text-5xl">{item.title}</p>
             
              <button className="px-5 py-2 inter bg-black text-white rounded-full cursor-pointer">
                {item.button}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner2;
