import React, { useEffect, useState } from "react";
import API from "./api";
import Header from "./components/Headers";
import AuthPanel from "./components/AuthPanel";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";

export default function App() {
  const [products, setProducts] = useState([]);
  const [authed, setAuthed] = useState(!!localStorage.getItem("access"));

  const fetchProducts = async () => {
    const res = await API.get("/api/products/");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogin = () => {
    setAuthed(true);
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setAuthed(false);
  };

  const handleAdded = () => {
    fetchProducts(); // refresh immediately
  };

  return (
    <div style={{fontFamily:"Inter, system-ui, Arial", padding:"16px 20px", maxWidth:1100, margin:"0 auto"}}>
      <Header isAuthed={authed} onLogout={handleLogout} />
      <div style={{display:"grid", gridTemplateColumns:"1fr", gap:24, marginTop:18}}>
        <AuthPanel onLogin={handleLogin} />
        <div>
          <h3>Add Product (requires login)</h3>
          <AddProduct onAdded={handleAdded} />
        </div>
        <div>
          <h3>Products</h3>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
