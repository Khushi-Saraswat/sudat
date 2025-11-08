import { useState } from 'react';
import { X } from 'lucide-react';

export default function LoginModal({isOpen, setIsOpen}:{isOpen:boolean, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) {
//   const [isOpen, setIsOpen] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [receiveOffers, setReceiveOffers] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleContinue = () => {
    console.log('Mobile number:', mobileNumber);
    console.log('Receive offers:', receiveOffers);
    // Handle signup logic here
  };

  

  return (
  <>
    {
        isOpen &&   <div className="fixed inset-0 bg-black/75 bg-opacity-50 flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-sm shadow-xl max-w-xl w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal content */}
        <div className="p-8">
          {/* Welcome text */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-2">Welcome Back!</p>
            <h2 className="text-xl font-semibold text-gray-900">
              Login or Signup to your account
            </h2>
          </div>

          {/* Mobile number input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-3">
              MOBILE NUMBER <span className="text-red-500">*</span>
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-pink-200 focus-within:border-pink-300">
              <div className="bg-gray-50 px-3 py-3 text-gray-700 border-r border-gray-300 text-sm">
                +91
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={receiveOffers}
                onChange={(e) => setReceiveOffers(e.target.checked)}
                className="mt-1 w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
              />
              <span className="text-sm text-gray-600 leading-5">
                Receive offers, and important account-related updates. T&C apply
              </span>
            </label>
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full bg-red-400 hover:bg-red-500 text-white font-medium py-3 px-4 rounded-sm transition-colors duration-200 text-sm tracking-wide"
            disabled={!mobileNumber}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
    }
  </>
  );
}