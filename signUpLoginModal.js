jsx
import React from 'react';

const SignUpLoginModal = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="max-w-md mx-auto p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign up or log in</h2>
        <form>
          <input type="email" placeholder="Email" className="w-full p-2 mb-4" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4" />
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Log in</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpLoginModal;

jsx
<p className="text-lg mb-8">Learn anything</p>

jsx
<div className="mb-8">...</div>


jsx
<div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">...</div>

