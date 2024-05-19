import React from "react";

function Welcome({ user }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-2xl border-4 border-blue-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-bounce">Bienvenue !</h1>
        <h2 className="text-2xl font-medium text-gray-600">{user?.name}</h2>
      </div>
    </div>
  );
}

export default Welcome;
