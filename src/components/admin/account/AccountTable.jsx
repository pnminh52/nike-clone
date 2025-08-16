import React from "react";
import {format} from "date-fns";
import { useState } from "react";

const AccountTable = ({ users, onViewDetails, onToggleStatus }) => {
      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(users.length / itemsPerPage);
      
    const formatDateTime = (dateString) => {
        return format(new Date(dateString), "dd/MM/yyyy HH:mm");
      };
  return (
    <div className="overflow-x-auto p-4 border-gray-300 border bg-white rounded-2xl">
      <table className="w-full border border-gray-300-collapse">
      <thead>
          <tr className=" text-center">
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Point</th>
            <th className="border border-gray-300 p-2">Total Order</th>
            <th className="border border-gray-300 p-2">Created At</th>

            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="hover:bg-gray-50 text-center">
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.firstname} {user.lastname}
              </td>
              <td className="border border-gray-300 p-2">{user.point}</td>
              <td className="border border-gray-300 p-2">{user.totalOrder}</td>
              <td className="border border-gray-300 p-2">{formatDateTime(user.createdAt)}</td>

              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2 text-sm">
                <span
                  className={` ${
                    user.accountStatus === "Blocked"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {user.accountStatus || "Active"}
                </span>
              </td>
              <td className="border border-gray-300 p-2 text-center space-x-2">
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => onViewDetails(user)}
                    className="cursor-pointer"
                  >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g transform="translate(1, 4)" fill="#000000">
                      <path d="M20.92,7.6 C18.9,2.91 15.1,0 11,0 C6.9,0 3.1,2.91 1.08,7.6 C0.968686852,7.85505046 0.968686852,8.14494954 1.08,8.4 C3.1,13.09 6.9,16 11,16 C15.1,16 18.9,13.09 20.92,8.4 C21.0313131,8.14494954 21.0313131,7.85505046 20.92,7.6 Z M11,14 C7.83,14 4.83,11.71 3.1,8 C4.83,4.29 7.83,2 11,2 C14.17,2 17.17,4.29 18.9,8 C17.17,11.71 14.17,14 11,14 Z M11,4 C8.790861,4 7,5.790861 7,8 C7,10.209139 8.790861,12 11,12 C13.209139,12 15,10.209139 15,8 C15,6.93913404 14.5785726,5.92171839 13.8284271,5.17157288 C13.0782816,4.42142736 12.060866,4 11,4 Z M11,10 C9.8954305,10 9,9.1045695 9,8 C9,6.8954305 9.8954305,6 11,6 C12.1045695,6 13,6.8954305 13,8 C13,9.1045695 12.1045695,10 11,10 Z" />
                    </g>
                  </svg>
                  </button>

                  <button
  onClick={() => onToggleStatus(user)}
  className={` py-1 cursor-pointer rounded-full  flex items-center justify-center ${
    user.accountStatus === "Blocked"
      ? " text-red-600 "
      : " text-black "
  }`}
>
  {user.accountStatus === "Blocked" ? (
   
     <svg
     viewBox="0 0 24 24"
     fill="none"
     width="24px"
     height="24px"
     xmlns="http://www.w3.org/2000/svg"
     className=" text-red-600 cursor-pointer"
   >
     <path
       d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
   </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
       width="24px"
     height="24px"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <path
        d="M7 10V8C7 5.23858 9.23858 3 12 3C14.0503 3 15.8124 4.2341 16.584 6M12 14.5V16.5M7 10H17C18.1046 10 19 10.8954 19 12V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V12C5 10.8954 5.89543 10 7 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>  )}
</button>

                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center w-full text-sm p-4 text-gray-300">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
       {/* Pagination */}
       <div className="flex justify-center items-center mt-4 space-x-2">
        <button
            className="px-3 py-1 cursor-pointer border border-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 cursor-pointer border border-gray-300 rounded ${
                currentPage === i + 1 ? "bg-gray-200 text-black" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
            className="px-3 py-1 cursor-pointer border border-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountTable;
