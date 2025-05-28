import React from 'react'

const Slider2 = () => {
  const comment = [
    {
      name: "Minh Pham",
      content: "The product is absolutely stunning! It fits perfectly and feels very comfortable to wear.",
      credit: "Nike",
    },
    {
      name: "Huy Nguyen",
      content: "Fast delivery and careful packaging. I'm very satisfied with the service and product quality.",
      credit: "Nike",
    },
    {
      name: "Trung Le",
      content: "The quality is decent, but the color is slightly different from the picture shown.",
      credit: "Nike",
    },
    {
      name: "Hoang Nam",
      content: "Nike has always been my top choice when it comes to sneakers. Stylish and reliable!",
      credit: "Nike",
    },
    {
      name: "Anh Tran",
      content: "Excellent craftsmanship and attention to detail. These shoes exceeded my expectations.",
      credit: "Nike",
    },
    {
      name: "Long Bui",
      content: "Comfortable for long walks and great support. Worth every penny!",
      credit: "Nike",
    },
    {
      name: "Tuan Vo",
      content: "Love the modern design. The shoes match well with both casual and sporty outfits.",
      credit: "Nike",
    },
    {
      name: "Duc Nguyen",
      content: "Shoe quality is great, but the sizing runs a bit small. I recommend going half a size up.",
      credit: "Nike",
    },
    {
      name: "Phong Le",
      content: "Super lightweight and breathable. Ideal for summer weather.",
      credit: "Nike",
    },
    {
      name: "Khoa Dang",
      content: "This is my third pair from Nike and they never disappoint. Keep it up!",
      credit: "Nike",
    },
    {
      name: "Nam Hoang",
      content: "Packaging was neat and professional. Arrived earlier than expected!",
      credit: "Nike",
    },
    {
      name: "Hieu Pham",
      content: "Looks even better in real life. The photos don’t do them justice.",
      credit: "Nike",
    },
    {
      name: "Linh Tran",
      content: "These shoes are very supportive for running. I can feel the difference.",
      credit: "Nike",
    },
    {
      name: "Bao Do",
      content: "Soft sole and perfect grip. Great for indoor sports.",
      credit: "Nike",
    },
    {
      name: "Quang Nguyen",
      content: "I get compliments every time I wear these. Totally love the design.",
      credit: "Nike",
    },
    {
      name: "Thanh Lam",
      content: "I was worried about buying shoes online, but these turned out great.",
      credit: "Nike",
    }
  ];

  return (
   
    <div className='mt-4 mb-4 overflow-hidden'>
    <div className='flex gap-4 animate-scroll w-[200%]'>
      {[...comment, ...comment].map((c, index) => (
        <div
          key={index}
          className="relative border rounded-xl shadow-sm bg-white w-[300px] flex-shrink-0"
        >
          <div className="space-y-20">
            <p className="text-gray-700 py-4 px-4 break-words text-sm leading-relaxed">
              {c.content}
            </p>
            <div>
              <div className='absolute bottom-4 left-4'>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.credit}</p>
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
