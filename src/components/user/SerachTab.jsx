import { Link } from "react-router-dom";

const SearchTab = ({ onClose }) => {
  return (
    <>
      {/* Overlay mờ */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        // onClick={onClose}
      ></div>

      {/* Nội dung tìm kiếm */}
      <div className="fixed top-0 left-0 w-full bg-white border border-red-500 z-50 px-10 max-w-screen-2xl">
  <div className="flex items-center justify-between w-full">
    {/* Icon quay lại */}
    <Link to="/">
      <svg viewBox="0 0 24 24" fill="none" width="80px" height="80px">
        <path
          fill="currentColor"
          d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
          style={{ transform: "scale(1.2)", transformOrigin: "center" }}
        />
      </svg>
    </Link>


{/* Ô tìm kiếm */}
<div className="flex-1 flex justify-center">
  <div className="relative w-full max-w-xl">
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
      />
    </svg>
    <input
      type="text"
      className="w-full bg-gray-100 hover:bg-[#E5E5E5] rounded-full pl-10 h-10 pr-4 py-2 outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200"
      placeholder="Search"
    />
  </div>
</div>



    {/* Nút Cancel */}
    <p
      className="cursor-pointer text-black font-semibold"
      onClick={onClose}
    >
      Cancel
    </p>
  </div>
 
</div>

    
    </>
  );
};

export default SearchTab;
