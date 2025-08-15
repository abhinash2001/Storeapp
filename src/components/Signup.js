import React, { useState } from "react";
import API from "../api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/signup/", { username, password });
      alert("Signup successful. Please login.");
      setUsername(""); setPassword("");
    } catch (err) {
      console.error(err);
      alert("Signup failed.");
    }
  };

  return (
    <form onSubmit={submit} style={{display:"grid",gap:8}}>
      <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      <button type="submit">Create account</button>
    </form>
  );
}
