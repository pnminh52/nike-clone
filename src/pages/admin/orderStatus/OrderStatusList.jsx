// OrderStatusList.jsx
import React, { useState } from 'react';
import useOrderStatus from '../../../hooks/useOrderStatus';
import OrderStatusTable from './../../../components/admin/orderStatus/OrderStatusTable';
import OrderStatusFilter from './OrderStatusFilter';
import ProductSkeleton from './../../../components/user/etc/ProductSkeleton';

const OrderStatusList = () => {
  const {
    orderStatusList,
    loading,
    error,
    updateOrderStatus,
    deleteOrderStatus,
  } = useOrderStatus();

  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <><ProductSkeleton /></>;
  if (error) return <p>{error}</p>;

  const filteredList = orderStatusList.filter((status) =>
    status.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl nike-title-for-mobile">Order Status List</h2>
      <p>Manage your order statuses here.</p>
      <OrderStatusFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
     

      {
        filteredList.length === 0 ? (
          <p className="text-gray-500 flex w-full justify-center text-sm italic mt-4">
          No status found matching your filters.
        </p>
        ):(
          <OrderStatusTable
          orderStatusList={filteredList}
          deleteOrderStatus={deleteOrderStatus}
          updateOrderStatus={updateOrderStatus}
        />
        )
      }
    </div>
  );
};

export default OrderStatusList;
