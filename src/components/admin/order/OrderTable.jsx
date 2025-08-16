import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const OrderTable = ({ orders }) => {
      const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
                  const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
          const totalPages = Math.ceil(orders.length / itemsPerPage);
    const navigate = useNavigate();
    const formatDateTime = (dateStr) =>
        new Date(dateStr).toLocaleString("vi-VN", {
            dateStyle: "short",
            timeStyle: "short",
        });

    return (
        <div className="overflow-x-auto p-4 border-gray-300 border bg-white rounded-2xl">
            <table className="w-full border border-gray-300-collapse">
                <thead>
                    <tr className="text-center">
                        <th className="border border-gray-300 p-2">#</th>
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Email</th>
                        <th className="border border-gray-300 p-2">Date / Time</th>
                        <th className="border border-gray-300 p-2">Fee</th>


                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 text-center">
                            <td className="border border-gray-300 p-2">{order.id}</td>
                            <td className="border border-gray-300 p-2">{order.firstname} {order.lastname}</td>
                            <td className="border border-gray-300 p-2">{order.userEmail}</td>
                            <td className="border border-gray-300 p-2">{formatDateTime(order.date)}</td>
                            <td className="border border-gray-300 p-2">{order.shippingFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td className="border border-gray-300 p-2">{order.status}</td>
                            <td className="border border-gray-300 p-2">
                                <button
                                    onClick={() => navigate(`/admin/dashboard/orders/${order.id}`)}
                                    className="cursor-pointer"
                                >
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                                        <g transform="translate(1, 4)" fill="#000000">
                                            <path d="M20.92,7.6 C18.9,2.91 15.1,0 11,0 C6.9,0 3.1,2.91 1.08,7.6 C0.968686852,7.85505046 0.968686852,8.14494954 1.08,8.4 C3.1,13.09 6.9,16 11,16 C15.1,16 18.9,13.09 20.92,8.4 C21.0313131,8.14494954 21.0313131,7.85505046 20.92,7.6 Z M11,14 C7.83,14 4.83,11.71 3.1,8 C4.83,4.29 7.83,2 11,2 C14.17,2 17.17,4.29 18.9,8 C17.17,11.71 14.17,14 11,14 Z M11,4 C8.790861,4 7,5.790861 7,8 C7,10.209139 8.790861,12 11,12 C13.209139,12 15,10.209139 15,8 C15,6.93913404 14.5785726,5.92171839 13.8284271,5.17157288 C13.0782816,4.42142736 12.060866,4 11,4 Z M11,10 C9.8954305,10 9,9.1045695 9,8 C9,6.8954305 9.8954305,6 11,6 C12.1045695,6 13,6.8954305 13,8 C13,9.1045695 12.1045695,10 11,10 Z" />
                                        </g>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
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

export default OrderTable;
