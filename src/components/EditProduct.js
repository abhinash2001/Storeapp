import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";


export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch product details
  useEffect(() => {
    API.get(`/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setPreview(res.data.image); // show current image
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file)); // live preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    if (image) formData.append("image", image);

    try {
      await API.put(`/api/products/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product updated!");
      navigate("/"); // redirect back
    } catch (err) {
      console.error("Update failed:", err);
      alert("❌ Failed to update product");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>✏️ Edit Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              height: 250,
              objectFit: "cover",
              borderRadius: 12,
              marginBottom: 10,
            }}
          />
        )}

        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product name"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />

        <input
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ccc",
            fontSize: 16,
          }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ fontSize: 14 }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            background: "#2563eb",
            color: "white",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
          }}
        >
          💾 Save Changes
        </button>
      </form>
    </div>
  );
}
