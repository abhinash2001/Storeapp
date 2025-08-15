import React, { useState } from "react";
import API from "../api";

export default function AddProduct({ onAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("description", description);
      fd.append("price", price);
      if (image) fd.append("image", image);

      await API.post("/api/products/", fd, { headers: { "Content-Type": "multipart/form-data" }});
      setName(""); setDescription(""); setPrice(""); setImage(null);
      onAdded?.();
    } catch (err) {
      console.error(err);
      alert("Add product failed (are you logged in?).");
    }
  };

  return (
    <form onSubmit={submit} style={{display:"grid",gap:8,maxWidth:420}}>
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <input placeholder="Price" type="number" step="0.01" value={price} onChange={(e)=>setPrice(e.target.value)} required />
      <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      <button type="submit">Add Product</button>
    </form>
  );
}
