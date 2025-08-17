import React from "react";

export default function ProductList({ products }) {
  if (!products?.length) {
    return <p style={{ textAlign: "center", marginTop: 20 }}>No products yet.</p>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
        marginTop: 16,
      }}
    >
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 12,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafafa",
              marginBottom: 10,
              borderRadius: 6,
              overflow: "hidden",
            }}
          >
            {p.image_url ? (
              <img
                src={p.image_url}
                alt={p.name}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <span style={{ opacity: 0.5 }}>No image</span>
            )}
          </div>

          <h4 style={{ margin: "6px 0", fontSize: 16 }}>{p.name}</h4>
          <p style={{ fontSize: 14, opacity: 0.8, marginBottom: 8 }}>
            {p.description || "—"}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: 700, color: "#333" }}>₹ {p.price}</div>
            {/* Placeholder for future buttons (edit/delete) */}
          </div>
        </div>
      ))}
    </div>
  );
}
