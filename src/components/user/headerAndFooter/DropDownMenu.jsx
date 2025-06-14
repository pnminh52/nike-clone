import React from 'react'

const DropdownMenu = ({ isHovered, setIsHovered, page, columnCount, categories, onChildClick }) => {
    return (
      <div className="relative z-50">
        {isHovered && (
          <div className="absolute top-full left-0 w-full h-[calc(100vh-56px)] bg-black opacity-60 z-40 transition-opacity duration-300"></div>
        )}
  
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute left-0 top-full w-full bg-white shadow-lg overflow-hidden transition-all duration-500 ease-in-out z-50 ${
            isHovered
              ? "max-h-[500px] opacity-100 translate-y-0 pointer-events-auto"
              : "max-h-0 opacity-0 translate-y-[-0px] pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-screen-xl px-65 justify-center flex flex-col">
            <div className={`grid grid-cols-${columnCount} gap-4 mt-4 mb-10`}>
              {categories
                .filter((cat) => (!cat.parentId || cat.parentId === "") && cat.page === page)
                .map((parent) => (
                  <div key={parent.id}>
                    <p className="font-semibold text-sm inter mb-3 hover:text-gray-700 cursor-pointer">
                      {parent.name}
                    </p>
                    <ul className="text-[12px] inter text-gray-500 space-y-3">
                      {categories
                        .filter((child) => child.parentId === parent.id)
                        .map((child) => (
                          <li
                            key={child.id}
                            onClick={() => onChildClick(child)}
                            className="cursor-pointer hover:text-black"
                          >
                            {child.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DropdownMenu;
  
