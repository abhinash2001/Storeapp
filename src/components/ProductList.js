import React from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function ProductList({ products, onDelete }) {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/api/products/${id}/`);
        onDelete();
      } catch (err) {
        console.error(err);
        alert("Failed to delete product.");
      }
    }
  };

  if (!products || products.length === 0) {
    return <p className="text-gray-500 text-center mt-6">No products yet.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition max-w-xs mx-auto"
        >
          <img
            src={p.image || "https://via.placeholder.com/150"}
            alt={p.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 truncate">{p.name}</h3>
            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.description}</p>
            <p className="font-bold text-blue-600 mt-2 text-sm">₹{p.price}</p>

            <div className="flex justify-between mt-3">
              <Link
                to={`/products/${p.id}/edit`}
                className="text-xs bg-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-xs bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
