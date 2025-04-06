import { Routes, Route } from "react-router-dom";
import Footer from "./components/user/footer";
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
const App = () => {
  return (
    <>

      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products/list" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} /> 
          <Route path="categories/list" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} /> 
          <Route path="categories/view/:id" element={<CategoryDetail />} /> 

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
