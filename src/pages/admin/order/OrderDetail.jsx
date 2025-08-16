import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrderStatus from "../../../hooks/useOrderStatus";
import UserDetailTable from './../../../components/admin/order/UserDetailTable';
import ProductDetailTable from './../../../components/admin/order/ProductDetailTable';

const OrderDetail = () => {
  const { id } = useParams();
  const { orderStatusList } = useOrderStatus();
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`http://localhost:3000/users`);
      const users = await res.json();
      for (const user of users) {
        const foundOrder = user.orders.find((o) => o.id === Number(id));
        if (foundOrder) {
          setOrder(foundOrder);
          setUserId(user.id);
          setUser(user);
          break;
        }
      }
    };
    fetchOrder();
  }, [id]);

  const handleChangeStatus = async (newStatus) => {
    const res = await fetch(`http://localhost:3000/users/${userId}`);
    const user = await res.json();

    const updatedOrders = user.orders.map((o) =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );

    await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders: updatedOrders }),
    });

    setOrder({ ...order, status: newStatus });
  };

  if (!order || !user) return <p className="p-6">Đang tải chi tiết đơn hàng...</p>;

  const currentIndex = orderStatusList.findIndex((s) => s.name === order.status);
  const isFinalStatus = ["delivered", "cancelled", "returned", "refunded"].includes(
    order.status.toLowerCase()
  );

  return (
    <div className="p-4 space-y-4 ">
       <div>
        <h2 className="text-2xl nike-title-for-mobile">
          Order details : #{order.id}
        </h2>
        <p>You can see the detailed list and orders status here</p>
      </div>
    



  <UserDetailTable user={user}/>


   
     
  <ProductDetailTable
        order={order}
        orderStatusList={orderStatusList}
        currentIndex={currentIndex}
        isFinalStatus={isFinalStatus}
        handleChangeStatus={handleChangeStatus}
      />
    </div>
  );
};

export default OrderDetail;
