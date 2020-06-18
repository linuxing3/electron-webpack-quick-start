import React from "react";

const LoginForm = () => (
  <div className="flex mb-4 justify-center py-30">
    <div className="max-w-sm rounded overflow-hidden shadow-lg py-30">
      <img
        className="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">The Coolest App</div>
        <p className="text-gray-700 text-base">
          tailwindcss with electron react
        </p>
      </div>
      <div className="px-6 py-4 flex items-center">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="https://tailwindcss.com/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Jonathan Reinink</p>
          <p className="text-gray-600">Aug 18</p>
        </div>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #react
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #typescript
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #electron
        </span>
      </div>
    </div>
  </div>
);
export default LoginForm;
