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
import CategoryPage from "./pages/user/CategoryPage";
import ProductDetail from "./pages/user/ProductDetail";
import Cart from "./pages/user/Cart";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import { AuthProvider } from "./hooks/useAuth";
import Toastify from './components/user/Toastify';
const App = () => {
  return (
    <>
<AuthProvider>
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
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/details/:name" element={<ProductDetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Route>
       
      </Routes>
      <Footer />
      <Toastify />
</AuthProvider>
     
    </>
  );
};

export default App;
