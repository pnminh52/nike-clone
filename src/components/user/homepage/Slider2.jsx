import React from "react";

const Slider2 = () => {
  const comment1 = [
    { name: "Wes Bos", content: "The product is absolutely stunning! It fits perfectly and feels very comfortable to wear.", credit: "Internet" },
    { name: "Huy Nguyen", content: "Fast delivery and careful packaging. I'm very satisfied with the service and product quality.", credit: "Nike" },
    { name: "Trung Le", content: "The quality is decent, but the color is slightly different from the picture shown.", credit: "Nike" },
    { name: "Hoang Nam", content: "Nike has always been my top choice when it comes to sneakers. Stylish and reliable!", credit: "Nike" },
    { name: "Anh Tran", content: "Excellent craftsmanship and attention to detail. These shoes exceeded my expectations.", credit: "Nike" },
    { name: "Long Bui", content: "Comfortable for long walks and great support. Worth every penny!", credit: "Nike" },
    { name: "Tuan Vo", content: "Love the modern design. The shoes match well with both casual and sporty outfits.", credit: "Nike" },
    { name: "Duc Nguyen", content: "Shoe quality is great, but the sizing runs a bit small. I recommend going half a size up.", credit: "Nike" },
  ];

  const comment2 = [
    { name: "Phong Le", content: "Super lightweight and breathable. Ideal for summer weather.", credit: "Nike" },
    { name: "Khoa Dang", content: "This is my third pair from Nike and they never disappoint. Keep it up!", credit: "Nike" },
    { name: "Nam Hoang", content: "Packaging was neat and professional. Arrived earlier than expected!", credit: "Nike" },
    { name: "Hieu Pham", content: "Looks even better in real life. The photos don’t do them justice.", credit: "Nike" },
    { name: "Linh Tran", content: "These shoes are very supportive for running. I can feel the difference.", credit: "Nike" },
    { name: "Bao Do", content: "Soft sole and perfect grip. Great for indoor sports.", credit: "Nike" },
    { name: "Quang Nguyen", content: "I get compliments every time I wear these. Totally love the design.", credit: "Nike" },
    { name: "Thanh Lam", content: "I was worried about buying shoes online, but these turned out great.", credit: "Nike" },
  ];

  // Hàm tạo URL avatar người thật từ randomuser.me
  const getAvatarUrl = (index) => {
    const gender = index % 2 === 0 ? "men" : "women";
    return `https://randomuser.me/api/portraits/${gender}/${index % 100}.jpg`;
  };

  return (
    <div className="py-4 relative overflow-hidden space-y-4">
      {/* Overlay trái và phải */}
      <div className="absolute top-0 left-0 w-64 h-full z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-full z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      {/* Dòng comment 1 */}
      <div className="flex gap-4 animate-scroll w-[200%]">
        {[...comment1, ...comment1].map((c, index) => (
          <div
          key={`c1-${index}`}
          className="relative rounded-xl border border-gray-300 cursor-pointer bg-[#F7F2E9] hover:bg-gradient-to-b hover:from-[#4FA6DA] hover:to-[#F9EEF7] transition duration-300 ease-in-out w-[300px] flex-shrink-0"
        >
        
            <div className="space-y-20">
              <p className="text-gray-700 py-4 px-4 break-words text-sm leading-relaxed">
                {c.content}
              </p>
              <div className="absolute bottom-4 left-4">
                <div className="flex gap-2 items-center">
                  <img
                    src={getAvatarUrl(index)}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.credit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dòng comment 2 */}
      <div className="flex gap-4 animate-scroll-reverse w-[200%]">
        {[...comment2, ...comment2].map((c, index) => (
         <div
         key={`c2-${index}`}
         className="relative rounded-xl border border-gray-300 cursor-pointer group bg-[#F7F2E9] hover:bg-gradient-to-b hover:from-[#4FA6DA] hover:to-[#F9EEF7] transition duration-300 ease-in-out w-[300px] flex-shrink-0"
       >
       
            <div className="space-y-20">
              <p className="text-gray-700 py-4 px-4 break-words text-sm leading-relaxed">
                {c.content}
              </p>
              <div className="absolute bottom-4 left-4">
                <div className="flex gap-2 items-center">
                  <img
                    src={getAvatarUrl(index + comment1.length)} // tránh trùng avatar với comment1
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.credit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider2;
