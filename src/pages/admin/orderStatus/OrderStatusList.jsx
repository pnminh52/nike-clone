import React from 'react';
import useOrderStatus from '../../../hooks/useOrderStatus';
import { Link } from 'react-router-dom';

const OrderStatusList = () => {
  const {
    orderStatusList,
    loading,
    error,
    updateOrderStatus,
    deleteOrderStatus,
  } = useOrderStatus();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div>
    <Link to={'/admin/dashboard/order-status/add'}>
    <button className='px-4 py-2 text-ehite bg-blue-600'>Add status</button>
    </Link>
      <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {orderStatusList.map((status) => (
          <tr key={status.id}>
            <td>{status.id}</td>
            <td>{status.name}</td>
            <td>{status.description}</td>
            <td>
                <Link to={`/admin/dashboard/order-status/edit/${status.id}`}>
              <button>Update</button>
                </Link>
              <button onClick={() => deleteOrderStatus(status.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default OrderStatusList;
