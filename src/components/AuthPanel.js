import React from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function AuthPanel({ onLogin }) {
  return (
    <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
      <div style={{minWidth:260}}>
        <h3>Signup</h3>
        <Signup />
      </div>
      <div style={{minWidth:260}}>
        <h3>Login</h3>
        <Login onLogin={onLogin} />
      </div>
    </div>
  );
}
