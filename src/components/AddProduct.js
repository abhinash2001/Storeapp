import React, { useState } from "react";
import API from "../api";

export default function AddProduct({ onAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      if (image) {
        formData.append("image", image);
      }

      await API.post("/api/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
      onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">➕ Add Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      {/* ✅ File upload instead of text */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full"
      >
        Add Product
      </button>
    </form>
  );
}
