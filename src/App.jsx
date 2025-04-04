import { Routes, Route } from "react-router-dom";
import Header1 from "./components/user/Header1";
import Footer from "./components/user/footer";
import ProductList from "./pages/admin/product/ProductList";
import AddProduct from "./pages/admin/product/AddProduct";
import EditProduct from "./pages/admin/product/EditProduct";
import Homepage from "./pages/user/homepage";
import UserLayout from "./layout/UserLayout";
import AdminLayout from "./layout/AdminLayout";

const App = () => {
  return (
    <>

      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/products/list" element={<ProductList />} />
          <Route path="/admin/products/add" element={<AddProduct />} />
          <Route path="/admin/products/edit/:id" element={<EditProduct />} /> 
          </Route>

        <Route path="/" element={<UserLayout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
