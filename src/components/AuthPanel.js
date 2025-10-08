// src/components/AuthPanel.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AuthPanel({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isLogin) {
        // Login via simplejwt token endpoint
        const res = await API.post("/api/token/", { username, password });
        // expecting { access, refresh }
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        onLogin?.();
        navigate("/"); // go to home
      } else {
        // Signup - adjust URL if your backend uses different path
        await API.post("/api/signup/", { username, password });
        // optionally auto-login after signup
        const res = await API.post("/api/token/", { username, password });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        onLogin?.();
        navigate("/");
      }
    } catch (err) {
      console.error("Auth error:", err);

      // network/CORS
      if (!err.response) {
        setErrorMsg("Network error or CORS blocked. Check console.");
      } else {
        const code = err.response.status;
        const data = err.response.data;
        // show backend message when available
        setErrorMsg(
          data && (data.detail || data.error || JSON.stringify(data)) ||
          `Request failed (${code})`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        {errorMsg && <div className="mb-3 text-sm text-red-600">{errorMsg}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}
            className="text-blue-600 underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
