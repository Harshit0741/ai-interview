'use client'
import { useState } from 'react';
import { Coin, Coins } from 'lucide-react';

const BillingPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const billingOptions = [
    { id: 1, name: 'Basic Plan', price: 199 },
    { id: 2, name: 'Pro Plan', price: 499 },
    { id: 3, name: 'Enterprise Plan', price: 999 },
  ];

  return (
    <div className="text-primary min-h-screen p-8">
      <h1 className="text-center text-4xl font-bold text-primary mb-8">Choose Your Plan</h1>

      <div className="flex justify-center space-x-8">
        {billingOptions.map((option) => (
          <div
            key={option.id}
            className={`transition-all duration-300 transform hover:scale-105 hover:shadow-xl border p-6 rounded-lg w-full max-w-xs cursor-pointer ${
              selectedOption === option.id
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <h2 className="text-center font-semibold text-lg mb-4">{option.name}</h2>
            <div className="flex items-center justify-center mb-4">
              <Coins className="h-6 w-6 text-yellow-400 mr-2" />
              <span className="text-2xl">{option.price} INR</span>
            </div>
            <p className="text-center text-gray-700">
              Perfect for individuals looking for basic access to our services.
            </p>
            {selectedOption === option.id && (
              <div className="mt-4 text-center text-white">
                <button className="bg-green-500 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-green-600 cursor-pointer">
                  Select
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingPage;
