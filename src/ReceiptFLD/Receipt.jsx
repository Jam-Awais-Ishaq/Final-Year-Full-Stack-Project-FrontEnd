import React from 'react';

const Receipt = ({ product }) => {
  if (!product) return null;

  const { title, price, size, quantity, paymentMethod } = product;

  return (
    <div className="max-w-sm mx-auto mt-4 bg-white shadow-md rounded-lg p-6 font-mono border-2 border-gray-300">
      <div className=" text-gray-500 font-extrabold leading-3 text-xl">------------------------------</div>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl mb-2">------------------------------</div>
      <h2 className="text-2xl font-bold text-center mb-2 text-slate-600 underline">WEARHUB RECEIPT</h2>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl">------------------------------</div>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl mb-4">------------------------------</div>
      <div className="space-y-2 mb-6">
        <p><span className='uppercase font-extrabold italic text-xl'>{title}</span> <span className="float-right underline ">${price}</span></p>
        <p> <span className='font-extrabold italic'>Total Products:</span>  ( {quantity} * {price} ) = {quantity * price} </p>
        <p><span className='font-extrabold italic'>Size:</span> {size} <span className="float-right font-semibold">Qty: {quantity}</span></p>
        <p><span className='font-extrabold italic'>Payment:</span> {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Account Payment'}   </p>
        <p className='capitalize '><span className='font-extrabold italic'>Status:</span> order is On the way</p>
      </div>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl mb-2">------------------------------</div>
      <p className="text-lg font-bold italic">TOTAL: <span className="float-right">${(price * quantity).toFixed(2)}</span></p>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl mb-4">------------------------------</div>
      <p className="text-center text-gray-500 text-4xl font-extrabold italic">THANK YOU</p>
      <div className="mt-4 text-center">
        <img src="https://barcode.tec-it.com/barcode.ashx?data=ABC-abc-1239&code=Code128&translate-esc=on" alt="Barcode" className="mx-auto h-12"/>
      </div>
      <div className=" text-gray-500 font-extrabold leading-3 text-xl mb-4">------------------------------</div>
    </div>
  );
};

export default Receipt;