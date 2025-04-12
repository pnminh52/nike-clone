import React from "react";
import { useCart } from "./../../hooks/useCart";
import { Link } from "react-router-dom";

const Checkout = () => {
    const { cart, checkoutCart } = useCart();

    const total = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity ?? 1),
        0
    );

    const formatPrice = (price) => {
        return Number(price)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl">Giỏ hàng trống. Quay lại <Link to="/" className="underline text-blue-500">trang chủ</Link> để tiếp tục mua sắm.</p>
            </div>
        );
    }

    return (
        <div className="max-w-screen-xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-semibold mb-8">Thông tin đơn hàng</h1>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-6">
                    {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 border-b pb-4">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-24 h-24 object-cover"
                            />
                            <div className="flex-1">
                                <p className="text-lg font-medium">{item.name}</p>
                                <p className="text-gray-600">
                                    Size: {item.size} | Số lượng: {item.quantity ?? 1}
                                </p>
                                <p className="text-gray-600">
                                    {item.gender}'s Shoes | Màu: {Array.isArray(item.color) ? item.color.join("/") : item.color}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg">
                                    {formatPrice(item.price * (item.quantity ?? 1))} <span className="text-sm underline">đ</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Tổng kết</h2>
                    <div className="flex justify-between mb-2">
                        <p>Tạm tính</p>
                        <p>{formatPrice(total)} <span className="text-sm underline">đ</span></p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <p>Phí vận chuyển</p>
                        <p>Miễn phí</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between font-bold text-xl">
                        <p>Tổng cộng</p>
                        <p>{formatPrice(total)} <span className="text-sm underline">đ</span></p>
                    </div>
                    <button onClick={()=>checkoutCart()} className="w-full mt-6 bg-black text-white py-4 rounded-full hover:bg-gray-800 transition">
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
