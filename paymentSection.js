jsx
import React from 'react';

const PaymentSection = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Payment information</h2>
      <form>
        <input type="text" placeholder="Card number" className="w-full p-2 mb-4" />
        <input type="text" placeholder="Expiration date" className="w-full p-2 mb-4" />
        <input type="text" placeholder="Security code" className="w-full p-2 mb-4" />
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Pay now</button>
      </form>
    </div>
  );
};

export default PaymentSection;

jsx
<button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Get started</button>


jsx
<div className="max-w-md mx-auto p-4 bg-white shadow-md">...</div>

