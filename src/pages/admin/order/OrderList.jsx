import React, { useState, useMemo } from 'react';
import useOrders from '../../../hooks/useOrders';
import OrderTable from '../../../components/admin/order/OrderTable';
import OrderFilter from '../../../components/admin/order/OrderFilter';

const OrderList = () => {
  const { orders, loading, error } = useOrders();
  const [filter, setFilter] = useState({ searchTerm: '', status: '' });

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const search = filter.searchTerm.toLowerCase();

      const matchSearch =
      order.id.toString().includes(search) ||
      (order.firstname && order.firstname.toLowerCase().includes(search)) ||
      (order.lastname && order.lastname.toLowerCase().includes(search)) ||
      (order.email && order.email.toLowerCase().includes(search));
    

      const matchStatus = !filter.status || order.status === filter.status;

      return matchSearch && matchStatus;
    });
  }, [orders, filter]);

  if (loading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (orders.length === 0) return <p>Không có đơn hàng nào.</p>;

  return (
    <div className="p-4">
      <div>
        <h2 className="text-2xl nike-title-for-mobile">
          Orders management
        </h2>
        <p>You can see the detailed list of orders here</p>
      </div>
      <OrderFilter onFilter={setFilter} />
      {
        filteredOrders.length === 0 ? (
          <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
            No orders matching your filters.
          </p>
        ) : (
          <OrderTable orders={filteredOrders} />
        )
      }
     
    </div>
  );
};

export default OrderList;
