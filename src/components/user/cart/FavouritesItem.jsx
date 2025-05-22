import React from 'react';
import { Link } from 'react-router-dom';

const CheckIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 24 24"
    role="img"
    width="20px"
    height="20px"
    fill="#128A09"
    className="text-[#128A09]"
  >
    <path
      fill="#128A09"
      fillRule="evenodd"
      d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-7.319-2.867l-4.241 4.243-2.122-2.121-1.06 1.06 2.652 2.652.53.53.53-.53 4.772-4.774-1.06-1.06z"
      clipRule="evenodd"
    />
  </svg>
);

const FavouritesItem = ({ user, cart, formatPrice, removeFromWishlist, addToCart }) => {
  return (
    <div className="">
      <p className="text-2xl py-5">Favourites</p>
      {user?.wishlist?.length > 0 ? (
        <div className="flex flex-row gap-10 ">
          {user?.wishlist?.slice(0, 2).map((item) => {
            const isInCart = cart.some(cartItem => cartItem.id === item.id);
            return (
              <div key={item.id} className="w-full md:w-1/2 flex gap-4">
                <Link to={`/details/${item.name}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-45 h-45 cursor-pointer object-cover"
                  />
                </Link>
                <div className="flex flex-col justify-between flex-grow">
                  <div className="flex justify-between w-full">
                    <div>
                      <h3 className="inter text-lg text-black hover:text-[#707072] cursor-pointer">
                        {item.name}
                      </h3>
                      <p>{item.type}</p>
                      <div className="py-4">
                      {isInCart ? (
  <button
    onClick={() => removeFromWishlist(item.id)}
    className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-gray-300 hover:border-black cursor-pointer"
  >
    <CheckIcon />
    Added
  </button>
) : (
<button
  onClick={() => {
    const plainItem = { ...item, quantity: 1 };
    addToCart(plainItem);
  }}
  className="px-4 py-2 rounded-2xl border border-gray-300 hover:border-black cursor-pointer"
>
  Add to Bag
</button>

)}

                      </div>
                    </div>
                    <p>
                            <span className="inter">{formatPrice(item.price)}</span>
                            <span className="text-sm underline">đ</span>
                        </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500">You have no items in your wishlist.</p>
      )}
    </div>
  );
};

export default FavouritesItem;
