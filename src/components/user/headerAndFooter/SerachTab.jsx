import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchTab = ({ onClose }) => {
  const [keyword, setKeyword] = useState("");
  const [recentSearches, setRecentSearches] = useState([]); // State để lưu các từ khóa tìm kiếm gần đây
  const navigate = useNavigate();
  const searchKey = [
    "air force 1",
    "jordan",
    "basketball shoes",
    "air max",
    "tennis",
    "sneakers",
    "running shoes",
    "jordan 1 low",
    "jordan 1",
    "nike dunk low",
  ];

  useEffect(() => {
    // Lấy lịch sử tìm kiếm từ localStorage khi modal được mở
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && keyword.trim() !== "") {
      // Cập nhật danh sách tìm kiếm gần đây
      setRecentSearches((prev) => {
        const updatedSearches = [keyword.trim(), ...prev];
        const limitedSearches = updatedSearches.slice(0, 5);

        // Lưu lại lịch sử tìm kiếm vào localStorage
        localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
        return limitedSearches;
      });

      // Chuyển hướng và chỉ đóng modal sau khi navigate xong
      navigate(`/search/${encodeURIComponent(keyword.trim())}`);

      // Để modal không đóng ngay lập tức, chỉ gọi onClose sau khi navigate xong
      setTimeout(() => {
        onClose();  // Gọi onClose để đóng modal sau một khoảng thời gian nhỏ
      }, 500);  // Chờ khoảng thời gian đủ để thực hiện điều hướng (500ms)
    }
  };

  const handleClearSearch = (searchTerm) => {
    // Xóa từ khóa khỏi lịch sử và lưu lại vào localStorage
    const updatedSearches = recentSearches.filter((item) => item !== searchTerm);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches)); // Lưu lại lịch sử vào localStorage
  };

  const handleSearchFromKeyword = (searchTerm) => {
    setKeyword(searchTerm); // Cập nhật keyword để hiển thị trong ô tìm kiếm
    navigate(`/search/${encodeURIComponent(searchTerm)}`); // Điều hướng đến trang tìm kiếm với từ khóa
    onClose(); // Đóng modal sau khi thực hiện tìm kiếm
  };

  return (
    <>
      {/* Overlay mờ */}
      <div className="fixed inset-0 bg-black/40 z-40"></div>

      {/* Nội dung tìm kiếm */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 px-10 max-w-screen-2xl">
        <div className="flex items-center justify-between w-full py-0">
          {/* Icon quay lại */}
          <div className="flex justify-start">
            <Link to="/">
              <svg viewBox="0 0 24 24" fill="none" width="80px" height="80px">
                <path
                  fill="currentColor"
                  d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z"
                  style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                />
              </svg>
            </Link>
          </div>

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
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                className="w-full bg-gray-100 hover:bg-[#E5E5E5] rounded-full pl-10 h-10 pr-4 py-2 outline-none focus:ring-2 font-semibold focus:ring-black transition duration-200"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Nút Cancel */}
          <div className="flex justify-end">
            <p className="cursor-pointer text-black font-semibold" onClick={onClose}>
              Cancel
            </p>
          </div>
        </div>

        {/* Các phần còn lại của nội dung tìm kiếm */}
        <div className="max-w-screen-md justify-center mx-auto">
          <p className="text-medium text-gray-500 py-4">Popular Search Terms</p>
          <div className={`flex gap-4 flex-wrap ${!recentSearches.length?"mb-15":""}`}>
            {searchKey.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleSearchFromKeyword(item)} // Khi nhấp vào từ khóa phổ biến
                  className="px-4 py-1.5 rounded-full cursor-pointer bg-gray-100 hover:bg-[#E5E5E5] inter duration-300 transition ease-in-out"
                >
                  {item}
                </button>
              </div>
            ))}
          </div>

          {recentSearches.length > 0 && (
            <>
              <p className="text-medium text-gray-500 py-4">Recent searches</p>
              <div className="space-y-2 mb-15">
                {recentSearches.map((searchTerm, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p
                      onClick={() => handleSearchFromKeyword(searchTerm)} // Khi nhấp vào từ khóa tìm kiếm gần đây
                      className="text-black text-lg inter cursor-pointer hover:text-gray-500"
                    >
                      {searchTerm}
                    </p>
                    <button
                      onClick={() => handleClearSearch(searchTerm)}
                      className="cursor-pointer"
                    >
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
                          strokeWidth="1.5"
                          d="M18.973 5.027L5.028 18.972m0-13.945l13.944 13.945"
                        ></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchTab;
