import React from "react";
import { Link } from "react-router-dom";

export default function Header({ isAuthed, onLogout }) {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center rounded-lg">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🛒 MyShop
      </Link>

      <nav className="space-x-4">
        {isAuthed ? (
          <>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <span className="text-gray-500 text-sm">Please login</span>
        )}
      </nav>
    </header>
  );
}
