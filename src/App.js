import React, { useEffect, useState } from "react";
import API from "./api";
import Header from "./components/Header";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import AuthPanel from "./components/AuthPanel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditProduct from "./components/EditProduct";

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
    fetchProducts();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Header */}
        <Header isAuthed={authed} onLogout={handleLogout} />

        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Auth Panel */}
          {!authed && <AuthPanel onLogin={handleLogin} />}

          {/* Add Product */}
          {authed && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Add Product</h3>
              <AddProduct onAdded={handleAdded} />
            </div>
          )}

          {/* Products Section */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Products</h3>

            {/* Product List */}
            <Routes>
              <Route
                path="/"
                element={<ProductList products={products} onDelete={fetchProducts} />}
              />
              <Route path="/products/:id/edit" element={<EditProduct />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
