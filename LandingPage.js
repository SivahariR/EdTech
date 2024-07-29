
jsx
import React from 'react';
import React, { useState } from 'react';


const LandingPage = () => {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to EdTech</h1>
      <p className="text-lg mb-8">Learn anything, anywhere</p>
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get started</button>
    </div>
  );
};

export default LandingPage;

jsx
<h1 className="text-3xl font-bold mb-4">Welcome to EdTech</h1>


jsx
<div className="flex justify-center h-screen bg-gray-100">...</div>

const [isOpen, setIsOpen] = useState(false);

jsx
<div className="mb-4">...</div>


jsx
<button onClick={() => setIsOpen(true)}>Open modal</button>
{isOpen && <SignUpLoginModal />}

