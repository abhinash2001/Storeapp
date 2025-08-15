import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", { username, password });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      onLogin?.(res.data.access);
      alert("Logged in");
      setUsername(""); setPassword("");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check username/password.");
    }
  };

  return (
    <form onSubmit={submit} style={{display:"grid",gap:8}}>
      <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
}
