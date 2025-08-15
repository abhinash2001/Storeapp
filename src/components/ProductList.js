import React from "react";

export default function ProductList({ products }) {
  if (!products?.length) return <p>No products yet.</p>;

  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12,marginTop:12}}>
      {products.map((p) => (
        <div key={p.id} style={{border:"1px solid #eee",borderRadius:8,padding:12}}>
          <div style={{height:160,display:"flex",alignItems:"center",justifyContent:"center",background:"#fafafa",marginBottom:8,borderRadius:6,overflow:"hidden"}}>
            {p.image_url ? (
              <img src={p.image_url} alt={p.name} style={{maxWidth:"100%",maxHeight:"100%"}} />
            ) : (
              <span style={{opacity:.6}}>No image</span>
            )}
          </div>
          <h4 style={{margin:"4px 0"}}>{p.name}</h4>
          <div style={{fontSize:14,opacity:.8,marginBottom:6}}>{p.description || "—"}</div>
          <div style={{fontWeight:700}}>₹ {p.price}</div>
        </div>
      ))}
    </div>
  );
}
