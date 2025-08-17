import React from "react";

export default function Header({ onLogout, isAuthed }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",borderBottom:"1px solid #eee"}}>
      <h2 style={{margin:0}}>🛍️ UniQue-StyLe</h2>
      {isAuthed ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <span style={{opacity:0.6}}>Not logged in</span>
      )}
    </div>
  );
}
