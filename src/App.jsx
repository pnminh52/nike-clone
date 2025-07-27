import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/admin/product/ProductList";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import Homepage from "./pages/user/Homepage";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";
import CategoryList from "./pages/admin/category/CategoryList";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import CategoryDetail from "./pages/admin/category/CategoryDetail";
import CategoryPage from "./pages/user/CategoryPage";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { AuthProvider } from "./hooks/useAuth";
import Checkout from "./pages/user/Checkout";
import { ToastContainer } from "react-toastify";
import Wishlist from "./pages/user/Wishlist";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import SearchPage from "./pages/user/SearchPage";
import Setting from "./pages/user/Setting";
import VoucherList from "./pages/admin/voucher/VoucherList"
import EditVoucher from "./pages/admin/voucher/EditVoucher";
import AddVoucher from "./pages/admin/voucher/AddVoucher";
import AccountList from "./pages/admin/account/AccountList";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Navigate } from "react-router-dom";
import Content from "./components/admin/dashboard/Content";
import DecentralizationList from "./pages/admin/decentralization/DecentralizationList";
import { useAuth } from "./hooks/useAuth";
import OrderStatusList from "./pages/admin/orderStatus/OrderStatusList";
import OrderStatusAdd from "./pages/admin/orderStatus/OrderStatusAdd";
import OrderStatusUpdate from "./pages/admin/orderStatus/OrderStatusUpdate";
import Vouchers from "./pages/user/Vouchers";
import OrderList from "./pages/admin/order/OrderList";
import OrderDetails from "./components/user/order/OrderDetails";
import OrderDetail from "./pages/admin/order/OrderDetail";

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
    
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />}>
            <Route index element={<Content />} />
            <Route path="products/list" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="categories/list" element={<CategoryList />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="categories/edit/:id" element={<EditCategory />} />
            <Route path="categories/view/:id" element={<CategoryDetail />} />
           
            <Route path="orders/list" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            


            <Route path="vouchers/list" element={<VoucherList />} />
            <Route path="vouchers/add" element={<AddVoucher />} />
            <Route path="vouchers/edit/:id" element={<EditVoucher />} />
           
            <Route path="account/list" element={<AccountList />} />
            <Route path="decentralization/list" element={<DecentralizationList />} />
             <Route path="order-status/list" element={<OrderStatusList />} />
             <Route path="order-status/add" element={<OrderStatusAdd />} />
             <Route path="order-status/edit/:id" element={<OrderStatusUpdate />} />
          </Route>
        </Route>
   

      <Route path="/" element={<UserLayout />}>
        <Route index element={<Homepage />} />
        <Route path="category/:name" element={<CategoryPage />} />
        <Route path="details/:name" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="vouchers" element={<Vouchers />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="orders" element={<Order />} />
        <Route path="search/:keyword" element={<SearchPage />} />
        <Route path="setting/:tab?" element={<Setting />} />

      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
