"use client";
import AddressCard from "@/components/cards/AddressCard";
import AddNewAddressForm from "@/components/models/AddAddresseModel";
import { Plus } from "lucide-react";
import { useState } from "react";

// Main My Addresses Page
export default function page() {
  const [isOpen, setIsOpen] = useState(false);  
  const handleAddNewAddress = () => {
    setIsOpen(true);
  };

  const handleEdit = () => {
    console.log("Edit address clicked");
  };

  const handleRemove = () => {
    console.log("Remove address clicked");
  };

  return (
    <div className="w-[75%] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Addresses</h1>
        <button 
          onClick={handleAddNewAddress}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          <Plus size={20} />
          <span className="text-sm font-bold">ADD NEW ADDRESS</span>
        </button>
      </div>

      {/* Address Cards */}
      <div className="space-y-4">
        <AddressCard
          name="Gaurav Sharma"
          address="Paktola Tajganj, , shiv mandire, Agra Uttar Pradesh - 282002"
          mobile="+91 9389152789"
          isHome={true}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
        
        {/* You can add more address cards here */}
      </div>
      <AddNewAddressForm setIsOpen={setIsOpen} isOpen={isOpen}/>
    </div>
  );
}